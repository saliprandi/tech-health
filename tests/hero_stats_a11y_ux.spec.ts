import { test, expect } from '@playwright/test';

test.describe('Hero Key Statistics Grid Accessibility & Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render key statistics grid with semantic description list <dl> and <dt>/<dd> elements', async ({ page }) => {
    const statsGrid = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(statsGrid).toBeVisible();

    const items = statsGrid.locator('> div');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      await expect(item).toHaveClass(/flex flex-col-reverse/);

      const dt = item.locator('dt');
      await expect(dt).toBeVisible();
      await expect(dt).toHaveClass(/font-body/);

      const dd = item.locator('dd');
      await expect(dd).toBeVisible();
      await expect(dd).toHaveClass(/font-heading/);
    }
  });
});
