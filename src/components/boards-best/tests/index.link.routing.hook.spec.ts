import { test, expect } from "@playwright/test";
import {
  waitForBoardsReady,
  waitForBoardsBestReady,
} from "../../../utils/test-helpers";

/**
 * Boards Best Link Routing E2E Tests
 * 베스트 게시글 카드 클릭 시 상세 페이지로 이동하는 기능을 테스트합니다.
 *
 * 주의사항:
 * - Mock 데이터 사용 금지
 * - 실제 API 호출을 통한 테스트
 * - network 통신 포함 테스트: timeout 2000ms 미만
 * - data-testid를 사용한 요소 식별 (CSS Module 충돌 방지)
 */

test.describe("Boards Best Link Routing", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const browserName = testInfo.project.name;
    // 게시글 목록 페이지로 이동 (베스트 게시글이 표시되는 페이지)
    await page.goto("/boards");
    // 페이지 로딩 완료 대기
    await page.waitForLoadState("domcontentloaded");

    // Boards 컴포넌트 대기 (board-item)
    await waitForBoardsReady(page, browserName);

    // BoardsBest 컴포넌트 대기 (boards-best-card) - 별도 API!
    await waitForBoardsBestReady(page, browserName);

    // boards-best-card가 있는지 확인 (에러 상태면 스킵)
    const bestCardCount = await page
      .locator('[data-testid="boards-best-card"]')
      .count();
    if (bestCardCount === 0) {
      test.skip(); // API 에러로 카드가 없으면 테스트 스킵
    }
  });

  /**
   * 테스트 시나리오 1: 카드 클릭 시 상세 페이지 이동
   * - 실제 API 데이터의 boardId를 사용하여 이동
   * - url.ts의 경로 정의를 사용하는지 검증
   * - 상세 페이지가 정상 로드되는지 확인
   */
  test("베스트 게시글 카드 클릭 시 해당 게시글 상세 페이지로 이동", async ({
    page,
  }) => {
    // Given: 첫 번째 베스트 게시글 카드 찾기
    const firstCard = page.locator('[data-testid="boards-best-card"]').first();

    // 카드가 존재하는지 확인
    await expect(firstCard).toBeVisible();

    // 카드의 boardId를 가져오기 위해 key 속성 확인 (React key는 data-board-id로 전달 예정)
    const boardId = await firstCard.getAttribute("data-board-id");
    expect(boardId).toBeTruthy();

    // When: 카드 클릭
    await firstCard.click();

    // Then: 게시글 상세 페이지로 이동 확인
    await expect(page).toHaveURL(`/boards/${boardId}`);

    // 상세 페이지가 로드되었는지 확인
    await page.waitForSelector('[data-testid="board-title"]', {
      timeout: 2000,
    });
  });

  /**
   * 테스트 시나리오 2: 여러 카드의 개별 이동 검증
   * - 각 카드가 서로 다른 boardId를 가지는지 확인
   * - 각 카드 클릭 시 해당 boardId의 상세 페이지로 이동하는지 검증
   * - 뒤로가기 동작 후 다른 카드 클릭 시 정상 이동하는지 확인
   */
  test("여러 베스트 게시글 카드가 각각 다른 상세 페이지로 이동", async ({
    page,
  }) => {
    // Given: 모든 베스트 게시글 카드 찾기
    const cards = page.locator('[data-testid="boards-best-card"]');
    const cardCount = await cards.count();

    // 최소 2개 이상의 카드가 있는지 확인
    expect(cardCount).toBeGreaterThanOrEqual(2);

    // 첫 번째 카드의 boardId 가져오기
    const firstCard = cards.first();
    const firstBoardId = await firstCard.getAttribute("data-board-id");

    // 두 번째 카드의 boardId 가져오기
    const secondCard = cards.nth(1);
    const secondBoardId = await secondCard.getAttribute("data-board-id");

    // boardId가 서로 다른지 확인
    expect(firstBoardId).not.toBe(secondBoardId);

    // When: 첫 번째 카드 클릭
    await firstCard.click();

    // Then: 첫 번째 게시글 상세 페이지로 이동 확인
    await expect(page).toHaveURL(`/boards/${firstBoardId}`);
    await page.waitForSelector('[data-testid="board-title"]', {
      timeout: 2000,
    });

    // When: 뒤로가기 후 두 번째 카드 클릭
    await page.goBack();
    await page.waitForSelector('[data-testid="boards-best-card"]', {
      timeout: 2000,
    });

    const secondCardAfterBack = page
      .locator('[data-testid="boards-best-card"]')
      .nth(1);
    await secondCardAfterBack.click();

    // Then: 두 번째 게시글 상세 페이지로 이동 확인
    await expect(page).toHaveURL(`/boards/${secondBoardId}`);
    await page.waitForSelector('[data-testid="board-title"]', {
      timeout: 2000,
    });
  });

  /**
   * 테스트 시나리오 3: 카드 스타일 검증
   * - CSS에 cursor: pointer가 적용되었는지 확인
   * - 클릭 가능한 UI임을 사용자에게 시각적으로 표시하는지 검증
   */
  test("베스트 게시글 카드에 cursor pointer 스타일이 적용됨", async ({
    page,
  }) => {
    // Given: 첫 번째 베스트 게시글 카드 찾기
    const firstCard = page.locator('[data-testid="boards-best-card"]').first();

    // When: 카드의 cursor 스타일 확인
    const cursor = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });

    // Then: cursor가 pointer여야 함
    expect(cursor).toBe("pointer");
  });

  test.describe("실패 시나리오 - 네트워크 에러 처리", () => {
    /**
     * 테스트 시나리오 4: 네트워크 에러 시 링크 라우팅 동작 검증
     * - 실제 네트워크를 차단하여 API 에러 재현
     * - Mock 데이터 사용 금지
     * - 에러 상태에서도 페이지 구조는 유지되는지 검증
     *
     * 주의: Link Routing 기능 자체는 에러가 발생하지 않음 (카드 없으면 클릭 불가)
     * 이 테스트는 boards-best 컴포넌트의 에러 처리를 간접적으로 검증
     */
    test("네트워크 에러 발생 시 페이지 구조는 유지되고 카드만 표시되지 않음", async ({
      page,
      context,
    }) => {
      // Given: 네트워크를 차단하여 에러 상황 재현 (실제 네트워크 에러)
      await context.route(
        "https://main-practice.codebootcamp.co.kr/graphql",
        (route) => {
          route.abort("failed");
        }
      );

      // When: 페이지 이동
      await page.goto("/boards");
      await page.waitForTimeout(1500);

      // Then: 에러 상태에서는 카드가 렌더링되지 않아야 함
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .count();
      expect(cards).toBe(0);

      // 섹션 제목은 여전히 표시되어야 함 (에러 상태에서도 페이지 구조 유지)
      const title = page.locator("text=오늘 핫한 트립토크");
      await expect(title).toBeVisible();

      // 카드가 없으므로 링크 라우팅 기능은 동작하지 않음 (정상)
      // 이는 Link Routing의 실패가 아니라, 데이터 부재로 인한 정상 동작
    });
  });
});
