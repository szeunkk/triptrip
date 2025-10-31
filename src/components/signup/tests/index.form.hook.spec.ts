import { test, expect } from "@playwright/test";

test.describe("회원가입 폼 기능 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 이전 테스트의 모달 상태 cleanup (전체 테스트 실행 시 격리 보장)
    await page.evaluate(() => {
      const modalRoot = document.getElementById("modal-root");
      if (modalRoot) {
        modalRoot.removeAttribute("data-portal-ready");
        modalRoot.innerHTML = "";
      }
    });

    // /signup 페이지로 이동하고 완전히 로드될 때까지 대기
    await page.goto("/signup");
    await page.waitForSelector('[data-testid="signup-page"]');
  });

  test("4-1) 모든 인풋이 입력되면 회원가입 버튼을 활성화", async ({ page }) => {
    // 초기 상태: 버튼 비활성화 확인
    const submitButton = page.locator('[data-testid="signup-button"]');
    await expect(submitButton).toBeDisabled();

    // 이메일 입력
    await page.locator('[data-testid="email-input"]').fill("test@example.com");
    await expect(submitButton).toBeDisabled();

    // 이름 입력
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력 (8자 미만 - 검증 실패)
    await page.locator('[data-testid="password-input"]').fill("1234567");
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력 (8자 이상 - 검증 성공)
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await expect(submitButton).toBeDisabled();

    // 비밀번호 확인 입력 (불일치)
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("87654321");
    await expect(submitButton).toBeDisabled();

    // 비밀번호 확인 입력 (일치)
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 모든 필드가 유효하면 버튼 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("4-2) 회원가입 버튼을 누르면 회원가입 API를 요청 - 성공 시나리오", async ({
    page,
  }) => {
    // timestamp를 포함한 고유 이메일 생성
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    // 회원가입 폼 입력
    await page.locator('[data-testid="email-input"]').fill(email);
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 회원가입 버튼 클릭
    const submitButton = page.locator('[data-testid="signup-button"]');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // 회원가입 성공 모달이 표시될 때까지 대기 (API 응답 시간 고려)
    // WebKit은 portal 렌더가 느리므로 data-portal-ready 플래그와 ready 플래그 모두 대기
    await page.waitForSelector('#modal-root[data-portal-ready="true"]', {
      timeout: 4000,
      state: "attached",
    });
    await expect(
      page.locator('[data-testid="signup-success-popup"][data-ready="true"]')
    ).toBeVisible({ timeout: 4000 });
  });

  test("4-3) 회원가입 성공 시 가입 완료 모달 노출 및 로그인 페이지로 이동", async ({
    page,
  }) => {
    // timestamp를 포함한 고유 이메일 생성
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    // 회원가입 폼 입력
    await page.locator('[data-testid="email-input"]').fill(email);
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="signup-button"]').click();

    // 회원가입 성공 모달 표시 확인
    // WebKit은 portal 렌더가 느리므로 data-portal-ready 플래그와 ready 플래그 모두 대기
    await page.waitForSelector('#modal-root[data-portal-ready="true"]', {
      timeout: 4000,
      state: "attached",
    });
    const successModal = page.locator(
      '[data-testid="signup-success-popup"][data-ready="true"]'
    );
    await expect(successModal).toBeVisible({ timeout: 4000 });

    // 로그인하기 버튼 클릭
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // 로그인 페이지로 이동 확인
    await expect(page).toHaveURL("/login");
  });

  test("4-3-2) 회원가입 성공 시 쿼리문을 포함하여 로그인 페이지로 이동", async ({
    page,
  }) => {
    // 쿼리 파라미터를 포함하여 회원가입 페이지로 이동
    await page.goto("/signup?redirect=/boards");
    await page.waitForSelector('[data-testid="signup-page"]');

    // timestamp를 포함한 고유 이메일 생성
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;

    // 회원가입 폼 입력
    await page.locator('[data-testid="email-input"]').fill(email);
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="signup-button"]').click();

    // WebKit은 portal 렌더가 느리므로 data-portal-ready 플래그와 ready 플래그 모두 대기
    await page.waitForSelector('#modal-root[data-portal-ready="true"]', {
      timeout: 4000,
      state: "attached",
    });
    await expect(
      page.locator('[data-testid="signup-success-popup"][data-ready="true"]')
    ).toBeVisible({ timeout: 4000 });

    // 로그인하기 버튼 클릭
    await page.locator('[data-testid="login-button"]').click();

    // 쿼리 파라미터를 포함하여 로그인 페이지로 이동 확인 (URL 인코딩됨)
    await expect(page).toHaveURL("/login?redirect=%2Fboards");
  });

  test("검증 실패 테스트 - 이메일 @ 미포함", async ({ page }) => {
    // 잘못된 이메일 입력 (@ 미포함)
    await page.locator('[data-testid="email-input"]').fill("testexample.com");
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 버튼이 비활성화되어야 함
    await expect(page.locator('[data-testid="signup-button"]')).toBeDisabled();

    // 에러 메시지 확인
    await expect(
      page.locator('[data-testid="email-input-error"]')
    ).toContainText("이메일을 입력해 주세요.");
  });

  test("검증 실패 테스트 - 이름 미입력", async ({ page }) => {
    // 이름 미입력
    await page.locator('[data-testid="email-input"]').fill("test@example.com");
    await page.locator('[data-testid="name-input"]').fill("");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 버튼이 비활성화되어야 함
    await expect(page.locator('[data-testid="signup-button"]')).toBeDisabled();
  });

  test("검증 실패 테스트 - 비밀번호 8자 미만", async ({ page }) => {
    // 비밀번호 8자 미만
    await page.locator('[data-testid="email-input"]').fill("test@example.com");
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("1234567");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("1234567");

    // 버튼이 비활성화되어야 함
    await expect(page.locator('[data-testid="signup-button"]')).toBeDisabled();

    // 에러 메시지 확인
    await expect(
      page.locator('[data-testid="password-input-error"]')
    ).toContainText("비밀번호를 입력해 주세요.");
  });

  test("검증 실패 테스트 - 비밀번호 불일치", async ({ page }) => {
    // 비밀번호 불일치
    await page.locator('[data-testid="email-input"]').fill("test@example.com");
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("87654321");

    // 버튼이 비활성화되어야 함
    await expect(page.locator('[data-testid="signup-button"]')).toBeDisabled();

    // 에러 메시지 확인
    await expect(
      page.locator('[data-testid="password-confirm-input-error"]')
    ).toContainText("비밀번호를 입력해 주세요.");
  });

  test("4-4) 회원가입 실패 시 에러 메시지 표시 - 중복 이메일", async ({
    page,
  }) => {
    // API 응답 모킹: 중복 이메일 에러
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [
            {
              message: "이미 가입된 이메일입니다.",
              extensions: { code: "BAD_USER_INPUT" },
            },
          ],
        }),
      });
    });

    // 회원가입 폼 입력
    await page
      .locator('[data-testid="email-input"]')
      .fill("duplicate@example.com");
    await page.locator('[data-testid="name-input"]').fill("홍길동");
    await page.locator('[data-testid="password-input"]').fill("12345678");
    await page
      .locator('[data-testid="password-confirm-input"]')
      .fill("12345678");

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="signup-button"]').click();

    // API 에러 메시지 확인
    await expect(page.locator('[data-testid="api-error"]')).toContainText(
      "이미 가입된 이메일입니다."
    );
  });
});
