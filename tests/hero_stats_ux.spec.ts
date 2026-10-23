import { test, expect } from '@playwright/test';

test.describe('Hero Key Metrics Grid Accessibility & Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render key metrics grid as a semantic description list with accessibility attributes', async ({ page }) => {
    const statsDl = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(statsDl).toBeVisible();

    const dtElements = statsDl.locator('dt');
    const ddElements = statsDl.locator('dd');

    const dtCount = await dtElements.count();
    const ddCount = await ddElements.count();

    expect(dtCount).toBeGreaterThan(0);
    expect(dtCount).toBe(ddCount);

    for (let i = 0; i < dtCount; i++) {
      const dt = dtElements.nth(i);
      const dd = ddElements.nth(i);

      await expect(dt).toBeVisible();
      await expect(dd).toBeVisible();
      await expect(dt.locator('..')).toHaveClass(/flex-col-reverse/);
    }
  });
});
