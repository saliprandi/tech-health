import { test, expect } from '@playwright/test';

test.describe('Emergencia CTA Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render emergency CTA button with directional arrow icon and group hover/focus micro-animation', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();

    // Verify WhatsApp icon and directional arrow icon are present with aria-hidden="true"
    const svgIcons = cta.locator('svg[aria-hidden="true"]');
    await expect(svgIcons).toHaveCount(2);

    // Verify directional arrow SVG has translate-x transition classes
    const arrowIcon = svgIcons.nth(1);
    await expect(arrowIcon).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-1/);

    // Test click feedback and aria-live announcement
    const announcement = page.locator('#emergencia-cta-announcement');
    await cta.click();
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
