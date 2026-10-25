import { test, expect } from '@playwright/test';

test.describe('Hero Key Metric Stats Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render key metric stats as semantic description list <dl> with dt/dd ordering', async ({ page }) => {
    const statsList = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(statsList).toBeVisible();

    const dts = statsList.locator('dt');
    const dds = statsList.locator('dd');

    await expect(dts).toHaveCount(2);
    await expect(dds).toHaveCount(2);

    await expect(dts.nth(0)).toHaveText('Años de experiencia familiar en electrónica');
    await expect(dts.nth(0)).toHaveClass(/order-2/);

    await expect(dds.nth(0)).toHaveText('29');
    await expect(dds.nth(0)).toHaveClass(/order-1/);

    await expect(dts.nth(1)).toHaveText('Tiempo de respuesta para urgencias');
    await expect(dts.nth(1)).toHaveClass(/order-2/);

    await expect(dds.nth(1)).toHaveText('24h');
    await expect(dds.nth(1)).toHaveClass(/order-1/);
  });
});
