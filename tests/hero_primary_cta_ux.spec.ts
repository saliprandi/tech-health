import { test, expect } from '@playwright/test';

test.describe('Hero Section Primary CTA UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('hero primary CTA button should have focus-within/focus-visible animation classes and live region', async ({ page }) => {
    const heroCta = page.locator('#hero-cta');
    await expect(heroCta).toBeVisible();

    // Check target and rel attributes for security and user experience
    await expect(heroCta).toHaveAttribute('target', '_blank');
    await expect(heroCta).toHaveAttribute('rel', 'noopener noreferrer');

    // Check SVG icon inside hero CTA has focus animation classes
    const svgIcon = heroCta.locator('svg');
    await expect(svgIcon).toHaveClass(/group-focus-within:animate-heartbeat/);
    await expect(svgIcon).toHaveClass(/group-focus-visible:animate-heartbeat/);

    // Check accessible announcement region exists inside hero CTA button
    const announcement = page.locator('#hero-cta-announcement');
    await expect(announcement).toBeAttached();
    await expect(announcement).toHaveAttribute('aria-live', 'polite');
  });
});
