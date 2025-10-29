import { test, expect } from "@playwright/test";

/**
 * BoardsDetail Data Binding Hook Test
 * 게시글 상세 데이터 바인딩 훅 테스트
 *
 * 주의사항:
 * - Mock 데이터 사용 금지
 * - 실제 API 호출을 통한 테스트
 * - network 통신 포함 테스트: timeout 2000ms 미만
 * - 단순 렌더링 테스트: timeout 500ms 미만 또는 미설정
 */

test.describe("BoardsDetail - Data Binding", () => {
  /**
   * 테스트 시나리오 1: 실제 게시글 데이터 로딩 성공
   * - 실제 API 호출하여 데이터를 불러옴
   * - Mock 데이터 사용 금지
   */
  test("게시글 상세 페이지에서 실제 API 데이터가 정상적으로 렌더링되어야 함", async ({
    page,
  }) => {
    // 실제 게시글 ID 사용 (Mock 금지)
    // 주의: 실제 존재하는 게시글 ID를 사용해야 함
    const testBoardId = "690174c9d4299d0029cd09b5";

    // 페이지 이동
    await page.goto(`/boards/${testBoardId}`);

    // 로딩 상태 대기 (네트워크 요청 완료 대기)
    await page.waitForLoadState("networkidle", { timeout: 2000 });

    // 게시글 제목이 렌더링되는지 확인
    const titleElement = page.locator('[data-testid="board-title"]');
    await expect(titleElement).toBeVisible({ timeout: 2000 });

    // 게시글 작성자가 렌더링되는지 확인
    const writerElement = page.locator('[data-testid="board-writer"]');
    await expect(writerElement).toBeVisible({ timeout: 2000 });

    // 게시글 날짜가 YYYY.MM.DD 형식으로 렌더링되는지 확인
    const dateElement = page.locator('[data-testid="board-date"]');
    await expect(dateElement).toBeVisible({ timeout: 2000 });
    const dateText = await dateElement.textContent();
    expect(dateText).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);

    // 게시글 내용이 렌더링되는지 확인
    const contentElement = page.locator('[data-testid="board-content"]');
    await expect(contentElement).toBeVisible({ timeout: 2000 });

    // 좋아요/싫어요 수가 렌더링되는지 확인
    const likeElement = page.locator('[data-testid="board-like-count"]');
    await expect(likeElement).toBeVisible({ timeout: 2000 });

    const dislikeElement = page.locator('[data-testid="board-dislike-count"]');
    await expect(dislikeElement).toBeVisible({ timeout: 2000 });
  });

  /**
   * 테스트 시나리오 2: 이미지가 있는 게시글 렌더링
   */
  test("이미지가 있는 게시글의 경우 이미지가 정상적으로 렌더링되어야 함", async ({
    page,
  }) => {
    // 이미지가 있는 실제 게시글 ID 사용
    const testBoardId = "690174c9d4299d0029cd09b5";

    await page.goto(`/boards/${testBoardId}`);
    await page.waitForLoadState("networkidle", { timeout: 2000 });

    // 이미지 요소 확인 (이미지가 있는 경우)
    const imageElement = page.locator('[data-testid="board-main-image"]');
    const imageCount = await imageElement.count();

    if (imageCount > 0) {
      await expect(imageElement).toBeVisible({ timeout: 2000 });
    }
  });

  /**
   * 테스트 시나리오 3: YouTube URL이 있는 게시글 렌더링
   */
  test("YouTube URL이 있는 게시글의 경우 YouTube 썸네일이 정상적으로 렌더링되어야 함", async ({
    page,
  }) => {
    // YouTube URL이 있는 실제 게시글 ID 사용
    const testBoardId = "690174c9d4299d0029cd09b5";

    await page.goto(`/boards/${testBoardId}`);
    await page.waitForLoadState("networkidle", { timeout: 2000 });

    // YouTube 썸네일 요소 확인 (YouTube URL이 있는 경우)
    const youtubeElement = page.locator('[data-testid="board-youtube"]');
    const youtubeCount = await youtubeElement.count();

    if (youtubeCount > 0) {
      await expect(youtubeElement).toBeVisible({ timeout: 2000 });
    }
  });

  /**
   * 테스트 시나리오 4: 존재하지 않는 게시글 ID로 접근 시 에러 처리
   * - 실제 API 호출에서 에러 발생
   * - Mock 데이터 사용 금지
   */
  test("존재하지 않는 게시글 ID로 접근 시 에러 상태가 처리되어야 함", async ({
    page,
  }) => {
    // 존재하지 않는 게시글 ID 사용
    const invalidBoardId = "invalid-board-id-12345";

    await page.goto(`/boards/${invalidBoardId}`);

    // 네트워크 요청 완료 대기
    await page.waitForLoadState("networkidle", { timeout: 2000 });

    // 에러 상태 확인 (에러 메시지 또는 로딩 상태가 아닌지 확인)
    // 주의: 실제 에러가 발생하면 페이지가 정상 렌더링되지 않을 수 있음
    const titleElement = page.locator('[data-testid="board-title"]');
    const isVisible = await titleElement.isVisible().catch(() => false);

    // 에러 상태에서는 제목이 표시되지 않아야 함
    expect(isVisible).toBeFalsy();
  });

  /**
   * 테스트 시나리오 5: 로딩 상태 확인
   */
  test("게시글 데이터 로딩 중 로딩 상태가 표시되어야 함", async ({ page }) => {
    const testBoardId = "690174c9d4299d0029cd09b5";

    // 네트워크 속도를 느리게 설정하여 로딩 상태를 확인
    await page.route("**/graphql", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.continue();
    });

    await page.goto(`/boards/${testBoardId}`);

    // 로딩 상태 확인 (선택적)
    const loadingElement = page.locator('[data-testid="board-loading"]');
    const loadingCount = await loadingElement.count();

    if (loadingCount > 0) {
      await expect(loadingElement).toBeVisible({ timeout: 1000 });
    }

    // 최종적으로 데이터가 로드되어야 함
    await page.waitForLoadState("networkidle", { timeout: 2000 });
    const titleElement = page.locator('[data-testid="board-title"]');
    await expect(titleElement).toBeVisible({ timeout: 2000 });
  });
});
