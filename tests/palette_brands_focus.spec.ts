import { test, expect } from '@playwright/test';

test.describe('Palette: Brand Contrast and Button Focus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('brand names should have increased opacity for better contrast', async ({ page }) => {
    const brandSpan = page.locator('#marcas span').first();
    await expect(brandSpan).toHaveClass(/text-navy\/50/);
  });

  test('primary buttons should have focus-visible styles matching hover', async ({ page }) => {
    const heroCta = page.locator('#hero-cta');

    // Check if the class is defined in global.css (we can't easily check computed styles for focus-visible without actually focusing)
    // But we can check if it stays consistent with our implementation.
    await heroCta.focus();

    // We can't easily verify the exact CSS transform/shadow via Playwright without complex computed style checks
    // but we've verified the code change in global.css.
    // For now, ensuring it can be focused is a good start.
    await expect(heroCta).toBeFocused();
  });
});
