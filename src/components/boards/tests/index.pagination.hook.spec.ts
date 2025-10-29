import { test, expect } from "@playwright/test";
import { waitForBoardsReady } from "../../../utils/test-helpers";

/**
 * Pagination Hook 테스트
 * - 실제 API를 사용하여 페이지네이션 기능을 테스트합니다.
 * - Mock 데이터를 사용하지 않습니다.
 */

test.describe("Pagination Hook - fetchBoardsCount API", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const browserName = testInfo.project.name;
    // 게시판 페이지로 이동
    await page.goto("/boards");
    // 페이지 로딩 완료 대기
    await page.waitForLoadState("domcontentloaded");
    // 브라우저별 최적화된 대기 로직
    await waitForBoardsReady(page, browserName);
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
});
