import { test, expect } from '@playwright/test';

test.describe('Footer UX Enhancements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render WhatsApp contact link with proper accessibility and target attributes', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const waLink = footer.locator('a[aria-label*="Contactar por WhatsApp"]');
    await expect(waLink).toBeVisible();

    // Check target and security attributes
    await expect(waLink).toHaveAttribute('target', '_blank');
    await expect(waLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Check href points to wa.me
    const href = await waLink.getAttribute('href');
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+/);

    // Check WhatsApp SVG icon inside link
    const svgIcon = waLink.locator('svg');
    await expect(svgIcon).toBeVisible();

    // Verify link text matches phone display
    const textContent = await waLink.textContent();
    expect(textContent).toContain('381');
  });
});
