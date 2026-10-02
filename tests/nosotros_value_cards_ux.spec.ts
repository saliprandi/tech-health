import { test, expect } from '@playwright/test';

test.describe('Nosotros Value Cards Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('value cards region should have landmark role and aria-label', async ({ page }) => {
    const valueRegion = page.locator('div[role="region"][aria-label="Valores de la empresa"]');
    await expect(valueRegion).toBeVisible();

    const cards = valueRegion.locator('div.group');
    await expect(cards).toHaveCount(3);
  });

  test('value cards should have elevation micro-animation and focus-within classes', async ({ page }) => {
    const valueRegion = page.locator('div[role="region"][aria-label="Valores de la empresa"]');
    const cards = valueRegion.locator('div.group');

    for (let i = 0; i < 3; i++) {
      const card = cards.nth(i);
      await expect(card).toHaveClass(/hover:-translate-y-1/);
      await expect(card).toHaveClass(/focus-within:-translate-y-1/);
    }
  });
});
