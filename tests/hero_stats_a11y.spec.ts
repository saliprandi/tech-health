import { test, expect } from '@playwright/test';

test.describe('Hero Stats Grid Accessibility & Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render key statistics grid with semantic dl, dt, dd elements, aria-label, and flex order classes', async ({ page }) => {
    const dl = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(dl).toBeVisible();

    const dts = dl.locator('dt');
    const dds = dl.locator('dd');

    const dtCount = await dts.count();
    const ddCount = await dds.count();

    expect(dtCount).toBeGreaterThan(0);
    expect(ddCount).toBe(dtCount);

    const firstDt = dts.first();
    const firstDd = dds.first();

    await expect(firstDt).toHaveClass(/order-2/);
    await expect(firstDd).toHaveClass(/order-1/);
  });
});
