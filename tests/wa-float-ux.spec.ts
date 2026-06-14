import { test, expect } from '@playwright/test';

test.describe('WhatsApp Floating Button UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('tooltip shows on hover and hides on mouseleave', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Initially invisible (before 5s auto-show)
    await expect(tooltip).toHaveClass(/invisible/);

    // Hover
    await btn.hover();
    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');

    // Mouse leave
    await page.mouse.move(0, 0);
    // Wait for transition + hide timeout
    await expect(tooltip).toHaveClass(/invisible/);
  });

  test('tooltip shows on focus and hides on blur', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Tab to button
    await page.keyboard.press('Tab');
    // We might need several tabs depending on the page structure
    // Let's just focus it directly for reliability in this environment
    await btn.focus();

    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');

    // Blur
    await btn.blur();
    await expect(tooltip).toHaveClass(/invisible/);
  });

  test('tooltip text changes to "¡Redirigiendo!" on click and stays visible', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');
    const tooltipText = page.locator('#wa-tooltip-text');

    await btn.click();

    await expect(tooltipText).toHaveText('¡Redirigiendo!');
    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');

    // Even if we move mouse away, it should stay visible while redirecting
    await page.mouse.move(0, 0);
    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltipText).toHaveText('¡Redirigiendo!');

    // Wait for redirect timeout (3s) + extra buffer
    await expect(tooltip).toHaveClass(/invisible/, { timeout: 5000 });
  });
});
