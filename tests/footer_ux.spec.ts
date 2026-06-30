import { test, expect } from '@playwright/test';

test.describe('Footer UX and Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('footer contact info should be interactive links with correct aria-labels', async ({ page }) => {
    const footer = page.locator('footer');

    // Check Location Link
    const locationLink = footer.getByLabel(/Ver ubicación en Google Maps/);
    await expect(locationLink).toBeVisible();
    await expect(locationLink).toHaveAttribute('href', /maps\.google\.com/);
    await expect(locationLink).toHaveAttribute('target', '_blank');

    // Check WhatsApp Link
    const waLink = footer.getByLabel(/Contactar por WhatsApp/);
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute('href', /wa\.me/);
    await expect(waLink).toHaveAttribute('target', '_blank');
  });

  test('footer links should have improved contrast and hover effects', async ({ page }) => {
    const footerLink = page.locator('footer a').first();
    const color = await footerLink.evaluate((el) => window.getComputedStyle(el).color);

    // text-white/70 is rgba(255, 255, 255, 0.7)
    expect(color).toContain('rgba(255, 255, 255, 0.7)');

    // Check hover effect (translation)
    const boxBefore = await footerLink.boundingBox();
    await footerLink.hover();
    await page.waitForTimeout(400); // Wait for transition
    const boxAfter = await footerLink.boundingBox();

    if (boxBefore && boxAfter) {
      expect(boxAfter.y).toBeLessThan(boxBefore.y);
    }
  });
});
