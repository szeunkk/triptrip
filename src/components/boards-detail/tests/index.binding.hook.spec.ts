import { test, expect } from "@playwright/test";
import { waitForBoardsReady } from "../../../utils/test-helpers";

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
  // 테스트에 사용할 실제 게시글 ID (동적으로 조회)
  let testBoardId: string;

  // 각 테스트 전에 실제 존재하는 게시글 ID를 조회 (브라우저별 실행 보장)
  test.beforeEach(async ({ page }, testInfo) => {
    // 이미 ID가 있으면 재사용
    if (testBoardId) return;

    const browserName = testInfo.project.name;

    // 게시글 목록 페이지로 이동하여 실제 데이터 로드
    await page.goto("/boards");

    // 페이지 로딩이 완전히 완료될 때까지 대기
    await page.waitForLoadState("domcontentloaded");
    // 브라우저별 최적화된 대기 로직
    await waitForBoardsReady(page, browserName);

    // board-item이 실제로 있는지 확인 (error 상태가 아닌지 체크)
    const timeout = browserName === "chromium" ? 2000 : 5000;
    let hasBoardItems = await page
      .locator('[data-testid^="board-item-"]')
      .count();

    // API 에러로 board-item이 없으면 페이지 재로드 후 재시도
    if (hasBoardItems === 0) {
      console.log(
        `⚠️ [${browserName}] board-item이 없음. 페이지 재로드 후 재시도...`
      );
      await page.reload();
      await page.waitForLoadState("domcontentloaded");
      await waitForBoardsReady(page, browserName);

      hasBoardItems = await page
        .locator('[data-testid^="board-item-"]')
        .count();

      if (hasBoardItems === 0) {
        throw new Error(
          "❌ 재시도 후에도 게시글 목록을 불러올 수 없습니다. API 에러 또는 데이터 없음."
        );
      }

      console.log(`✅ [${browserName}] 재시도 성공: ${hasBoardItems}개 발견`);
    }

    // GraphQL 응답을 통해 게시글 ID 추출 (짧은 타임아웃 설정)
    const firstItem = page.locator('[data-testid="board-item-0"]');
    const titleElement = firstItem.locator('[data-testid^="board-title-"]');
    const testId = await titleElement.getAttribute("data-testid", {
      timeout,
    });
    testBoardId = testId?.replace("board-title-", "") || "";

    if (!testBoardId) {
      throw new Error("❌ 테스트할 게시글 ID를 찾을 수 없습니다.");
    }

    console.log(`✅ 테스트용 게시글 ID: ${testBoardId}`);
  });

  test.describe("성공 시나리오 - 실제 API 데이터", () => {
    /**
     * 테스트 시나리오 1: 실제 게시글 데이터 로딩 성공 및 UI 반영
     * - 실제 API를 호출하여 데이터를 불러옴
     * - Mock 데이터 사용 금지
     * - API 응답 데이터가 UI에 정상 반영되는지 검증
     */
    test("게시글 상세 페이지에서 실제 API 데이터가 정상적으로 렌더링되어야 함", async ({
      page,
    }) => {
      // Given & When: 게시글 상세 페이지로 이동하면서 API 응답 대기
      const [response] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("graphql") &&
            response.request().postDataJSON()?.operationName === "fetchBoard",
          { timeout: 2000 }
        ),
        page.goto(`/boards/${testBoardId}`),
      ]);

      // 페이지 로딩 완료 대기
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: API 응답이 성공적인지 확인
      expect(response.status()).toBe(200);

      // 응답 데이터 파싱
      const responseData = await response.json();
      expect(responseData.data).toBeDefined();
      expect(responseData.data.fetchBoard).toBeDefined();

      const boardData = responseData.data.fetchBoard;

      // UI에 데이터가 정상 렌더링되는지 확인
      const titleElement = page.locator('[data-testid="board-title"]');
      await expect(titleElement).toBeVisible({ timeout: 2000 });
      await expect(titleElement).toHaveText(boardData.title);

      const writerElement = page.locator('[data-testid="board-writer"]');
      await expect(writerElement).toBeVisible({ timeout: 2000 });
      await expect(writerElement).toHaveText(boardData.writer);

      // 게시글 내용 확인
      const contentElement = page.locator('[data-testid="board-content"]');
      await expect(contentElement).toBeVisible({ timeout: 2000 });
      await expect(contentElement).toHaveText(boardData.contents);

      // 좋아요/싫어요 수 확인
      const likeElement = page.locator('[data-testid="board-like-count"]');
      await expect(likeElement).toBeVisible({ timeout: 2000 });
      await expect(likeElement).toHaveText(boardData.likeCount.toString());

      const dislikeElement = page.locator(
        '[data-testid="board-dislike-count"]'
      );
      await expect(dislikeElement).toBeVisible({ timeout: 2000 });
      await expect(dislikeElement).toHaveText(
        boardData.dislikeCount.toString()
      );
    });

    /**
     * 테스트 시나리오 2: 날짜 포맷 검증
     * - createdAt 필드가 YYYY.MM.DD 형식으로 변환되는지 확인
     */
    test("게시글 날짜가 YYYY.MM.DD 형식으로 정상 포맷되어야 함", async ({
      page,
    }) => {
      // Given & When: 페이지 이동 및 로딩 완료 대기
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: 날짜 형식 검증
      const dateElement = page.locator('[data-testid="board-date"]');
      await expect(dateElement).toBeVisible({ timeout: 2000 });

      const dateText = await dateElement.textContent();
      expect(dateText).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);

      // 실제 날짜로 파싱 가능한지 확인
      const [year, month, day] = dateText!.split(".").map(Number);
      const dateObj = new Date(year, month - 1, day);

      expect(dateObj.getFullYear()).toBe(year);
      expect(dateObj.getMonth() + 1).toBe(month);
      expect(dateObj.getDate()).toBe(day);
    });

    /**
     * 테스트 시나리오 3: 이미지 URL 생성 검증
     * - images 배열이 Google Storage URL로 정상 변환되는지 확인
     * - 조건부 렌더링 동작 확인
     */
    test("이미지가 있는 게시글의 경우 Google Storage URL로 정상 렌더링되어야 함", async ({
      page,
    }) => {
      // Given & When: 페이지 이동 및 로딩 완료 대기
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: 이미지 URL 검증
      const imageElement = page.locator('[data-testid^="board-main-image"]');
      const imageCount = await imageElement.count();

      if (imageCount > 0) {
        await expect(imageElement.first()).toBeVisible({ timeout: 2000 });

        // 이미지 src 속성 확인
        const src = await imageElement.getAttribute("src");
        expect(src).toBeTruthy();

        // Google Storage URL 확인
        if (!src?.includes("/_next/image")) {
          // Next.js 이미지 최적화를 거치지 않은 경우
          expect(src).toContain("storage.googleapis.com");
        }
      }
    });

    /**
     * 테스트 시나리오 4: YouTube 썸네일 URL 생성 검증
     * - youtubeUrl에서 Video ID 추출 확인
     * - 썸네일 URL 생성 확인
     * - 조건부 렌더링 동작 확인
     */
    test("YouTube URL이 있는 게시글의 경우 썸네일이 정상적으로 렌더링되어야 함", async ({
      page,
    }) => {
      // Given & When: 페이지 이동 및 로딩 완료 대기
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: YouTube 썸네일 검증
      const youtubeElement = page.locator('[data-testid="board-youtube"]');
      const youtubeCount = await youtubeElement.count();

      if (youtubeCount > 0) {
        await expect(youtubeElement).toBeVisible({ timeout: 2000 });

        // YouTube 썸네일 src 속성 확인
        const src = await youtubeElement.getAttribute("src");
        expect(src).toBeTruthy();

        // YouTube 썸네일 URL 형식 확인
        if (!src?.includes("/_next/image")) {
          // Next.js 이미지 최적화를 거치지 않은 경우
          expect(src).toContain("img.youtube.com/vi/");
          expect(src).toContain("/hqdefault.jpg");
        }
      }
    });

    /**
     * 테스트 시나리오 5: 좋아요/싫어요 수 데이터 타입 검증
     * - likeCount, dislikeCount가 숫자로 정상 표시되는지 확인
     */
    test("좋아요/싫어요 수가 숫자로 정상 표시되어야 함", async ({ page }) => {
      // Given & When: 페이지 이동 및 로딩 완료 대기
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: 좋아요/싫어요 수 검증
      const likeElement = page.locator('[data-testid="board-like-count"]');
      const dislikeElement = page.locator(
        '[data-testid="board-dislike-count"]'
      );

      const likeText = await likeElement.textContent();
      const dislikeText = await dislikeElement.textContent();

      // 숫자로 변환 가능한지 확인
      const likeCount = Number(likeText);
      const dislikeCount = Number(dislikeText);

      expect(isNaN(likeCount)).toBe(false);
      expect(isNaN(dislikeCount)).toBe(false);
      expect(likeCount).toBeGreaterThanOrEqual(0);
      expect(dislikeCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe("실패 시나리오 - 에러 처리", () => {
    /**
     * 테스트 시나리오 6: 존재하지 않는 게시글 ID 에러 처리
     * - 실제 API 호출에서 에러 발생
     * - Mock 데이터 사용 금지
     * - 에러 상태가 UI에 정상 반영되는지 검증
     */
    test("존재하지 않는 게시글 ID로 접근 시 에러 상태가 처리되어야 함", async ({
      page,
    }) => {
      // Given: 존재하지 않는 게시글 ID 사용
      const invalidBoardId = "invalid-board-id-12345";

      // When: 페이지 이동 및 로딩 완료 대기
      await page.goto(`/boards/${invalidBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: 에러 상태 확인
      const titleElement = page.locator('[data-testid="board-title"]');
      const isVisible = await titleElement.isVisible().catch(() => false);

      // 에러 상태에서는 제목이 정상 표시되지 않아야 함
      expect(isVisible).toBeFalsy();
    });

    /**
     * 테스트 시나리오 7: 네트워크 에러 처리
     * - 실제 네트워크 차단을 통한 에러 재현
     * - Mock 데이터 사용 금지
     * - 에러 처리 로직이 UI에 반영되는지 검증
     */
    test("네트워크 에러 발생 시 에러 상태가 정상 처리되어야 함", async ({
      page,
      context,
    }) => {
      // Given: 네트워크를 차단하여 에러 상황 재현
      await context.route(
        "https://main-practice.codebootcamp.co.kr/graphql",
        (route) => {
          route.abort("failed");
        }
      );

      // When: 페이지 이동
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForTimeout(1500);

      // Then: 에러 상태에서 정상 렌더링되지 않음
      const titleElement = page.locator('[data-testid="board-title"]');
      const isVisible = await titleElement.isVisible().catch(() => false);

      expect(isVisible).toBeFalsy();
    });
  });

  test.describe("로딩 상태 테스트", () => {
    /**
     * 테스트 시나리오 8: 로딩 완료 후 데이터 표시
     * - 로딩 상태가 아닌 실제 데이터가 표시되는지 확인
     */
    test("게시글 데이터가 최종적으로 정상 로드되어야 함", async ({ page }) => {
      // Given & When: 페이지 이동 및 로딩 완료 대기
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: 실제 데이터 표시 확인
      const titleElement = page.locator('[data-testid="board-title"]');
      await expect(titleElement).toBeVisible({ timeout: 2000 });

      // 로딩 상태가 아닌 실제 데이터가 표시되는지 확인
      const titleText = await titleElement.textContent();
      expect(titleText).not.toBe("로딩 중...");
      expect(titleText).not.toBe("게시글을 불러올 수 없습니다.");
    });
  });
});
