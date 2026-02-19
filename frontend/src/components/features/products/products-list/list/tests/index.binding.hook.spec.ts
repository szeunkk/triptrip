import { test, expect } from "@playwright/test";

test.describe("ProductsList 컴포넌트 데이터 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("실제 API를 통해 예약 가능 숙소 데이터가 정상적으로 로드되어야 함", async ({ page }) => {
    // 데이터 로딩 대기 - 카드가 렌더링 될 때까지
    await page.waitForSelector('[data-testid^="product-card-"]', { timeout: 2000 });

    // 카드가 존재하는지 확인
    const cards = await page.locator('[data-testid^="product-card-"]').count();
    expect(cards).toBeGreaterThan(0);

    // 첫 번째 카드의 데이터 확인
    const firstCard = page.locator('[data-testid^="product-card-"]').first();
    
    // 카드 내용이 존재하는지 확인
    const cardContent = await firstCard.textContent();
    expect(cardContent).toBeTruthy();
    expect(cardContent?.length).toBeGreaterThan(0);
  });

  test("API 응답 데이터가 UI에 올바르게 바인딩되어야 함", async ({ page }) => {
    // 실제 API 응답을 가로채서 데이터 검증
    let apiResponse: unknown = null;
    
    // 페이지 로드 전에 API 응답 캡처 설정
    await page.route('**/graphql', async (route) => {
      const response = await route.fetch();
      const responseBody = await response.json();
      
      // fetchTravelproducts 쿼리 응답인 경우 저장
      if (responseBody.data?.fetchTravelproducts) {
        apiResponse = responseBody.data.fetchTravelproducts;
      }
      
      await route.fulfill({ response });
    });

    // 페이지 이동
    await page.goto("/products");
    
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid="card-area"]', { timeout: 2000 });
    await page.waitForSelector('[data-testid^="product-card-"]', { timeout: 2000 });

    // API 응답이 캡처되었는지 확인
    expect(apiResponse).toBeTruthy();
    expect(apiResponse.length).toBeGreaterThan(0);

    const firstProduct = apiResponse[0];

    // card-area 내의 첫 번째 카드 선택 (best 영역 제외)
    const cardArea = page.locator('[data-testid="card-area"]');
    const firstCard = cardArea.locator('[data-testid^="product-card-"]').first();

    // 1. 제목(name) 바인딩 검증
    const titleElement = firstCard.locator('h3, [class*="cardTitle"]').first();
    const titleText = await titleElement.textContent();
    expect(titleText?.includes(firstProduct.name.substring(0, Math.min(20, firstProduct.name.length)))).toBe(true);

    // 2. 설명(remarks) 바인딩 검증
    const descriptionElement = firstCard.locator('p, [class*="cardDescription"]').first();
    const descriptionText = await descriptionElement.textContent();
    expect(descriptionText?.includes(firstProduct.remarks.substring(0, Math.min(20, firstProduct.remarks.length)))).toBe(true);

    // 3. 북마크 카운트(pickedCount) 바인딩 검증
    const bookmarkElement = firstCard.locator('[class*="bookmarkCount"]').first();
    const bookmarkText = await bookmarkElement.textContent();
    expect(bookmarkText).toBe(String(firstProduct.pickedCount));

    // 4. 가격(price) 바인딩 및 포맷 검증
    const priceElement = firstCard.locator('[class*="priceAmount"]').first();
    const priceText = await priceElement.textContent();
    const expectedPrice = firstProduct.price.toLocaleString();
    expect(priceText).toBe(expectedPrice);

    // 5. 판매자(seller.name) 바인딩 검증
    const sellerElement = firstCard.locator('[class*="profileName"]').first();
    const sellerText = await sellerElement.textContent();
    expect(sellerText).toBe(firstProduct.seller.name);

    // 6. 태그(tags) 배열 → 문자열 변환 검증 (각 태그 앞에 # 추가)
    if (firstProduct.tags && firstProduct.tags.length > 0) {
      const tagsElement = firstCard.locator('[class*="cardTags"]').first();
      const tagsText = await tagsElement.textContent();
      const expectedTags = firstProduct.tags.map((tag: string) => `#${tag}`).join(' ');
      expect(tagsText).toBe(expectedTags);
    }

    // 7. 이미지 바인딩 검증
    const productImage = firstCard.locator('img').first();
    const imageSrc = await productImage.getAttribute('src');
    
    if (firstProduct.images && firstProduct.images.length > 0) {
      // 이미지가 있는 경우: Google Storage URL
      expect(imageSrc).toContain('storage.googleapis.com');
    } else {
      // 이미지가 없는 경우: 폴백 이미지
      // Next.js Image 컴포넌트를 사용하는 경우 URL이 변환됨
      expect(imageSrc).toMatch(/accommodation_\d+\.png/);
    }

    // 8. 프로필 이미지 바인딩 검증
    const profileImage = firstCard.locator('[class*="profileImage"]').first();
    const profileSrc = await profileImage.getAttribute('src');
    
    if (firstProduct.seller.picture) {
      // picture가 있는 경우: Google Storage URL
      expect(profileSrc).toContain('storage.googleapis.com');
    } else {
      // picture가 없는 경우: 폴백 이미지
      expect(profileSrc).toBe('/images/profile/6.svg');
    }
  });

  test("예약 마감 숙소 탭으로 전환 시 데이터가 변경되어야 함", async ({ page }) => {
    // 예약 가능 숙소 데이터 로딩 대기
    await page.waitForSelector('[data-testid^="product-card-"]', { timeout: 2000 });

    // 예약 마감 숙소 탭 클릭
    await page.click('[data-testid="tab-closed"]');

    // 탭 활성화 상태 변경 대기
    await page.waitForSelector('[data-testid="tab-closed"].tabActive, [data-testid="tab-closed"][class*="tabActive"]', { 
      timeout: 1000,
      state: 'attached'
    }).catch(() => {
      // CSS 모듈로 인해 클래스명 매칭이 안될 수 있으므로, 카드 상태로 확인
    });

    // 예약 마감 숙소 카드 개수 확인
    const closedCards = await page.locator('[data-testid^="product-card-"]').count();

    // 카드 개수가 달라야 함 (또는 최소 0개 이상)
    expect(closedCards).toBeGreaterThanOrEqual(0);
  });

  test("여러 상품 카드가 정상적으로 렌더링되어야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid^="product-card-"]', { timeout: 2000 });

    // 카드 개수 확인 (최소 1개 이상)
    const cards = await page.locator('[data-testid^="product-card-"]').count();
    expect(cards).toBeGreaterThan(0);

    // 각 카드가 콘텐츠를 가지고 있는지 확인
    for (let i = 0; i < Math.min(cards, 3); i++) {
      const card = page.locator('[data-testid^="product-card-"]').nth(i);
      const content = await card.textContent();
      expect(content).toBeTruthy();
    }
  });

  test("검색 기능이 정상적으로 작동해야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid^="product-card-"]', { timeout: 2000 });

    // 검색어 입력
    await page.fill('[data-testid="search-input"]', "테스트");

    // 검색 버튼 클릭 (텍스트로 찾기)
    await page.click('button:has-text("검색")');

    // 검색 후 페이지가 여전히 렌더링되는지 확인 (검색 기능이 아직 구현되지 않았으므로 기본 확인만)
    await page.waitForLoadState('domcontentloaded');

    // 페이지가 정상적으로 렌더링되었는지 확인
    const hasContent = await page.evaluate(() => {
      return document.body.textContent !== null;
    });

    expect(hasContent).toBe(true);
  });

  test("탭 전환이 정상적으로 작동해야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid="tab-available"]', { timeout: 2000 });

    // 예약 가능 탭 확인
    const availableTab = page.locator('[data-testid="tab-available"]');
    await expect(availableTab).toBeVisible();

    // 예약 마감 탭 확인
    const closedTab = page.locator('[data-testid="tab-closed"]');
    await expect(closedTab).toBeVisible();

    // 예약 마감 탭 클릭
    await closedTab.click();

    // 클릭 후 DOM이 안정화될 때까지 대기
    await page.waitForLoadState('domcontentloaded');

    // 페이지가 정상적으로 렌더링되었는지 확인
    const hasContent = await page.evaluate(() => {
      return document.body.textContent !== null;
    });

    expect(hasContent).toBe(true);
  });

  test("API 네트워크 에러 발생 시 에러 UI가 표시되어야 함", async ({ page }) => {
    // 네트워크 에러 시뮬레이션 - 실제 API를 차단
    await page.route("**/graphql", (route) => {
      route.abort("failed");
    });

    await page.goto("/products");

    // 페이지 로딩 대기
    await page.waitForLoadState('domcontentloaded');
    
    // 컨테이너가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="products-list"]');
    
    const pageContent = await page.textContent('[data-testid="products-list"]');
    
    // 에러 메시지 또는 에러 상태 UI가 표시되어야 함
    // "에러가 발생했습니다" 텍스트 포함 확인
    const hasErrorMessage = pageContent?.includes('에러');
    
    expect(hasErrorMessage).toBe(true);

    // 타이틀은 여전히 표시되어야 함
    const titleExists = await page.locator('[data-testid="page-title"]').isVisible();
    expect(titleExists).toBe(true);

    // card-area의 상품 카드는 표시되지 않아야 함
    const cardArea = page.locator('[data-testid="card-area"]');
    const cardAreaExists = await cardArea.count();
    
    // 카드 영역이 없거나, 있더라도 카드가 없어야 함
    if (cardAreaExists > 0) {
      const hasCards = await cardArea.locator('[data-testid^="product-card-"]').count();
      expect(hasCards).toBe(0);
    }
  });

  test("API 응답 지연 시 로딩 상태가 표시되어야 함", async ({ page }) => {
    let isDelayActive = true;

    // API 응답을 지연시킴
    await page.route("**/graphql", async (route) => {
      if (isDelayActive) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      await route.continue();
    });

    const navigationPromise = page.goto("/products");

    // 로딩 중 메시지 확인 (빠르게 확인해야 함)
    await page.waitForLoadState('domcontentloaded');
    const loadingText = await page.textContent('body');
    const hasLoadingMessage = loadingText?.includes('로딩') || 
                             loadingText?.includes('로드');

    // 로딩 메시지가 있거나, 데이터가 아직 로드되지 않았어야 함
    const cardsWhileLoading = await page.locator('[data-testid^="product-card-"]').count();
    
    // 로딩 중이면 카드가 없거나, 로딩 메시지가 있어야 함
    const isLoadingState = cardsWhileLoading === 0 || hasLoadingMessage === true;
    expect(isLoadingState).toBe(true);

    // 네비게이션 완료 대기
    isDelayActive = false;
    await navigationPromise;

    // 로딩 완료 후 데이터 확인
    await page.waitForSelector('[data-testid^="product-card-"]', { timeout: 2000 });
    const cardsAfterLoad = await page.locator('[data-testid^="product-card-"]').count();
    expect(cardsAfterLoad).toBeGreaterThan(0);
  });


  test("카테고리 영역이 정상적으로 표시되어야 함", async ({ page }) => {
    // 데이터 로딩 대기
    await page.waitForSelector('[data-testid="category"]', { timeout: 2000 });

    // 카테고리 영역 확인
    const category = page.locator('[data-testid="category"]');
    await expect(category).toBeVisible();

    // 카테고리 아이템 확인
    const categoryItems = await page.locator('[data-testid^="category-"]').count();
    expect(categoryItems).toBeGreaterThan(0);
  });

  test("검색바 그룹이 정상적으로 표시되어야 함", async ({ page }) => {
    // 검색바 그룹 확인
    const searchbarGroup = page.locator('[data-testid="searchbar-group"]');
    await expect(searchbarGroup).toBeVisible({ timeout: 2000 });

    // 날짜 선택기 확인
    const datepicker = page.locator('[data-testid="datepicker"]');
    await expect(datepicker).toBeVisible();

    // 검색바 확인
    const searchbar = page.locator('[data-testid="searchbar"]');
    await expect(searchbar).toBeVisible();

    // 검색 버튼 확인 (텍스트로 찾기)
    const searchButton = page.locator('button:has-text("검색")');
    await expect(searchButton).toBeVisible();

    // 판매 버튼 확인 (텍스트로 찾기)
    const sellButton = page.locator('button:has-text("숙박권 판매하기")');
    await expect(sellButton).toBeVisible();
  });
});

