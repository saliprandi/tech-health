import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Micro-UX & Accessibility', () => {
  test('should render accessible back-to-top button in footer pointing to #hero', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopBtn = page.locator('#back-to-top');
    await expect(backToTopBtn).toBeVisible();
    await expect(backToTopBtn).toHaveAttribute('href', '#hero');
    await expect(backToTopBtn).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    // Verify text content
    await expect(backToTopBtn).toContainText('Volver arriba');

    // Verify focus-visible ring styles
    await backToTopBtn.focus();
    await expect(backToTopBtn).toBeFocused();
  });
});
