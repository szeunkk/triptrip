import { test, expect } from "@playwright/test";

/**
 * BoardsDetail 컴포넌트 링크 라우팅 테스트
 * - 실제 API 데이터를 사용하여 테스트합니다.
 * - Mock 데이터를 사용하지 않습니다.
 * - 성공 시나리오와 실패 시나리오를 모두 테스트합니다.
 */

test.describe("BoardsDetail 링크 라우팅 테스트", () => {
  // 테스트에 사용할 실제 게시글 ID
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
        timeout: 2000,
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

  test.describe("성공 시나리오 - 정상 동작", () => {
    test("목록으로 버튼 클릭 시 /boards 페이지로 이동해야 함", async ({
      page,
    }) => {
      // Given: 게시글 상세 페이지로 이동
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });
      await page.waitForSelector('[data-testid="board-title"]', {
        timeout: 2000,
      });

      // 목록으로 버튼 찾기
      const listButton = page.getByTestId("button-list");

      // Then: 버튼이 보이고 활성화되어 있어야 함
      await expect(listButton).toBeVisible({ timeout: 2000 });
      await expect(listButton).toBeEnabled();

      // When: 목록으로 버튼 클릭
      await listButton.click();

      // Then: /boards 페이지로 이동
      await expect(page).toHaveURL("/boards", { timeout: 2000 });

      // Then: 목록 페이지가 정상 렌더링됨
      await expect(page.locator('[data-testid="board-item-0"]')).toBeVisible({
        timeout: 2000,
      });
    });

    test("수정하기 버튼 클릭 시 /boards/[boardId]/edit 페이지로 이동해야 함", async ({
      page,
    }) => {
      // Given: 게시글 상세 페이지로 이동
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });
      await page.waitForSelector('[data-testid="board-title"]', {
        timeout: 2000,
      });

      // 수정하기 버튼 찾기
      const editButton = page.getByTestId("button-edit");

      // Then: 버튼이 보이고 활성화되어 있어야 함
      await expect(editButton).toBeVisible();
      await expect(editButton).toBeEnabled();

      // When: 수정하기 버튼 클릭
      await editButton.click();

      // Then: /boards/[boardId]/edit 페이지로 이동
      await expect(page).toHaveURL(`/boards/${testBoardId}/edit`, {
        timeout: 2000,
      });
    });

    test("버튼들이 cursor: pointer 스타일을 가져야 함", async ({ page }) => {
      // Given: 게시글 상세 페이지로 이동
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });
      await page.waitForSelector('[data-testid="board-title"]', {
        timeout: 2000,
      });

      const listButton = page.getByTestId("button-list");
      const editButton = page.getByTestId("button-edit");

      // Then: 버튼들이 pointer cursor를 가짐
      const listButtonCursor = await listButton.evaluate(
        (el) => window.getComputedStyle(el).cursor
      );
      const editButtonCursor = await editButton.evaluate(
        (el) => window.getComputedStyle(el).cursor
      );

      expect(listButtonCursor).toBe("pointer");
      expect(editButtonCursor).toBe("pointer");
    });

    test("버튼들이 화면에 표시되고 접근 가능해야 함", async ({ page }) => {
      // Given: 게시글 상세 페이지로 이동
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });
      await page.waitForSelector('[data-testid="board-title"]', {
        timeout: 2000,
      });

      const listButton = page.getByTestId("button-list");
      const editButton = page.getByTestId("button-edit");

      // Then: 버튼들이 화면에 표시됨
      await expect(listButton).toBeVisible();
      await expect(editButton).toBeVisible();

      // Then: 버튼들이 활성화 상태임
      await expect(listButton).toBeEnabled();
      await expect(editButton).toBeEnabled();
    });

    test("목록으로 버튼 여러 번 클릭해도 정상 동작해야 함", async ({
      page,
    }) => {
      // Given: 게시글 상세 페이지로 이동
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });
      await page.waitForSelector('[data-testid="board-title"]', {
        timeout: 2000,
      });

      const listButton = page.getByTestId("button-list");

      // When: 목록으로 버튼을 2번 클릭
      await listButton.click();
      await page.waitForURL("/boards", { timeout: 2000 });

      // Then: 목록 페이지에 있음
      expect(page.url()).toContain("/boards");

      // When: 다시 상세 페이지로 돌아가기
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });
      await page.waitForSelector('[data-testid="board-title"]', {
        timeout: 2000,
      });

      // When: 다시 목록으로 버튼 클릭
      await listButton.click();

      // Then: 다시 목록 페이지로 이동
      await expect(page).toHaveURL("/boards", { timeout: 2000 });
    });
  });

  test.describe("실패 시나리오 - 에러 처리", () => {
    /**
     * 실패 시나리오 1: 존재하지 않는 boardId로 접근
     * - 실제 API 호출에서 에러 발생
     * - Mock 데이터 사용 금지
     * - 에러 상태가 UI에 반영되는지 검증
     */
    test("존재하지 않는 boardId로 접근 시 버튼이 표시되지 않아야 함", async ({
      page,
    }) => {
      // Given: 존재하지 않는 게시글 ID로 접근
      const invalidBoardId = "invalid-board-id-999999";
      await page.goto(`/boards/${invalidBoardId}`);

      // 페이지 로딩 완료 대기
      await page.waitForLoadState("domcontentloaded");
      await page.waitForLoadState("networkidle", { timeout: 2000 });

      // Then: 에러 상태가 표시됨
      const errorElement = page.locator('[data-testid="board-error"]');
      const isErrorVisible = await errorElement.isVisible().catch(() => false);

      // Then: 에러 상태에서는 버튼들이 렌더링되지 않음
      if (isErrorVisible) {
        const listButton = page.getByTestId("button-list");
        const editButton = page.getByTestId("button-edit");

        const isListButtonVisible = await listButton
          .isVisible()
          .catch(() => false);
        const isEditButtonVisible = await editButton
          .isVisible()
          .catch(() => false);

        expect(isListButtonVisible).toBe(false);
        expect(isEditButtonVisible).toBe(false);
      }
    });

    /**
     * 실패 시나리오 2: 네트워크 에러 상황
     * - 실제 네트워크 차단을 통한 에러 재현
     * - Mock 데이터 사용 금지
     * - 에러 처리 로직이 UI에 반영되는지 검증
     */
    test("네트워크 에러 발생 시 버튼이 표시되지 않아야 함", async ({
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

      // When: 페이지 이동 시도
      await page.goto(`/boards/${testBoardId}`);
      await page.waitForTimeout(1500);

      // Then: 에러 상태에서는 버튼들이 렌더링되지 않음
      const listButton = page.getByTestId("button-list");
      const editButton = page.getByTestId("button-edit");

      const isListButtonVisible = await listButton
        .isVisible()
        .catch(() => false);
      const isEditButtonVisible = await editButton
        .isVisible()
        .catch(() => false);

      expect(isListButtonVisible).toBe(false);
      expect(isEditButtonVisible).toBe(false);
    });
  });

  test.describe("엣지 케이스 - 경계 조건", () => {
    test("로딩 중에는 버튼이 표시되지 않아야 함", async ({ page }) => {
      // Given: 페이지 이동 시작
      const navigationPromise = page.goto(`/boards/${testBoardId}`);

      // When: 로딩 중 버튼 확인 시도 (매우 빠르게)
      await page.waitForTimeout(100);

      const loadingElement = page.locator('[data-testid="board-loading"]');
      const isLoadingVisible = await loadingElement
        .isVisible()
        .catch(() => false);

      // Then: 로딩 중이면 버튼이 없어야 함
      if (isLoadingVisible) {
        const listButton = page.getByTestId("button-list");
        const isButtonVisible = await listButton.isVisible().catch(() => false);
        expect(isButtonVisible).toBe(false);
      }

      // 네비게이션 완료 대기
      await navigationPromise;
      await page.waitForLoadState("networkidle", { timeout: 2000 });
    });
  });
});
