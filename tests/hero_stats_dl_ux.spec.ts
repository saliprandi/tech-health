import { test, expect } from '@playwright/test';

test.describe('Hero Key Metrics Description List Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render key metrics grid as semantic description list <dl> with accessible aria-label and flex order', async ({ page }) => {
    const statsDl = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(statsDl).toBeVisible();

    const items = statsDl.locator('> div.flex.flex-col');
    await expect(items).toHaveCount(4);

    const firstItem = items.first();
    const ddValue = firstItem.locator('dd.order-1');
    const dtLabel = firstItem.locator('dt.order-2');

    await expect(ddValue).toBeVisible();
    await expect(ddValue).toHaveClass(/font-heading/);
    await expect(ddValue).toHaveClass(/font-extrabold/);

    await expect(dtLabel).toBeVisible();
    await expect(dtLabel).toHaveClass(/font-body/);
    await expect(dtLabel).toHaveClass(/uppercase/);
  });
});
