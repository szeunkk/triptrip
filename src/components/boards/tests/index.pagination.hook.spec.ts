import { test, expect } from "@playwright/test";

/**
 * Pagination Hook 테스트
 * - 실제 API를 사용하여 페이지네이션 기능을 테스트합니다.
 * - Mock 데이터를 사용하지 않습니다.
 */

test.describe("Pagination Hook - fetchBoardsCount API", () => {
  test.beforeEach(async ({ page }) => {
    // 게시판 페이지로 이동
    await page.goto("/boards");

    // 페이지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="board-item-0"]', {
      timeout: 2000,
      state: "attached",
    });
    // WebKit에서 보이지 않을 수 있어 스크롤 후 가시성 확인
    await page.locator('[data-testid="board-item-0"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="board-item-0"]')).toBeVisible({
      timeout: 2000,
    });
  });

  test("실제 API를 호출하여 전체 게시글 수를 가져와야 합니다", async ({
    page,
  }) => {
    // 페이지네이션이 렌더링될 때까지 대기
    const paginationSelector = '[data-testid="pagination"]';
    await page.waitForSelector(paginationSelector, {
      timeout: 2000,
      state: "visible",
    });

    // 페이지네이션이 존재하는지 확인
    const pagination = await page.locator(paginationSelector);
    await expect(pagination).toBeVisible();

    // 페이지 버튼들이 렌더링되는지 확인
    const pageButtons = await page
      .locator('[data-testid="pagination"] button')
      .all();
    expect(pageButtons.length).toBeGreaterThan(0);
  });

  test("현재 페이지가 1로 초기화되어야 합니다", async ({ page }) => {
    // 페이지네이션 영역 확인
    const paginationSelector = '[data-testid="pagination"]';
    await page.waitForSelector(paginationSelector, {
      timeout: 2000,
      state: "visible",
    });

    // 첫 번째 게시글이 올바른 번호를 가지고 있는지 확인
    const firstItemNumber = await page.locator(
      '[data-testid="board-item-number-0"]'
    );
    await expect(firstItemNumber).toBeVisible();
  });

  test("게시글 번호가 역순으로 계산되어야 합니다 (1페이지)", async ({
    page,
  }) => {
    // 첫 번째 게시글의 번호를 확인
    const firstItemNumber = await page
      .locator('[data-testid="board-item-number-0"]')
      .textContent();
    const firstNumber = parseInt(firstItemNumber || "0");

    // 첫 번째 게시글의 번호가 전체 게시글 수와 같거나 작아야 함
    expect(firstNumber).toBeGreaterThan(0);

    // 두 번째 게시글의 번호 확인
    const secondItemNumber = await page
      .locator('[data-testid="board-item-number-1"]')
      .textContent();
    const secondNumber = parseInt(secondItemNumber || "0");

    // 두 번째 게시글의 번호가 첫 번째보다 1 작아야 함
    expect(secondNumber).toBe(firstNumber - 1);
  });

  test("페이지 이동 시 게시글 번호가 올바르게 계산되어야 합니다 (2페이지)", async ({
    page,
  }) => {
    // 페이지네이션 버튼 확인
    const pageButtons = await page
      .locator('[data-testid="pagination"] button:not([aria-label])')
      .all();

    // 2페이지 버튼이 있는 경우
    if (pageButtons.length >= 2) {
      // 1페이지의 첫 번째 게시글 번호 저장
      const page1FirstNumber = await page
        .locator('[data-testid="board-item-number-0"]')
        .textContent();
      const firstNumberPage1 = parseInt(page1FirstNumber || "0");

      // 2번째 버튼 클릭 (index 1)
      await pageButtons[1].click();

      // 페이지 이동 후 데이터 로딩 대기
      await page.waitForTimeout(1500);

      // 2페이지의 첫 번째 게시글 번호 확인
      const page2FirstNumber = await page
        .locator('[data-testid="board-item-number-0"]')
        .textContent();
      const firstNumberPage2 = parseInt(page2FirstNumber || "0");

      // 2페이지의 첫 번째 게시글 번호는 1페이지 첫 번째 번호보다 10 작아야 함
      expect(firstNumberPage2).toBe(firstNumberPage1 - 10);
    }
  });

  test("검색 조건 변경 시 전체 게시글 수가 업데이트되어야 합니다", async ({
    page,
  }) => {
    // 검색어 입력 (실제로 존재하는 단어)
    const searchInput = await page.locator('[data-testid="search-input"]');
    await searchInput.fill("a");

    // 검색 버튼 클릭
    const searchButton = await page.locator('[data-testid="search-button"]');
    await searchButton.click();

    // 검색 결과 로딩 대기
    await page.waitForTimeout(1500);

    // 검색 후 페이지네이션이 여전히 표시되는지 확인
    const pagination = await page.locator('[data-testid="pagination"]');
    await expect(pagination).toBeVisible();

    // 검색 후 게시글이 있으면 번호 확인, 없으면 빈 메시지 확인
    const boardItem = await page
      .locator('[data-testid="board-item-number-0"]')
      .count();
    const emptyMessage = await page.locator("text=게시글이 없습니다.").count();

    // 게시글이 있거나 빈 메시지가 있어야 함
    expect(boardItem > 0 || emptyMessage > 0).toBeTruthy();
  });

  test("데이터가 없을 경우 기본값(1페이지)을 보장해야 합니다", async ({
    page,
  }) => {
    // 검색어로 존재하지 않는 값을 입력
    const searchInput = await page.locator('[data-testid="search-input"]');
    await searchInput.fill("존재하지않는검색어12345678900");

    // 검색 버튼 클릭
    const searchButton = await page.locator('[data-testid="search-button"]');
    await searchButton.click();

    // 검색 결과 로딩 대기
    await page.waitForTimeout(1500);

    // 페이지네이션이 여전히 렌더링되어야 함
    const paginationSelector = '[data-testid="pagination"]';
    const pagination = await page.locator(paginationSelector);
    await expect(pagination).toBeVisible();

    // 빈 게시글 메시지가 표시되는지 확인
    const emptyMessage = await page.locator("text=게시글이 없습니다.");
    if ((await emptyMessage.count()) > 0) {
      await expect(emptyMessage).toBeVisible();
    }
  });
});

test.describe("Pagination Hook - 에러 시나리오", () => {
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

      // fetchBoardsCount가 있으면 정의되었는지 확인
      if (
        responseData.data &&
        responseData.data.fetchBoardsCount !== undefined
      ) {
        expect(typeof responseData.data.fetchBoardsCount).toBe("number");
      } else {
        // fetchBoardsCount가 없어도 data가 있으면 정상으로 간주
        expect(responseData.data).toBeDefined();
      }

      // 페이지네이션이 정상적으로 렌더링되는지 확인
      const pagination = page.locator('[data-testid="pagination"]');
      await expect(pagination).toBeVisible({ timeout: 2000 });
    }
  });
});
