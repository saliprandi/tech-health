import { test, expect } from '@playwright/test';

test.describe('Footer UX Enhancements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render accessible "Volver arriba" link in footer', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    const backToTopBtn = footer.locator('a[href="#hero"]');
    await expect(backToTopBtn).toBeVisible();
    await expect(backToTopBtn).toHaveAttribute('aria-label', 'Volver al inicio de la página');
    await expect(backToTopBtn).toContainText('Volver arriba');

    // Focus element to verify high-contrast focus ring styling
    await backToTopBtn.focus();
    await expect(backToTopBtn).toHaveClass(/focus-visible:ring-2/);
  });
});
