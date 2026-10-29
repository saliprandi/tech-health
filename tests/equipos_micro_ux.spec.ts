import { test, expect } from '@playwright/test';

test.describe('Equipos Section Micro-UX & Keyboard Parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should feature group-focus-visible classes on child elements of equipos items', async ({ page }) => {
    const list = page.locator('#equipos ul[role="list"]');
    await expect(list).toBeVisible();

    const firstItemLink = list.locator('li a').first();
    await expect(firstItemLink).toBeVisible();

    const ecgIcon = firstItemLink.locator('svg').first();
    const textSpan = firstItemLink.locator('span');
    const arrowIcon = firstItemLink.locator('svg').last();

    await expect(ecgIcon).toHaveClass(/group-focus-visible:animate-heartbeat/);
    await expect(textSpan).toHaveClass(/group-focus-visible:text-white/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:text-blue-light/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-0\.5/);
  });
});
