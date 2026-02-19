import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const agentIndex = process.env.PLAYWRIGHT_AGENT_INDEX ? parseInt(process.env.PLAYWRIGHT_AGENT_INDEX) : 0;
const port = 3000 + agentIndex;

export default defineConfig({
  // testDir: "./src/commons/layout/tests",
  // /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests - 안정적인 테스트를 위해 순차 실행 */
  workers: 1,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: "html",
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${port}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      retries: 1, // Firefox는 렌더링이 느려서 1번 재시도
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      retries: 2, // WebKit API 불안정성 대응을 위해 2번 재시도
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `PORT=${port} npm run dev:test`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true, // 기존 서버 재사용
  },
});
