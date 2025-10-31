import { Page } from "@playwright/test";

/**
 * /boards 페이지가 완전히 로드될 때까지 대기하는 헬퍼 함수
 * - 브라우저별 타임아웃 적용 (Firefox/WebKit은 느림)
 * - networkidle 대기로 API 완료 보장
 * - DOM 렌더링 확인 및 렌더링 지연 대응
 * - error/empty 상태도 "완료"로 인정하여 타임아웃 방지
 */
export async function waitForBoardsReady(
  page: Page,
  browserName: string = "chromium"
) {
  // 브라우저별 타임아웃 설정
  const timeout = browserName === "chromium" ? 2000 : 2000;

  // 1) networkidle 대기 - API 요청 완료 보장
  await page.waitForLoadState("networkidle", { timeout });

  // 2) 페이지 로딩 완료 대기: board-item 또는 error 또는 empty 중 하나
  await page.waitForFunction(
    () => {
      const hasBoardItems =
        document.querySelector('[data-testid^="board-item-"]') !== null;
      const hasError =
        document.querySelector('[data-testid="error-message"]') !== null;
      const hasEmpty = document.querySelector(".emptyMessage") !== null;
      return hasBoardItems || hasError || hasEmpty;
    },
    { timeout }
  );

  // 3) 최종 상태 확인 및 board-item이 있는 경우만 스크롤
  const finalState = await page.evaluate(() => {
    const hasBoardItems =
      document.querySelector('[data-testid^="board-item-"]') !== null;
    return { hasBoardItems };
  });

  // 4) Firefox/WebKit 렌더링 지연 대응: board-item이 있는 경우만 스크롤
  if (finalState.hasBoardItems) {
    const firstItem = page.locator('[data-testid^="board-item-"]').first();
    await firstItem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
}

/**
 * BoardsBest 컴포넌트가 완전히 로드될 때까지 대기하는 헬퍼 함수
 * - fetchBoardsOfTheBest API 완료 대기
 * - boards-best-card 또는 에러 상태 확인
 * - Boards 컴포넌트와 독립적으로 작동
 */
export async function waitForBoardsBestReady(
  page: Page,
  browserName: string = "chromium"
) {
  // 브라우저별 타임아웃 설정
  const timeout = browserName === "chromium" ? 2000 : 2000;

  // 1) BoardsBest 완료 대기: boards-best-card 또는 error
  await page.waitForFunction(
    () => {
      const hasBestCards =
        document.querySelector('[data-testid="boards-best-card"]') !== null;
      const hasError =
        document.querySelector('[data-testid="boards-best-error"]') !== null;
      return hasBestCards || hasError;
    },
    { timeout }
  );

  // 2) boards-best-card가 있는 경우만 스크롤
  const finalState = await page.evaluate(() => {
    return {
      hasBestCards:
        document.querySelector('[data-testid="boards-best-card"]') !== null,
    };
  });

  if (finalState.hasBestCards) {
    const firstCard = page.locator('[data-testid="boards-best-card"]').first();
    await firstCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
}
