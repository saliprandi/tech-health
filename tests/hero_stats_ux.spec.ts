import { test, expect } from '@playwright/test';

test.describe('Hero Stats Grid Semantic Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid with semantic description list markup and ARIA label', async ({ page }) => {
    const dl = page.locator('dl[aria-label="Estadísticas destacadas de la empresa"]');
    await expect(dl).toBeVisible();

    const ddList = dl.locator('dd');
    await expect(ddList).toHaveCount(2);
    await expect(ddList.nth(0)).toHaveText('29');
    await expect(ddList.nth(1)).toHaveText('24h');

    const dtList = dl.locator('dt');
    await expect(dtList).toHaveCount(2);
    await expect(dtList.nth(0)).toHaveText('Años de experiencia familiar en electrónica');
    await expect(dtList.nth(1)).toHaveText('Tiempo de respuesta para urgencias');
  });
});
