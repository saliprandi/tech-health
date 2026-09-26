import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Link UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render back to top link with accessible aria-label and focus-visible styling', async ({ page }) => {
    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();

    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    const svgIcon = backToTopLink.locator('svg use');
    await expect(svgIcon).toHaveAttribute('href', '#icon-chevron-up');

    // Verify it contains the visible label
    await expect(backToTopLink).toContainText('Volver arriba');

    // Verify classes for high-contrast focus rings on dark background
    const className = await backToTopLink.getAttribute('class');
    expect(className).toContain('focus-visible:ring-2');
    expect(className).toContain('focus-visible:ring-white/40');
    expect(className).toContain('focus-visible:ring-offset-2');
  });
});
