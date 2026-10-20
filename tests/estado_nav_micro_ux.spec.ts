import { test, expect } from '@playwright/test';

test.describe('Estado Navigation Micro-UX & Native Tooltips', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/estado');
  });

  test('should render logo and return home links with native title tooltips and active scale feedback', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Navegación de consulta"]');
    await expect(nav).toBeVisible();

    const logoLink = nav.locator('a[aria-label="TechHealth Home"]');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('title', 'TechHealth - Ir a la página principal');

    const returnLink = nav.locator('a[aria-label="Volver a la página principal"]');
    await expect(returnLink).toBeVisible();
    await expect(returnLink).toHaveAttribute('title', 'Volver a la página principal');
    await expect(returnLink).toHaveClass(/active:scale-95/);
    await expect(returnLink).toHaveClass(/transition-all/);
  });
});
