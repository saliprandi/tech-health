import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Link UX', () => {
  test('should render "Volver arriba" link with correct attributes and focus-visible styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    // Verify it contains the text "Volver arriba"
    await expect(backToTopLink).toContainText('Volver arriba');

    // Scroll to footer
    await backToTopLink.scrollIntoViewIfNeeded();

    // Verify keyboard focus navigation
    await backToTopLink.focus();
    await expect(backToTopLink).toBeFocused();

    // Click back to top and verify page scrolls towards top (#hero)
    await backToTopLink.click();
    await page.waitForTimeout(500);

    // Verify hero section is visible
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeInViewport();
  });
});
