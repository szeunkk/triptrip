import { test, expect } from "@playwright/test";

// Window 타입 확장
declare global {
  interface Window {
    __PRODUCT_WRITE_SET_VALUE__?: (
      name: string,
      value: string,
      options?: { shouldValidate?: boolean }
    ) => void;
  }
}

test.describe("상품 등록 폼 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 처리
    await page.goto("/login");
    await page.fill('input[name="email"]', "audwogus@bnd.com");
    await page.fill('input[name="password"]', "audwogus1204");
    await page.click('button[type="submit"]');
    
    // 로그인 완료 대기 (게시판 페이지로 리다이렉트)
    await page.waitForURL(/\/boards/, { timeout: 2000 });

    // 상품 등록 페이지로 이동
    await page.goto("/products/new");

    // 페이지 로드 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="product-write-form"]', { timeout: 2000 });
  });

  test("성공 시나리오: 모든 필수 필드를 입력하고 상품 등록에 성공하면 상세 페이지로 이동해야 한다", async ({
    page,
  }) => {
    // GraphQL 요청을 가로채서 성공 응답 모킹 (테스트 시작 전에 설정)
    await page.route("**graphql**", async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      // createTravelproduct mutation 요청인 경우에만 intercept
      if (postData?.query?.includes("createTravelproduct")) {
        // 가짜 성공 응답 반환
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              createTravelproduct: {
                _id: "test-product-id-123",
                name: postData.variables.createTravelproductInput.name,
                remarks: postData.variables.createTravelproductInput.remarks,
                contents: postData.variables.createTravelproductInput.contents,
                price: postData.variables.createTravelproductInput.price,
                tags: postData.variables.createTravelproductInput.tags || [],
                images: postData.variables.createTravelproductInput.images || [],
                pickedCount: 0,
                travelproductAddress: postData.variables.createTravelproductInput.travelproductAddress,
                seller: {
                  name: "테스트 판매자",
                  picture: "https://example.com/picture.jpg",
                },
              },
            },
          }),
        });
      } else {
        // 다른 요청은 그대로 통과
        await route.continue();
      }
    });

    // 고유성을 보장하기 위한 timestamp
    const timestamp = Date.now();
    const uniqueProductName = `테스트 상품 ${timestamp}`;

    // 폼 입력
    await page.fill('input[name="name"]', uniqueProductName);
    await page.fill('input[name="remarks"]', "테스트 한줄 요약");
    
    // Lexical 에디터에 내용 입력
    const editorContent = page.locator('[data-testid="input-contents"] [contenteditable="true"]');
    await editorContent.click();
    await editorContent.fill("테스트 상품 설명");
    
    await page.fill('input[name="price"]', "50000");
    await page.fill('input[name="tags"]', "태그1, 태그2, 태그3");

    // 주소 입력 (react-hook-form의 setValue를 사용하여 정상적인 플로우로 설정)
    await page.evaluate(() => {
      const setValue = window.__PRODUCT_WRITE_SET_VALUE__;
      if (setValue) {
        setValue("productAddress.zipcode", "12345", { shouldValidate: true });
        setValue("productAddress.address", "서울시 강남구 테스트동", { shouldValidate: true });
      } else {
        console.error("setValue is not available");
      }
    });

    // 폼 검증이 완료되도록 잠시 대기
    await page.waitForTimeout(500);

    // 제출 버튼이 활성화되기를 기다림
    const submitButton = page.locator('[data-testid="button-submit"]');
    await expect(submitButton).toBeEnabled({ timeout: 2000 });

    // 제출 버튼 클릭
    await submitButton.click();

    // 상세 페이지로 이동했는지 확인
    await expect(page).toHaveURL(/\/products\/test-product-id-123/, { timeout: 1500 });
  });

  test("실패 시나리오: 필수 필드가 누락되면 제출 버튼이 비활성화되어야 한다", async ({ page }) => {
    // 상품명만 입력
    await page.fill('input[name="name"]', "테스트 상품");

    // 제출 버튼이 비활성화되어 있는지 확인
    const submitButton = page.locator('[data-testid="button-submit"]');
    await expect(submitButton).toBeDisabled({ timeout: 500 });
  });

  test("실패 시나리오: API 오류 발생 시 에러 모달이 표시되어야 한다", async ({ page }) => {
    // GraphQL 요청을 가로채서 에러 응답 모킹
    await page.route("**graphql**", async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      // createTravelproduct mutation 요청인 경우에만 intercept
      if (postData?.query?.includes("createTravelproduct")) {
        // GraphQL 표준 에러 응답 반환 (status는 200으로 유지)
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [
              {
                message: "상품 등록에 실패했습니다.",
                extensions: {
                  code: "BAD_REQUEST",
                },
              },
            ],
            data: null,
          }),
        });
      } else {
        // 다른 요청은 그대로 통과
        await route.continue();
      }
    });

    // 고유성을 보장하기 위한 timestamp
    const timestamp = Date.now();
    const uniqueProductName = `테스트 상품 ${timestamp}`;

    // 폼 입력
    await page.fill('input[name="name"]', uniqueProductName);
    await page.fill('input[name="remarks"]', "테스트 한줄 요약");
    
    // Lexical 에디터에 내용 입력
    const editorContent = page.locator('[data-testid="input-contents"] [contenteditable="true"]');
    await editorContent.click();
    await editorContent.fill("테스트 상품 설명");
    
    await page.fill('input[name="price"]', "50000");

    // 주소 입력 (react-hook-form의 setValue를 사용하여 정상적인 플로우로 설정)
    await page.evaluate(() => {
      const setValue = window.__PRODUCT_WRITE_SET_VALUE__;
      if (setValue) {
        setValue("productAddress.zipcode", "12345", { shouldValidate: true });
        setValue("productAddress.address", "서울시 강남구 테스트동", { shouldValidate: true });
      } else {
        console.error("setValue is not available in error test");
      }
    });

    // 폼 검증이 완료되도록 잠시 대기
    await page.waitForTimeout(500);

    // 제출 버튼이 활성화되기를 기다림
    const submitButton = page.locator('[data-testid="button-submit"]');
    await expect(submitButton).toBeEnabled({ timeout: 2000 });

    // 제출 버튼 클릭
    await submitButton.click();

    // 에러 모달이 표시되는지 확인 (Ant Design의 Modal.error 구조)
    const errorModal = page.locator('.ant-modal-confirm-error, .ant-modal-error');
    await expect(errorModal).toBeVisible({ timeout: 2000 });

    // 에러 메시지가 포함되어 있는지 확인
    const errorContent = page.locator('.ant-modal-confirm-body');
    await expect(errorContent).toContainText("상품 등록에 실패", { timeout: 500 });
  });

  test("검증 시나리오: 가격은 숫자만 입력 가능해야 한다", async ({ page }) => {
    // 가격 필드에 문자 입력 시도
    await page.fill('input[name="price"]', "abc");

    // 제출 버튼이 비활성화되어 있는지 확인
    const submitButton = page.locator('[data-testid="button-submit"]');
    await expect(submitButton).toBeDisabled({ timeout: 500 });
  });
});

