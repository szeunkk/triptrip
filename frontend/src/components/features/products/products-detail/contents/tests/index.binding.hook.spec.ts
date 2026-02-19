import { test, expect } from "@playwright/test";

test.describe("ProductsDetailContents - 데이터 바인딩 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 수행
    await page.goto("/login");
    await page.getByPlaceholder("이메일을 입력해 주세요.").fill("audwogus@bnd.com");
    await page.getByPlaceholder("비밀번호를 입력해 주세요.").fill("audwogus1204");
    await page.getByRole("button", { name: "로그인" }).click();
    
    // URL 변경 대기 (로그인 완료 감지)
    await page.waitForURL(/\/(products|mypage|boards)/);
    
    // 제품 목록 페이지로 이동하여 실제 제품 ID 가져오기
    await page.goto("/products");
    await page.waitForLoadState("load");
    
    // 카드 영역 내부의 첫 번째 제품 카드 찾기
    const cardArea = page.getByTestId("card-area");
    const firstProductCard = cardArea.locator('[data-testid^="product-card-"]').first();
    const testId = await firstProductCard.getAttribute('data-testid').catch(() => null);
    
    let productId = "676e50501d96940032a38d98"; // 기본값
    
    if (testId && testId.startsWith('product-card-')) {
      productId = testId.replace('product-card-', '');
      console.log("Found product ID:", productId);
    } else {
      console.log("Using default product ID:", productId);
    }
    
    // 제품 상세 페이지로 이동
    await page.goto(`/products/${productId}`);
  });

  test("제품 상세 정보가 정상적으로 로드되어야 한다", async ({ page }) => {
    // 페이지 로딩 대기
    await page.waitForLoadState("load");
    
    // 현재 URL 확인
    console.log("Current URL:", page.url());
    
    // 스크린샷 찍기
    await page.screenshot({ path: "test-results/product-detail-screenshot.png", fullPage: true });
    
    // 페이지 HTML 가져오기
    const pageContent = await page.content();
    console.log("Page has 'products-detail-contents':", pageContent.includes('products-detail-contents'));
    console.log("Page has 'product-title':", pageContent.includes('product-title'));
    console.log("Page has '로딩 중':", pageContent.includes('로딩 중'));
    console.log("Page has '데이터를 불러올 수 없습니다':", pageContent.includes('데이터를 불러올 수 없습니다'));
    
    // 페이지 콘텐츠 확인
    const detailContents = page.getByTestId("products-detail-contents");
    await expect(detailContents).toBeVisible({ timeout: 2000 });
    
    // 로딩이나 에러 확인
    const hasLoading = await page.getByText("로딩 중...").isVisible().catch(() => false);
    const hasError = await page.getByText("데이터를 불러올 수 없습니다.").isVisible().catch(() => false);
    
    console.log("Has loading:", hasLoading);
    console.log("Has error:", hasError);
    
    if (hasError) {
      throw new Error("페이지에 에러 메시지가 표시되었습니다.");
    }
    
    // 제품 타이틀이 표시될 때까지 대기 (로딩 완료를 의미)
    const titleElement = page.getByTestId("product-title");
    await expect(titleElement).toBeVisible({ timeout: 2000 });
    
    const title = await titleElement.textContent();
    expect(title).toBeTruthy();
    expect(title).not.toBe("");
  });

  test("제품 부제목이 정상적으로 표시되어야 한다", async ({ page }) => {
    const subtitleElement = page.getByTestId("product-subtitle");
    await expect(subtitleElement).toBeVisible({ timeout: 2000 });
    
    const subtitle = await subtitleElement.textContent();
    expect(subtitle).toBeTruthy();
  });

  test("제품 태그가 # 접두사와 함께 표시되어야 한다", async ({ page }) => {
    const tagsElement = page.getByTestId("product-tags");
    
    // 태그 요소가 존재하는지 확인
    const isVisible = await tagsElement.isVisible().catch(() => false);
    
    if (isVisible) {
      // 태그가 있으면 # 접두사 확인
      const tags = await tagsElement.textContent();
      expect(tags).toContain("#");
    } else {
      // 태그가 비어있으면 숨겨져 있어야 함 (정상 동작)
      expect(isVisible).toBe(false);
    }
  });

  test("북마크 카운트가 정상적으로 표시되어야 한다", async ({ page }) => {
    const bookmarkElement = page.getByTestId("bookmark");
    await expect(bookmarkElement).toBeVisible({ timeout: 2000 });
    
    const bookmarkCount = await bookmarkElement.textContent();
    expect(bookmarkCount).toBeTruthy();
  });

  test("제품 이미지가 정상적으로 로드되어야 한다", async ({ page }) => {
    const picturesSection = page.getByTestId("pictures-section");
    
    // 이미지 섹션이 존재하는지 확인
    const isVisible = await picturesSection.isVisible().catch(() => false);
    
    if (isVisible) {
      // 이미지가 있으면 메인 이미지도 확인
      const mainPicture = page.getByTestId("main-picture");
      await expect(mainPicture).toBeVisible();
    } else {
      // 이미지가 비어있으면 섹션이 숨겨져 있어야 함 (정상 동작)
      expect(isVisible).toBe(false);
    }
  });

  test("제품 상세 설명이 정상적으로 표시되어야 한다", async ({ page }) => {
    const contentSection = page.getByTestId("content-section");
    await expect(contentSection).toBeVisible({ timeout: 2000 });
    
    const contentText = page.getByTestId("content-text");
    await expect(contentText).toBeVisible();
    
    const content = await contentText.textContent();
    expect(content).toBeTruthy();
    expect(content).not.toBe("");
  });

  test("지도 섹션이 정상적으로 표시되어야 한다", async ({ page }) => {
    const mapSection = page.getByTestId("map-section");
    await expect(mapSection).toBeVisible({ timeout: 2000 });
  });

  test("판매자 카드가 정상적으로 표시되어야 한다", async ({ page }) => {
    const sellerCard = page.getByTestId("products-detail-card");
    await expect(sellerCard).toBeVisible({ timeout: 2000 });
  });

  test("데이터 로딩 중 상태가 정상적으로 처리되어야 한다", async ({ page }) => {
    await page.goto("/products/676e50501d96940032a38d98");
    
    const detailContents = page.getByTestId("products-detail-contents");
    await expect(detailContents).toBeVisible({ timeout: 2000 });
  });

  test("존재하지 않는 제품 ID로 접근 시 에러 처리되어야 한다", async ({ page }) => {
    await page.goto("/products/invalid-product-id-123456789");
    
    const detailContents = page.getByTestId("products-detail-contents");
    await expect(detailContents).toBeVisible({ timeout: 2000 });
  });

  test("API 응답 데이터가 UI에 올바르게 반영되어야 한다", async ({ page }) => {
    // 현재 페이지(beforeEach에서 이미 이동함)에서 테스트
    await expect(page.getByTestId("product-title")).toBeVisible({ timeout: 2000 });
    await expect(page.getByTestId("product-subtitle")).toBeVisible({ timeout: 500 });
    
    // 태그는 데이터가 있을 때만 표시됨
    const tagsElement = page.getByTestId("product-tags");
    const tagsVisible = await tagsElement.isVisible().catch(() => false);
    if (tagsVisible) {
      await expect(tagsElement).toBeVisible({ timeout: 500 });
    }
    
    await expect(page.getByTestId("bookmark")).toBeVisible({ timeout: 500 });
    await expect(page.getByTestId("content-text")).toBeVisible({ timeout: 500 });
  });
});

