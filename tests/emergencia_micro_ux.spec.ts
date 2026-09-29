import { test, expect } from '@playwright/test';

test.describe('Emergencia CTA Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('emergencia CTA renders directional external icon with group hover/focus animation and handles click feedback', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();

    // Verify external icon is present inside CTA button
    const externalIcon = cta.locator('use[href="#icon-external"]');
    await expect(externalIcon).toBeAttached();

    // Verify directional translation classes on external icon SVG parent
    const svgIcon = cta.locator('svg').nth(1);
    await expect(svgIcon).toHaveClass(/group-hover:translate-x-1/);
    await expect(svgIcon).toHaveClass(/group-focus-visible:translate-x-1/);

    // Verify ARIA announcement region exists
    const announcement = page.locator('#emergencia-cta-announcement');
    await expect(announcement).toHaveAttribute('aria-live', 'polite');

    // Click CTA button and check redirection feedback
    await cta.click();
    const ctaText = page.locator('#emergencia-cta-text');
    await expect(ctaText).toHaveText('Redirigiendo...');
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
