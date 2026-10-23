import { test, expect } from '@playwright/test';

test.describe('Hero Stats Grid Accessibility & Heading Hierarchy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid as semantic description list with dt and dd elements', async ({ page }) => {
    const statsList = page.locator('dl[aria-label="Estadísticas destacadas de la empresa"]');
    await expect(statsList).toBeVisible();

    const dtElements = statsList.locator('dt');
    await expect(dtElements).toHaveCount(2);

    const ddElements = statsList.locator('dd');
    await expect(ddElements).toHaveCount(2);

    await expect(dtElements.nth(0)).toContainText('29');
    await expect(ddElements.nth(0)).toContainText('Años de experiencia familiar en electrónica');

    await expect(dtElements.nth(1)).toContainText('24h');
    await expect(ddElements.nth(1)).toContainText('Tiempo de respuesta para urgencias');
  });

  test('should maintain heading hierarchy with h2 for equipos section under h1', async ({ page }) => {
    const equiposHeading = page.locator('h2:has-text("Equipos que atendemos:")');
    await expect(equiposHeading).toBeVisible();
  });
});
