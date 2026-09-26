import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top UX', () => {
  test('should render "Volver arriba" link with correct attributes and micro-UX styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');
    await expect(backToTopLink).toContainText('Volver arriba');

    // Verify SVG icon is hidden from screen readers
    const icon = backToTopLink.locator('svg');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');

    // Scroll down to the bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Focus link and test Enter press
    await backToTopLink.focus();
    await page.keyboard.press('Enter');

    // Check that page target #hero exists
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeVisible();
  });
});
