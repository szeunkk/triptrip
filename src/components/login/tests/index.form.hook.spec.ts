import { test, expect } from "@playwright/test";

/**
 * 로그인 폼 테스트
 * 로그인 폼의 렌더링, 검증, API 호출, 페이지 이동을 테스트합니다.
 *
 * 테스트 조건:
 * - 실제 API 호출 (Mock 데이터 미사용)
 * - 네트워크 통신 timeout: 2000ms 미만
 * - 일반 렌더링 timeout: 500ms 미만
 * - data-testid 기반 요소 선택
 */
test.describe("로그인 폼 테스트", () => {
  /**
   * 각 테스트 실행 전 setup
   * /login 페이지로 이동하고 폼이 로드될 때까지 대기합니다.
   */
  test.beforeEach(async ({ page }) => {
    // /login 페이지로 이동 후 data-testid로 페이지 로드 완료 확인
    await page.goto("/login");
    await page.waitForSelector('[data-testid="login-form"]', {
      timeout: 2000,
    });
  });

  /**
   * 로그인 폼 렌더링 테스트
   * 이메일 Input, 비밀번호 Input, 로그인 버튼이 화면에 표시되는지 확인합니다.
   */
  test("로그인 폼이 정상적으로 렌더링되는지 확인", async ({ page }) => {
    // 이메일, 비밀번호 Input 존재 확인
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const loginButton = page.locator('[data-testid="login-submit-button"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  /**
   * 이메일 검증 테스트 - @ 미포함
   * '@' 기호가 없는 이메일을 입력했을 때 에러 메시지가 표시되는지 확인합니다.
   * Zod 검증 로직이 정상 동작하는지 검증합니다.
   */
  test("이메일 검증 - @ 미포함시 에러 메시지 표시", async ({ page }) => {
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const loginButton = page.locator('[data-testid="login-submit-button"]');

    // 잘못된 이메일 입력
    await emailInput.fill("invalidemail");
    await passwordInput.fill("password123");
    await loginButton.click();

    // 에러 메시지 확인 (Input 컴포넌트가 자동으로 testid-error를 추가)
    const emailError = page.locator('[data-testid="login-email-input-error"]');
    await expect(emailError).toBeVisible({ timeout: 500 });
    await expect(emailError).toContainText("이메일을 입력해 주세요");
  });

  /**
   * 비밀번호 검증 테스트 - 빈 값
   * 비밀번호를 입력하지 않았을 때 에러 메시지가 표시되는지 확인합니다.
   * Zod 검증 로직의 최소 길이 검증이 정상 동작하는지 검증합니다.
   */
  test("비밀번호 검증 - 빈 값일 때 에러 메시지 표시", async ({ page }) => {
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const loginButton = page.locator('[data-testid="login-submit-button"]');

    // 이메일만 입력
    await emailInput.fill("test@test.com");
    await passwordInput.fill("");
    await loginButton.click();

    // 에러 메시지 확인 (Input 컴포넌트가 자동으로 testid-error를 추가)
    const passwordError = page.locator(
      '[data-testid="login-password-input-error"]'
    );
    await expect(passwordError).toBeVisible({ timeout: 500 });
    await expect(passwordError).toContainText("비밀번호를 입력해 주세요");
  });

  /**
   * 로그인 성공 시나리오 - 실제 API 호출
   *
   * 테스트 흐름:
   * 1. 실제 계정 정보로 로그인 시도 (audwogus@bnd.com / audwogus1204)
   * 2. loginUser API 호출하여 accessToken 획득
   * 3. fetchUserLoggedIn API 호출하여 사용자 정보 획득
   * 4. localStorage에 accessToken과 user 정보 저장 확인
   * 5. /boards 페이지로 이동 확인
   *
   * 검증 항목:
   * - API 응답이 정상적으로 수신되는지
   * - localStorage에 데이터가 올바르게 저장되는지
   * - 페이지 이동이 정상적으로 이루어지는지
   */
  test("로그인 성공 시나리오 - 실제 API 호출", async ({ page }) => {
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const loginButton = page.locator('[data-testid="login-submit-button"]');

    // 실제 API 데이터 입력
    await emailInput.fill("audwogus@bnd.com");
    await passwordInput.fill("audwogus1204");

    // 로그인 버튼 클릭
    await loginButton.click();

    // 페이지 이동 대기
    await page.waitForURL("/boards", { timeout: 5000 });

    // /boards 페이지로 이동 확인 (추가 대기)
    await expect(page).toHaveURL("/boards", { timeout: 2000 });

    // localStorage에 accessToken과 user 정보 저장 확인
    const accessToken = await page.evaluate(() =>
      localStorage.getItem("accessToken")
    );
    const user = await page.evaluate(() => localStorage.getItem("user"));

    expect(accessToken).not.toBeNull();
    expect(accessToken).toBeTruthy();

    expect(user).not.toBeNull();
    const userData = JSON.parse(user!);
    expect(userData).toHaveProperty("_id");
    expect(userData).toHaveProperty("name");
  });

  /**
   * 로그인 실패 시나리오 - 잘못된 비밀번호
   *
   * 테스트 흐름:
   * 1. 올바른 이메일, 잘못된 비밀번호로 로그인 시도
   * 2. loginUser API에서 에러 응답 수신
   * 3. 비밀번호 필드 하단에 에러 메시지 표시 확인
   *
   * 검증 항목:
   * - API 에러 처리가 정상적으로 동작하는지
   * - 사용자에게 에러 메시지가 올바르게 표시되는지
   */
  test("로그인 실패 시나리오 - 잘못된 비밀번호", async ({ page }) => {
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const loginButton = page.locator('[data-testid="login-submit-button"]');

    // 잘못된 비밀번호 입력
    await emailInput.fill("audwogus@bnd.com");
    await passwordInput.fill("wrongpassword");
    await loginButton.click();

    // 에러 메시지 확인 (2초 이내)
    const passwordError = page.locator('[data-testid="login-password-error"]');
    await expect(passwordError).toBeVisible({ timeout: 2000 });
    await expect(passwordError).toContainText(
      "아이디 또는 비밀번호를 확인해 주세요"
    );
  });

  /**
   * 로그인 성공 후 redirect 경로 이동 테스트
   *
   * 테스트 흐름:
   * 1. redirect 쿼리스트링과 함께 로그인 페이지 접근 (/login?redirect=/boards/new)
   * 2. 실제 계정으로 로그인 성공
   * 3. redirect 쿼리스트링에 지정된 경로(/boards/new)로 이동 확인
   *
   * 검증 항목:
   * - 쿼리스트링 redirect 파라미터가 정상적으로 처리되는지
   * - 로그인 후 지정된 경로로 이동하는지
   */
  test("로그인 성공 후 쿼리스트링 redirect 경로로 이동", async ({ page }) => {
    // redirect 쿼리스트링과 함께 로그인 페이지 접근
    await page.goto("/login?redirect=/boards/new");
    await page.waitForSelector('[data-testid="login-form"]', {
      timeout: 2000,
    });

    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const loginButton = page.locator('[data-testid="login-submit-button"]');

    // 로그인
    await emailInput.fill("audwogus@bnd.com");
    await passwordInput.fill("audwogus1204");
    await loginButton.click();

    // 페이지 이동 대기 - redirect 경로로 이동
    await page.waitForURL("/boards/new", { timeout: 5000 });

    // /boards/new 페이지로 이동 확인
    await expect(page).toHaveURL("/boards/new", { timeout: 2000 });

    // localStorage에 accessToken과 user 정보 저장 확인
    const accessToken = await page.evaluate(() =>
      localStorage.getItem("accessToken")
    );
    const user = await page.evaluate(() => localStorage.getItem("user"));

    expect(accessToken).not.toBeNull();
    expect(accessToken).toBeTruthy();

    expect(user).not.toBeNull();
    const userData = JSON.parse(user!);
    expect(userData).toHaveProperty("_id");
    expect(userData).toHaveProperty("name");
  });
});
