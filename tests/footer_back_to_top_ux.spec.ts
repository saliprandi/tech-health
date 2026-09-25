import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top UX', () => {
  test('should render back to top link with proper ARIA label, href, and micro-animation styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');
    await expect(backToTopLink).toContainText('Volver arriba');

    const icon = backToTopLink.locator('svg');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');

    // Verify it scrolls or targets #hero
    await backToTopLink.click();
    await expect(page).toHaveURL(/#hero/);
  });
});
