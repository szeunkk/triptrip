import { test, expect } from "@playwright/test";

test.describe("Layout Link Routing", () => {
  test.beforeEach(async ({ page }) => {
    // 게시글 목록 페이지로 이동 (헤더와 배너가 있는 페이지)
    await page.goto("/boards");
    // 페이지 로드 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="layout-header"]');
  });

  test("로고 클릭시 게시글 목록 페이지로 이동", async ({ page }) => {
    // 로고 클릭
    await page.click('[data-testid="layout-logo"]');

    // URL 확인
    await expect(page).toHaveURL("/boards");

    // 트립토크 탭이 active 상태인지 확인
    const boardsTab = page.locator('[data-testid="tab-boards"]');
    await expect(boardsTab).toHaveClass(/tabActive/);
  });

  test("트립토크 탭 클릭시 게시글 목록 페이지로 이동", async ({ page }) => {
    // 트립토크 탭 클릭
    await page.click('[data-testid="tab-boards"]');

    // URL 확인
    await expect(page).toHaveURL("/boards");

    // 트립토크 탭이 active 상태인지 확인
    const boardsTab = page.locator('[data-testid="tab-boards"]');
    await expect(boardsTab).toHaveClass(/tabActive/);
  });

  test("게시글 페이지에서 트립토크 탭이 active 상태로 표시됨", async ({
    page,
  }) => {
    // 이미 /boards 페이지에 있음 (beforeEach에서 이동)
    // 트립토크 탭이 active 상태인지 확인
    const boardsTab = page.locator('[data-testid="tab-boards"]');
    await expect(boardsTab).toHaveClass(/tabActive/);

    // 다른 탭들은 active가 아님
    const productsTab = page.locator('[data-testid="tab-products"]');
    const mypageTab = page.locator('[data-testid="tab-mypage"]');
    await expect(productsTab).not.toHaveClass(/tabActive/);
    await expect(mypageTab).not.toHaveClass(/tabActive/);
  });

  // skip 대상: /products
  test.skip("숙박권 구매 탭 클릭시 숙박권 목록 페이지로 이동", async ({
    page,
  }) => {
    // 숙박권 구매 탭 클릭
    await page.click('[data-testid="tab-products"]');

    // URL 확인
    await expect(page).toHaveURL("/products");

    // 숙박권 구매 탭이 active 상태인지 확인
    const productsTab = page.locator('[data-testid="tab-products"]');
    await expect(productsTab).toHaveClass(/tabActive/);

    // 다른 탭들은 active가 아님
    const boardsTab = page.locator('[data-testid="tab-boards"]');
    const mypageTab = page.locator('[data-testid="tab-mypage"]');
    await expect(boardsTab).not.toHaveClass(/tabActive/);
    await expect(mypageTab).not.toHaveClass(/tabActive/);
  });

  // skip 대상: /mypage
  test.skip("마이페이지 탭 클릭시 마이페이지로 이동", async ({ page }) => {
    // 마이페이지 탭 클릭
    await page.click('[data-testid="tab-mypage"]');

    // URL 확인
    await expect(page).toHaveURL("/mypage");

    // 마이페이지 탭이 active 상태인지 확인
    const mypageTab = page.locator('[data-testid="tab-mypage"]');
    await expect(mypageTab).toHaveClass(/tabActive/);

    // 다른 탭들은 active가 아님
    const boardsTab = page.locator('[data-testid="tab-boards"]');
    const productsTab = page.locator('[data-testid="tab-products"]');
    await expect(boardsTab).not.toHaveClass(/tabActive/);
    await expect(productsTab).not.toHaveClass(/tabActive/);
  });
});
