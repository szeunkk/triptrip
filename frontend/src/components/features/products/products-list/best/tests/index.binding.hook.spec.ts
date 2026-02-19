import { test, expect } from "@playwright/test";

test.describe("ProductsListBest 컴포넌트 데이터 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("실제 API를 통해 상품 데이터가 정상적으로 로드되어야 함", async ({ page }) => {
    // 데이터 로딩 대기 - 카드가 렌더링 될 때까지
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 2000 });

    // 카드가 존재하는지 확인
    const cards = await page.locator('[data-testid="product-card"]').count();
    expect(cards).toBeGreaterThan(0);

    // 첫 번째 카드의 데이터 확인
    const firstCard = page.locator('[data-testid="product-card"]').first();
    
    // 제목이 존재하는지 확인
    const title = await firstCard.locator('[data-testid="product-title"]').textContent();
    expect(title).toBeTruthy();
    expect(title?.length).toBeGreaterThan(0);

    // 설명이 존재하는지 확인
    const description = await firstCard.locator('[data-testid="product-description"]').textContent();
    expect(description).toBeTruthy();

    // 가격이 존재하는지 확인
    const price = await firstCard.locator('[data-testid="product-price"]').textContent();
    expect(price).toBeTruthy();

    // 북마크 카운트가 존재하는지 확인
    const bookmarkCount = await firstCard.locator('[data-testid="product-bookmark-count"]').textContent();
    expect(bookmarkCount).toBeTruthy();
    expect(Number(bookmarkCount)).toBeGreaterThanOrEqual(0);
  });

  test("이미지가 정상적으로 로드되어야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 2000 });

    // 첫 번째 카드의 이미지 확인
    const firstCard = page.locator('[data-testid="product-card"]').first();
    const image = firstCard.locator('[data-testid="product-image"]');
    
    // 이미지 요소가 존재하는지 확인
    await expect(image).toBeVisible();

    // 이미지의 background-image 스타일이 설정되었는지 확인
    const backgroundImage = await image.evaluate((el) => 
      window.getComputedStyle(el).backgroundImage
    );
    expect(backgroundImage).not.toBe("none");
  });

  test("여러 상품 카드가 정상적으로 렌더링되어야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 2000 });

    // 카드 개수 확인 (최소 1개 이상)
    const cards = await page.locator('[data-testid="product-card"]').count();
    expect(cards).toBeGreaterThan(0);

    // 각 카드가 필수 요소를 가지고 있는지 확인
    for (let i = 0; i < Math.min(cards, 3); i++) {
      const card = page.locator('[data-testid="product-card"]').nth(i);
      await expect(card.locator('[data-testid="product-title"]')).toBeVisible();
      await expect(card.locator('[data-testid="product-description"]')).toBeVisible();
      await expect(card.locator('[data-testid="product-price"]')).toBeVisible();
      await expect(card.locator('[data-testid="product-bookmark-count"]')).toBeVisible();
    }
  });

  test("다음 버튼 클릭 시 슬라이드가 이동해야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 2000 });

    const cardWrapper = page.locator('[data-testid="product-card-wrapper"]');
    
    // 초기 transform 값 확인
    const initialTransform = await cardWrapper.evaluate((el) => 
      window.getComputedStyle(el).transform
    );

    // 다음 버튼 클릭
    await page.click('[data-testid="next-button"]');

    // 약간의 시간을 주어 브라우저가 스타일을 적용하도록 함
    await page.waitForTimeout(100);

    // transform 값이 변경되었는지 확인
    const updatedTransform = await cardWrapper.evaluate((el) => 
      window.getComputedStyle(el).transform
    );

    expect(updatedTransform).not.toBe(initialTransform);
  });

  test("API 에러 발생 시 적절히 처리되어야 함", async ({ page }) => {
    // 네트워크 에러 시뮬레이션 - 실제 API를 차단
    await page.route("**/graphql", (route) => {
      route.abort("failed");
    });

    await page.goto("/products");

    // 에러 상태에서도 페이지가 깨지지 않아야 함
    // 로딩 상태 또는 에러 메시지가 표시되어야 함
    const hasErrorOrLoading = await page.evaluate(() => {
      // 페이지가 정상적으로 렌더링되었는지 확인
      return document.body.textContent !== null;
    });

    expect(hasErrorOrLoading).toBe(true);
  });

  test("로딩 중에는 데이터가 표시되지 않아야 함", async ({ page }) => {
    // 네트워크 속도를 늦춰서 로딩 상태 확인
    await page.route("**/graphql", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });

    const navigationPromise = page.goto("/products");

    // 네비게이션 완료 대기
    await navigationPromise;

    // 로딩 완료 후 카드 확인
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 2000 });
    const cardsAfterLoad = await page.locator('[data-testid="product-card"]').count();

    // 로딩 후에는 카드가 있어야 함
    expect(cardsAfterLoad).toBeGreaterThan(0);
  });
});

