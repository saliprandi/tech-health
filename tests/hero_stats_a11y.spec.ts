import { test, expect } from '@playwright/test';

test.describe('Hero Section A11y & Semantic Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid as semantic description list <dl> with <dt> and <dd>', async ({ page }) => {
    const statsDl = page.locator('#hero dl');

    await expect(statsDl).toBeVisible();
    await expect(statsDl).toHaveAttribute('aria-label', 'Estadísticas de la empresa');

    const dtElements = statsDl.locator('dt');
    const ddElements = statsDl.locator('dd');

    await expect(dtElements).toHaveCount(2);
    await expect(ddElements).toHaveCount(2);

    await expect(dtElements.first()).toHaveClass(/font-heading/);
    await expect(ddElements.first()).toHaveClass(/font-body/);
  });

  test('should render equipment list title with h2 heading level for accessible hierarchy', async ({ page }) => {
    const heroCardHeading = page.locator('#hero .shadow-hero-card h2');

    await expect(heroCardHeading).toBeVisible();
    await expect(heroCardHeading).toHaveText('Equipos que atendemos:');
    await expect(heroCardHeading).toHaveClass(/font-heading/);
  });
});
