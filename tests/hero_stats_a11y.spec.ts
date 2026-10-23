import { test, expect } from '@playwright/test';

test.describe('Hero Statistics Grid Accessibility & Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render statistics grid as semantic description list with dt and dd elements', async ({ page }) => {
    const statsGrid = page.locator('dl[aria-label="Estadísticas de la empresa"]');
    await expect(statsGrid).toBeVisible();

    const dtElements = statsGrid.locator('dt');
    const ddElements = statsGrid.locator('dd');

    await expect(dtElements).toHaveCount(2);
    await expect(ddElements).toHaveCount(2);

    await expect(dtElements.nth(0)).toHaveText('Años de experiencia familiar en electrónica');
    await expect(ddElements.nth(0)).toHaveText('29');

    await expect(dtElements.nth(1)).toHaveText('Tiempo de respuesta para urgencias');
    await expect(ddElements.nth(1)).toHaveText('24h');

    const wrapperDiv = statsGrid.locator('div').first();
    await expect(wrapperDiv).toHaveClass(/flex-col-reverse/);
  });
});
