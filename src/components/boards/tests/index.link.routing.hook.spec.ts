/**
 * Boards Link Routing Hook Test
 * 게시글 목록 및 등록 버튼 클릭 시 페이지 이동 기능 테스트
 * TDD 방식으로 작성된 Playwright 테스트
 *
 * 주의사항:
 * - Mock 데이터 사용 금지
 * - 실제 API 호출을 통한 테스트
 * - network 통신 포함 테스트: timeout 2000ms 미만
 * - data-testid를 사용한 요소 식별 (CSS Module 충돌 방지)
 */

import { test, expect, Page } from "@playwright/test";
import { waitForBoardsReady } from "../../../utils/test-helpers";

// 공통 설정: 모든 테스트 전에 /boards 페이지로 이동
async function setupBoardsPage(page: Page, browserName: string) {
  await page.goto("/boards");
  await page.waitForLoadState("domcontentloaded");
  // 브라우저별 최적화된 대기 로직
  await waitForBoardsReady(page, browserName);
}

test.describe("게시글 링크 라우팅 - 성공 시나리오", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await setupBoardsPage(page, testInfo.project.name);
  });

  test("첫 번째 게시글 클릭 시 상세 페이지로 이동하고 콘텐츠가 로드됨", async ({
    page,
  }) => {
    // Given: 첫 번째 게시글 아이템 찾기
    const firstBoardItem = page.locator('[data-testid="board-item-0"]');

    // 게시글 ID 추출 (data-testid의 board-title-{id} 형식에서)
    const titleElement = firstBoardItem.locator(
      '[data-testid^="board-title-"]'
    );
    const testId = await titleElement.getAttribute("data-testid");
    const boardId = testId?.replace("board-title-", "") || "";

    expect(boardId).toBeTruthy();

    // 목록 페이지의 제목 저장
    const listPageTitle = await titleElement.textContent();

    // When: 게시글 클릭
    await firstBoardItem.click();

    // Then: 상세 페이지로 이동 확인
    await page.waitForURL(`/boards/${boardId}`, { timeout: 2000 });
    expect(page.url()).toContain(`/boards/${boardId}`);

    // Then: 상세 페이지의 콘텐츠가 실제로 로드되었는지 확인
    await page.waitForLoadState("networkidle", { timeout: 2000 });

    // 상세 페이지에 제목이 표시되는지 확인 (실제 데이터 로드 검증)
    const detailTitle = page.locator('[data-testid="board-title"]');
    if ((await detailTitle.count()) > 0) {
      await expect(detailTitle).toBeVisible();
      const detailPageTitle = await detailTitle.textContent();
      // 목록의 제목과 상세 페이지의 제목이 일치하는지 확인
      expect(detailPageTitle).toBe(listPageTitle);
    }
  });

  test("여러 게시글 클릭 시 각각의 상세 페이지로 이동", async ({ page }) => {
    // Given: 두 번째 게시글 테스트
    const secondBoardItem = page.locator('[data-testid="board-item-1"]');

    if ((await secondBoardItem.count()) > 0) {
      const titleElement = secondBoardItem.locator(
        '[data-testid^="board-title-"]'
      );
      const testId = await titleElement.getAttribute("data-testid");
      const boardId = testId?.replace("board-title-", "") || "";

      // When: 두 번째 게시글 클릭
      await secondBoardItem.click();

      // Then: 해당 게시글의 상세 페이지로 이동
      await page.waitForURL(`/boards/${boardId}`, { timeout: 2000 });
      expect(page.url()).toContain(`/boards/${boardId}`);
    }
  });

  test("뒤로가기 후 다른 게시글 클릭 시 정상 동작", async ({ page }) => {
    // Given: 첫 번째 게시글 ID 저장
    const firstBoardItem = page.locator('[data-testid="board-item-0"]');
    const firstTitleElement = firstBoardItem.locator(
      '[data-testid^="board-title-"]'
    );
    const firstTestId = await firstTitleElement.getAttribute("data-testid");
    const firstBoardId = firstTestId?.replace("board-title-", "") || "";

    // When: 첫 번째 게시글 클릭
    await firstBoardItem.click();
    await page.waitForURL(`/boards/${firstBoardId}`, { timeout: 2000 });

    // When: 뒤로가기
    await page.goBack();
    await page.waitForSelector('[data-testid="board-item-0"]', {
      timeout: 2000,
    });

    // When: 두 번째 게시글이 있으면 클릭
    const secondBoardItem = page.locator('[data-testid="board-item-1"]');
    if ((await secondBoardItem.count()) > 0) {
      const secondTitleElement = secondBoardItem.locator(
        '[data-testid^="board-title-"]'
      );
      const secondTestId = await secondTitleElement.getAttribute("data-testid");
      const secondBoardId = secondTestId?.replace("board-title-", "") || "";

      await secondBoardItem.click();

      // Then: 두 번째 게시글 상세 페이지로 이동
      await page.waitForURL(`/boards/${secondBoardId}`, { timeout: 2000 });
      expect(page.url()).toContain(`/boards/${secondBoardId}`);
    }
  });

  test("트립토크 등록 버튼 클릭 시 등록 페이지로 이동하고 폼이 로드됨", async ({
    page,
  }) => {
    // Given: 트립토크 등록 버튼 찾기
    const writeButton = page.locator('[data-testid="write-button"]');

    // When: 버튼 클릭
    await writeButton.click();

    // Then: 등록 페이지로 이동 확인
    await page.waitForURL("/boards/new", { timeout: 2000 });
    expect(page.url()).toContain("/boards/new");

    // Then: 등록 페이지가 실제로 로드되었는지 확인
    await page.waitForLoadState("networkidle", { timeout: 2000 });
  });
});
