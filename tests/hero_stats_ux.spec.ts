import { test, expect } from '@playwright/test';

test.describe('Hero Statistics Description List Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render statistical summary grid as a semantic description list <dl> with aria-label, <dt>, <dd>, and flex ordering', async ({ page }) => {
    const dl = page.locator('dl[aria-label="Estadísticas de trayectoria y servicio"]');
    await expect(dl).toBeVisible();

    const dtElements = dl.locator('dt');
    const ddElements = dl.locator('dd');

    await expect(dtElements).toHaveCount(4);
    await expect(ddElements).toHaveCount(4);

    const firstDt = dtElements.first();
    const firstDd = ddElements.first();

    await expect(firstDt).toHaveClass(/order-2/);
    await expect(firstDd).toHaveClass(/order-1/);
  });
});
