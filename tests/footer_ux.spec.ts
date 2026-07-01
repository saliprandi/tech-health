import { test, expect } from '@playwright/test';

test.describe('Footer UX and Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('footer should have accessible and interactive contact links', async ({ page }) => {
    const footer = page.locator('footer');

    // Check Location Link
    const locationLink = footer.getByLabel(/Ver ubicación en Google Maps/i);
    await expect(locationLink).toBeVisible();
    await expect(locationLink).toHaveAttribute('href', /maps\.google\.com/);
    await expect(locationLink).toHaveAttribute('target', '_blank');

    // Check WhatsApp Link
    const whatsappLink = footer.getByLabel(/Contactar por WhatsApp/i);
    await expect(whatsappLink).toBeVisible();
    await expect(whatsappLink).toHaveAttribute('href', /wa\.me/);
    await expect(whatsappLink).toHaveAttribute('target', '_blank');
  });

  test('footer should have accessible social links with hover effects', async ({ page }) => {
    const footer = page.locator('footer');

    // Check if social links are visible (depending on CONFIG, but based on my change they should be if present)
    const socialLinks = footer.locator('a[aria-label^="Seguir en"]');
    const count = await socialLinks.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const link = socialLinks.nth(i);
        await expect(link).toBeVisible();
        await expect(link).toHaveClass(/transition-all/);
        await expect(link).toHaveClass(/hover:-translate-y-0.5/);
      }
    }
  });

  test('footer text should meet contrast standards (visual check via class)', async ({ page }) => {
    const footer = page.locator('footer');
    const contactContainer = footer.locator('div.font-body');
    const copyright = footer.locator('div.font-body').last();

    await expect(contactContainer.first()).toHaveClass(/text-white\/70/);
    await expect(copyright).toHaveClass(/text-white\/70/);
  });
});
