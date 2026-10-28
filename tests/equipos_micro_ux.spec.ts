import { test, expect } from '@playwright/test';

test.describe('Equipos Section Micro-UX & Keyboard Focus Parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should include group-focus-visible micro-UX utilities on interactive equipment card links', async ({ page }) => {
    const list = page.locator('#equipos ul[role="list"]');
    await expect(list).toBeVisible();

    const firstLink = list.locator('a[href="#contacto"]').first();
    await expect(firstLink).toBeVisible();

    const ecgIcon = firstLink.locator('svg').first();
    await expect(ecgIcon).toHaveClass(/group-focus-visible:animate-heartbeat/);

    const spanText = firstLink.locator('span');
    await expect(spanText).toHaveClass(/group-focus-visible:text-white/);

    const arrowIcon = firstLink.locator('svg').nth(1);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:text-blue-light/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-0\.5/);
  });
});
