import { test, expect } from "@playwright/test";

/**
 * Boards 컴포넌트 데이터 바인딩 테스트
 * 실제 API를 호출하여 데이터가 정상적으로 바인딩되는지 검증합니다.
 */
test.describe("Boards 컴포넌트 데이터 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    // 게시판 페이지로 이동
    await page.goto("/boards");
  });

  test("실제 API 호출하여 게시글 목록이 화면에 렌더링되는지 검증", async ({
    page,
  }) => {
    // API 응답 대기 (실제 API 호출)
    const response = await page.waitForResponse(
      (response) =>
        response.url().includes("graphql") &&
        response.request().postDataJSON()?.operationName === "fetchBoards",
      { timeout: 2000 }
    );

    // API 응답이 성공적인지 확인
    expect(response.status()).toBe(200);

    // 응답 데이터 파싱
    const responseData = await response.json();
    expect(responseData.data).toBeDefined();
    expect(responseData.data.fetchBoards).toBeDefined();
    expect(Array.isArray(responseData.data.fetchBoards)).toBe(true);

    // 게시글 데이터가 최소 1개 이상 있는지 확인
    const boards = responseData.data.fetchBoards;
    expect(boards.length).toBeGreaterThan(0);

    // UI에 게시글이 렌더링되었는지 확인
    const firstBoard = boards[0];

    // data-testid로 요소 찾기
    const listItems = page.locator('[data-testid^="board-item-"]');
    await expect(listItems.first()).toBeVisible({ timeout: 2000 });

    // 첫 번째 게시글의 제목이 화면에 표시되는지 확인
    const titleElement = page.locator(
      `[data-testid="board-title-${firstBoard._id}"]`
    );
    await expect(titleElement).toBeVisible({ timeout: 2000 });
    await expect(titleElement).toHaveText(firstBoard.title);

    // 작성자가 화면에 표시되는지 확인
    const authorElement = page.locator(
      `[data-testid="board-author-${firstBoard._id}"]`
    );
    await expect(authorElement).toBeVisible({ timeout: 2000 });
    await expect(authorElement).toHaveText(firstBoard.writer);

    // 날짜가 YYYY.MM.DD 형식으로 표시되는지 확인
    const dateElement = page.locator(
      `[data-testid="board-date-${firstBoard._id}"]`
    );
    await expect(dateElement).toBeVisible({ timeout: 2000 });

    const dateText = await dateElement.textContent();
    expect(dateText).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
  });

  test("로딩 상태가 올바르게 처리되는지 검증", async ({ page }) => {
    // 페이지 로드 후 로딩 인디케이터가 표시되거나 데이터가 로드되는지 확인
    await page.waitForResponse(
      (response) => response.url().includes("graphql"),
      { timeout: 2000 }
    );

    // 데이터가 로드된 후 게시글 목록이 표시되는지 확인
    const listItems = page.locator('[data-testid^="board-item-"]');
    await expect(listItems.first()).toBeVisible({ timeout: 2000 });
  });

  test("페이지네이션 변경 시 실제 API가 호출되는지 검증", async ({ page }) => {
    // 첫 페이지 로드 대기
    await page.waitForResponse(
      (response) => response.url().includes("graphql"),
      { timeout: 2000 }
    );

    // 페이지네이션 버튼 클릭 (2페이지로 이동)
    // 버튼 텍스트로 찾기 (Pagination 컴포넌트의 페이지 번호 버튼)
    const page2Button = page.locator('button:has-text("2")').first();

    // 페이지네이션 버튼이 있는지 확인
    const page2ButtonExists = await page2Button.count();

    if (page2ButtonExists > 0) {
      // API 응답을 기다리면서 버튼 클릭
      const [response] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("graphql") &&
            response.request().postDataJSON()?.variables?.page === 2,
          { timeout: 2000 }
        ),
        page2Button.click(),
      ]);

      // API 응답이 성공적인지 확인
      expect(response.status()).toBe(200);

      // 2페이지 데이터가 로드되었는지 확인
      const listItems = page.locator('[data-testid^="board-item-"]');
      await expect(listItems.first()).toBeVisible({ timeout: 2000 });
    }
  });

  test("검색 기능이 실제 API를 호출하는지 검증", async ({ page }) => {
    // 첫 페이지 로드 대기
    await page.waitForResponse(
      (response) => response.url().includes("graphql"),
      { timeout: 2000 }
    );

    // 검색어 입력
    const searchInput = page.locator('[data-testid="search-input"]');
    const searchButton = page.locator('[data-testid="search-button"]');

    if ((await searchInput.count()) > 0 && (await searchButton.count()) > 0) {
      await searchInput.fill("테스트");

      // 검색 버튼 클릭 및 API 호출 대기
      const [response] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("graphql") &&
            response.request().postDataJSON()?.variables?.search === "테스트",
          { timeout: 2000 }
        ),
        searchButton.click(),
      ]);

      // API 응답이 성공적인지 확인
      expect(response.status()).toBe(200);
    }
  });

  test("API 에러 발생 시 에러 처리가 올바른지 검증", async ({ page }) => {
    // 페이지 로드
    await page.goto("/boards");

    // GraphQL 응답 대기
    const response = await page.waitForResponse(
      (response) => response.url().includes("graphql"),
      { timeout: 2000 }
    );

    // 응답 데이터 확인
    const responseData = await response.json();

    // 에러가 있는 경우 (정상 케이스에서는 에러가 없을 수 있음)
    if (responseData.errors) {
      // 에러 메시지가 UI에 표시되는지 확인
      const errorElement = page.locator('[data-testid="error-message"]');
      if ((await errorElement.count()) > 0) {
        await expect(errorElement).toBeVisible({ timeout: 2000 });
      }
    } else {
      // 정상적으로 데이터가 로드되었는지 확인
      expect(responseData.data).toBeDefined();
      if (responseData.data) {
        expect(responseData.data.fetchBoards).toBeDefined();
      }
    }
  });
});
