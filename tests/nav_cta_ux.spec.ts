import { test, expect } from '@playwright/test';

test.describe('Nav CTA UX Enhancement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should show loading spinner and "Redirigiendo..." on desktop Nav CTA click', async ({ page }) => {
    const desktopCta = page.locator('#nav-cta');
    const spinner = page.locator('#nav-cta-spinner');
    const icon = page.locator('#nav-cta-icon');
    const text = page.locator('#nav-cta-text');

    // Desktop view
    await page.setViewportSize({ width: 1280, height: 720 });

    await expect(spinner).toBeHidden();
    await expect(icon).toBeVisible();
    await expect(text).toHaveText('Consultar por WhatsApp');

    // Intercept navigation
    await desktopCta.click();

    await expect(spinner).toBeVisible();
    await expect(icon).toBeHidden();
    await expect(text).toHaveText('Redirigiendo...');
    await expect(desktopCta).toHaveClass(/opacity-80/);
  });

  test('should show loading spinner and "Redirigiendo..." on mobile Nav CTA click', async ({ page }) => {
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggle = page.locator('#menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    const mobileCta = page.locator('#mobile-nav-cta');
    const spinner = page.locator('#mobile-nav-cta-spinner');
    const icon = page.locator('#mobile-nav-cta-icon');
    const text = page.locator('#mobile-nav-cta-text');

    await menuToggle.click();
    await expect(mobileMenu).toBeVisible();

    await expect(spinner).toBeHidden();
    await expect(icon).toBeVisible();
    await expect(text).toHaveText('Consultar por WhatsApp');

    await mobileCta.click();

    await expect(spinner).toBeVisible();
    await expect(icon).toBeHidden();
    await expect(text).toHaveText('Redirigiendo...');
    await expect(mobileCta).toHaveClass(/opacity-80/);
  });
});
