import { test, expect } from "@playwright/test";

test.describe("BoardsBest - 데이터 바인딩 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 게시판 페이지로 이동
    await page.goto("/boards", { waitUntil: "networkidle" });
  });

  test.describe("성공 시나리오 - 실제 API 데이터", () => {
    test("베스트 게시글 데이터가 정상적으로 렌더링되는지 확인", async ({
      page,
    }) => {
      // Given: 페이지가 로드됨 (beforeEach에서 /boards로 이동)

      // When: 실제 API 호출을 기다림 (최대 2000ms)
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 카드가 4개 이하로 렌더링되는지 확인
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .all();
      expect(cards.length).toBeGreaterThan(0);
      expect(cards.length).toBeLessThanOrEqual(4);

      // 첫 번째 카드의 데이터 확인
      const firstCard = cards[0];

      // 제목이 존재하는지 확인
      const title = await firstCard
        .locator('[data-testid="card-title"]')
        .textContent();
      expect(title).toBeTruthy();
      expect(title!.length).toBeGreaterThan(0);

      // 작성자가 존재하는지 확인
      const userName = await firstCard
        .locator('[data-testid="card-username"]')
        .textContent();
      expect(userName).toBeTruthy();
      expect(userName!.length).toBeGreaterThan(0);

      // 좋아요 수가 숫자인지 확인
      const goodCount = await firstCard
        .locator('[data-testid="card-goodcount"]')
        .textContent();
      expect(goodCount).toBeTruthy();
      expect(Number(goodCount)).toBeGreaterThanOrEqual(0);

      // 날짜 형식이 YYYY.MM.DD인지 확인
      const date = await firstCard
        .locator('[data-testid="card-date"]')
        .textContent();
      expect(date).toBeTruthy();
      expect(date).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);

      // 이미지가 존재하는지 확인
      const image = firstCard.locator('[data-testid="card-image"]');
      await expect(image).toBeVisible();
    });

    test("모든 카드의 데이터 필드가 올바르게 바인딩되었는지 확인", async ({
      page,
    }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 모든 카드를 순회하며 필수 필드 검증
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .all();

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // 각 카드의 필수 요소 검증
        const title = card.locator('[data-testid="card-title"]');
        const userName = card.locator('[data-testid="card-username"]');
        const goodCount = card.locator('[data-testid="card-goodcount"]');
        const date = card.locator('[data-testid="card-date"]');
        const image = card.locator('[data-testid="card-image"]');

        // 모든 요소가 visible인지 확인
        await expect(title).toBeVisible();
        await expect(userName).toBeVisible();
        await expect(goodCount).toBeVisible();
        await expect(date).toBeVisible();
        await expect(image).toBeVisible();

        // 날짜 포맷 검증
        const dateText = await date.textContent();
        expect(dateText).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
      }
    });

    test("이미지 URL이 올바르게 생성되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 이미지 src 속성 검증
      const images = await page.locator('[data-testid="card-image"]').all();

      for (const image of images) {
        const src = await image.getAttribute("src");
        expect(src).toBeTruthy();

        // Google Storage URL 또는 로컬 fallback 이미지인지 확인
        const isGoogleStorage = src?.includes("storage.googleapis.com");
        const isLocalFallback = src?.includes("/images/img-");

        expect(isGoogleStorage || isLocalFallback).toBeTruthy();
      }
    });

    test("프로필 이미지 URL이 올바르게 생성되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 프로필 이미지가 /images/profile/ 경로를 사용하는지 확인
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .all();

      for (let i = 0; i < cards.length; i++) {
        const profileImages = await cards[i].locator("img").all();

        // 카드 내 프로필 이미지 찾기 (좋아요 아이콘 제외)
        for (const img of profileImages) {
          const src = await img.getAttribute("src");
          if (src && src.includes("/images/profile/")) {
            expect(src).toMatch(/\/images\/profile\/\d+\.svg/);
          }
        }
      }
    });

    test("최대 4개의 게시글만 표시되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 카드 개수가 4개 이하인지 확인
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .count();

      expect(cards).toBeGreaterThan(0);
      expect(cards).toBeLessThanOrEqual(4);
    });
  });

  test.describe("로딩 상태 테스트", () => {
    test("로딩 상태가 정상적으로 처리되는지 확인", async ({ page }) => {
      // Given: 페이지 로드 시작
      await page.goto("/boards", { waitUntil: "domcontentloaded" });

      // When & Then: 로딩 후 데이터가 표시되는지 확인
      await expect(
        page.locator('[data-testid="boards-best-card"]').first()
      ).toBeVisible({ timeout: 2000 });
    });

    test("로딩 중에는 제목만 표시되고 카드는 표시되지 않음을 확인", async ({
      page,
    }) => {
      // Given: 페이지 로드 시작 (빠른 확인을 위해 domcontentloaded 사용)
      const response = page.goto("/boards", {
        waitUntil: "domcontentloaded",
      });

      // When: 제목은 즉시 렌더링되어야 함
      const title = page.locator("text=오늘 핫한 트립토크");
      await expect(title).toBeVisible();

      // Then: API 응답 후 카드가 표시됨
      await response;
      await expect(
        page.locator('[data-testid="boards-best-card"]').first()
      ).toBeVisible({ timeout: 2000 });
    });
  });

  test.describe("실패 시나리오 - 에러 처리", () => {
    test("API 에러 발생 시 처리가 정상적으로 되는지 확인", async ({
      page,
      context,
    }) => {
      // Given: 네트워크를 차단하여 에러 상황 재현
      await context.route(
        "http://main-practice.codebootcamp.co.kr/graphql",
        (route) => {
          route.abort("failed");
        }
      );

      // When: 페이지 이동
      await page.goto("/boards");
      await page.waitForTimeout(1500);

      // Then: 에러 상태에서도 페이지가 깨지지 않고, 카드가 렌더링되지 않음
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .count();
      expect(cards).toBe(0);
    });

    test("네트워크 에러 시 제목은 표시되고 카드만 표시되지 않음", async ({
      page,
      context,
    }) => {
      // Given: 네트워크를 차단하여 에러 상황 재현
      await context.route(
        "http://main-practice.codebootcamp.co.kr/graphql",
        (route) => {
          route.abort("failed");
        }
      );

      // When: 페이지 이동
      await page.goto("/boards");
      await page.waitForTimeout(1500);

      // Then: 제목은 표시되어야 함
      const title = page.locator("text=오늘 핫한 트립토크");
      await expect(title).toBeVisible();

      // Then: 카드는 표시되지 않아야 함
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .count();
      expect(cards).toBe(0);
    });

    test("API 에러 후 페이지가 정상적으로 렌더링 가능한지 확인", async ({
      page,
      context,
    }) => {
      // Given: 첫 번째 요청은 차단
      let requestCount = 0;
      await context.route(
        "http://main-practice.codebootcamp.co.kr/graphql",
        (route) => {
          requestCount++;
          if (requestCount === 1) {
            route.abort("failed");
          } else {
            route.continue();
          }
        }
      );

      // When: 첫 페이지 이동 (에러 발생)
      await page.goto("/boards");
      await page.waitForTimeout(1000);

      // Then: 카드가 없어야 함
      let cards = await page
        .locator('[data-testid="boards-best-card"]')
        .count();
      expect(cards).toBe(0);

      // When: 페이지 새로고침 (성공)
      await context.unroute("http://main-practice.codebootcamp.co.kr/graphql");
      await page.reload({ waitUntil: "networkidle" });

      // Then: 카드가 표시되어야 함
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });
      cards = await page.locator('[data-testid="boards-best-card"]').count();
      expect(cards).toBeGreaterThan(0);
    });
  });

  test.describe("데이터 바인딩 검증", () => {
    test("_id 필드가 key로 올바르게 사용되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 각 카드가 고유한 key를 가지는지 확인 (React의 key는 DOM에 직접 나타나지 않으므로, 카드의 고유성 확인)
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .all();

      // 모든 카드가 고유한 컨텐츠를 가지는지 확인
      const titles = await Promise.all(
        cards.map((card) =>
          card.locator('[data-testid="card-title"]').textContent()
        )
      );

      // 중복 제거 후 개수 비교
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(cards.length);
    });

    test("날짜가 YYYY.MM.DD 형식으로 올바르게 포맷되는지 확인", async ({
      page,
    }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 모든 날짜가 올바른 형식인지 확인
      const dates = await page
        .locator('[data-testid="card-date"]')
        .allTextContents();

      for (const date of dates) {
        // YYYY.MM.DD 형식 확인
        expect(date).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);

        // 실제 날짜로 파싱 가능한지 확인
        const [year, month, day] = date.split(".").map(Number);
        const dateObj = new Date(year, month - 1, day);

        expect(dateObj.getFullYear()).toBe(year);
        expect(dateObj.getMonth() + 1).toBe(month);
        expect(dateObj.getDate()).toBe(day);
      }
    });

    test("좋아요 수가 숫자로 올바르게 표시되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 모든 좋아요 수가 숫자인지 확인
      const goodCounts = await page
        .locator('[data-testid="card-goodcount"]')
        .allTextContents();

      for (const count of goodCounts) {
        const num = Number(count);
        expect(isNaN(num)).toBe(false);
        expect(num).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe("UI 상태 검증", () => {
    test("섹션 제목이 항상 표시되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드
      await page.waitForLoadState("domcontentloaded");

      // Then: 제목이 즉시 표시됨
      const title = page.locator("text=오늘 핫한 트립토크");
      await expect(title).toBeVisible();
    });

    test("카드들이 가로로 정렬되어 표시되는지 확인", async ({ page }) => {
      // Given & When: 페이지 로드 및 API 데이터 대기
      await page.waitForSelector('[data-testid="boards-best-card"]', {
        timeout: 2000,
      });

      // Then: 카드들의 위치 확인
      const cards = await page
        .locator('[data-testid="boards-best-card"]')
        .all();

      if (cards.length >= 2) {
        const firstCardBox = await cards[0].boundingBox();
        const secondCardBox = await cards[1].boundingBox();

        // 첫 번째 카드가 두 번째 카드보다 왼쪽에 있는지 확인
        expect(firstCardBox!.x).toBeLessThan(secondCardBox!.x);

        // 두 카드가 비슷한 y 위치에 있는지 확인 (가로 정렬)
        expect(Math.abs(firstCardBox!.y - secondCardBox!.y)).toBeLessThan(10);
      }
    });
  });
});
