import { test, expect } from '@playwright/test';

test.describe('Footer Back To Top UX', () => {
  test('should render back-to-top button with correct attributes, ARIA label, and focus ring styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopBtn = page.locator('#back-to-top');
    await expect(backToTopBtn).toBeVisible();

    // Verify href attribute targets #hero section
    await expect(backToTopBtn).toHaveAttribute('href', '#hero');

    // Verify ARIA label for screen reader users
    await expect(backToTopBtn).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    // Verify visible text content
    await expect(backToTopBtn).toContainText('Volver arriba');

    // Verify high-contrast focus-visible ring styles
    const className = await backToTopBtn.getAttribute('class');
    expect(className).toContain('focus-visible:ring-2');
    expect(className).toContain('focus-visible:ring-white/40');
    expect(className).toContain('focus-visible:ring-offset-2');
  });
});
