import { test, expect } from "@playwright/test";

/**
 * Layout Area Visibility E2E Tests
 * url.ts의 메타데이터에 따라 레이아웃 영역이 올바르게 노출/숨김되는지 테스트합니다.
 *
 * 테스트 전략:
 * - 페이지 로드 식별: data-testid 대기 방식 사용
 * - timeout: 500ms 미만 또는 미설정
 * - Skip 대상: /(auth)/login, /(auth)/signup, /products
 */

test.describe("Layout Area Visibility", () => {
  test.describe("Boards List Page", () => {
    test("/boards 페이지에서 헤더, 로고, 배너가 모두 노출됨", async ({
      page,
    }) => {
      // Given: /boards 페이지로 이동
      await page.goto("/boards");

      // When: 페이지 로드 완료 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="layout-header"]', {
        timeout: 500,
      });

      // Then: header, logo, banner가 모두 노출되어야 함
      const header = page.locator('[data-testid="layout-header"]');
      const logo = page.locator('[data-testid="layout-logo"]');
      const banner = page.locator('[data-testid="layout-banner"]');

      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(banner).toBeVisible();
    });
  });

  test.describe("Boards New Page", () => {
    test("/boards/new 페이지에서 헤더, 로고는 노출되고 배너는 숨겨짐", async ({
      page,
    }) => {
      // Given: /boards/new 페이지로 이동
      await page.goto("/boards/new");

      // When: 페이지 로드 완료 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="layout-header"]', {
        timeout: 500,
      });

      // Then: header, logo는 노출, banner는 숨김
      const header = page.locator('[data-testid="layout-header"]');
      const logo = page.locator('[data-testid="layout-logo"]');
      const banner = page.locator('[data-testid="layout-banner"]');

      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(banner).not.toBeVisible();
    });
  });

  test.describe("Boards Detail Page", () => {
    test("/boards/[boardId] 페이지에서 헤더, 로고, 배너가 모두 노출됨", async ({
      page,
    }) => {
      // Given: /boards/123 페이지로 이동 (실제 ID 사용)
      await page.goto("/boards/123");

      // When: 페이지 로드 완료 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="layout-header"]', {
        timeout: 500,
      });

      // Then: header, logo, banner가 모두 노출되어야 함
      const header = page.locator('[data-testid="layout-header"]');
      const logo = page.locator('[data-testid="layout-logo"]');
      const banner = page.locator('[data-testid="layout-banner"]');

      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(banner).toBeVisible();
    });
  });

  test.describe("Boards Edit Page", () => {
    test("/boards/[boardId]/edit 페이지에서 헤더, 로고는 노출되고 배너는 숨겨짐", async ({
      page,
    }) => {
      // Given: /boards/123/edit 페이지로 이동 (실제 ID 사용)
      await page.goto("/boards/123/edit");

      // When: 페이지 로드 완료 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="layout-header"]', {
        timeout: 500,
      });

      // Then: header, logo는 노출, banner는 숨김
      const header = page.locator('[data-testid="layout-header"]');
      const logo = page.locator('[data-testid="layout-logo"]');
      const banner = page.locator('[data-testid="layout-banner"]');

      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(banner).not.toBeVisible();
    });
  });

  test.describe("Mypage", () => {
    test("/mypage 페이지에서 헤더, 로고는 노출되고 배너는 숨겨짐", async ({
      page,
    }) => {
      // Given: /mypage 페이지로 이동
      await page.goto("/mypage");

      // When: 페이지 로드 완료 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="layout-header"]', {
        timeout: 500,
      });

      // Then: header, logo는 노출, banner는 숨김
      const header = page.locator('[data-testid="layout-header"]');
      const logo = page.locator('[data-testid="layout-logo"]');
      const banner = page.locator('[data-testid="layout-banner"]');

      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(banner).not.toBeVisible();
    });
  });

  // Skip 대상: /(auth)/login, /(auth)/signup, /products
  test.describe.skip("Auth Pages (Skipped)", () => {
    test("/(auth)/login 페이지에서 모든 레이아웃이 숨겨짐", async ({
      page,
    }) => {
      await page.goto("/(auth)/login");
    });

    test("/(auth)/signup 페이지에서 모든 레이아웃이 숨겨짐", async ({
      page,
    }) => {
      await page.goto("/(auth)/signup");
    });
  });

  test.describe.skip("Products Page (Skipped)", () => {
    test("/products 페이지에서 레이아웃이 노출됨", async ({ page }) => {
      await page.goto("/products");
    });
  });
});
