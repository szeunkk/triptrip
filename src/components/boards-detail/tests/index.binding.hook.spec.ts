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
  // 테스트에 사용할 실제 게시글 ID (동적으로 조회)
  let testBoardId: string;

  // 전체 테스트 전에 한 번만 게시글 ID를 조회 (API 직접 호출)
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // GraphQL API를 직접 호출하여 첫 번째 게시글 ID 가져오기
      await page.goto("/boards");

      // DOM 기반으로 게시글 로드 대기 (브라우저 독립적)
      await page.waitForSelector('[data-testid^="board-item-"]', {
        timeout: 5000,
      });

      // 첫 번째 게시글의 data-testid에서 ID 추출
      const firstBoardTitle = page
        .locator('[data-testid="board-item-0"]')
        .locator('[data-testid^="board-title-"]');
      const testId = await firstBoardTitle.getAttribute("data-testid");

      if (!testId) {
        throw new Error("❌ 테스트할 게시글 ID를 찾을 수 없습니다.");
      }

      testBoardId = testId.replace("board-title-", "");

      if (!testBoardId) {
        throw new Error("❌ 테스트할 게시글 ID를 파싱할 수 없습니다.");
      }

      console.log(`✅ 테스트용 게시글 ID: ${testBoardId}`);
    } finally {
      await context.close();
    }
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
        const src = await imageElement.first().getAttribute("src");
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
});
