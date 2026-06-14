import { test, expect } from '@playwright/test';

test.describe('WhatsApp Floating Button UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('tooltip should appear automatically after 5 seconds', async ({ page }) => {
    const tooltip = page.locator('#wa-tooltip');
    await expect(tooltip).toHaveClass(/invisible/);

    // Wait for auto-show (5s + some buffer)
    await page.waitForTimeout(5500);

    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');
  });

  test('tooltip should show on hover and hide on leave', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    await expect(tooltip).toHaveClass(/invisible/);

    await btn.hover();
    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');

    await page.mouse.move(0, 0); // Move away
    await expect(tooltip).toHaveClass(/opacity-0/);
    // Wait for transition + visibility hidden delay
    await page.waitForTimeout(6000); // 500ms in CSS, but let's be safe
    await expect(tooltip).toHaveClass(/invisible/);
  });

  test('tooltip should show on focus and hide on blur', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    await expect(tooltip).toHaveClass(/invisible/);

    await btn.focus();
    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');

    await btn.blur();
    await expect(tooltip).toHaveClass(/opacity-0/);
    await page.waitForTimeout(600);
    await expect(tooltip).toHaveClass(/invisible/);
  });

  test('manual interaction should cancel auto-show timeout', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Interact immediately
    await btn.hover();
    await expect(tooltip).not.toHaveClass(/invisible/);

    await page.mouse.move(0, 0);
    await page.waitForTimeout(600);
    await expect(tooltip).toHaveClass(/invisible/);

    // Wait past the original 5s mark to ensure it doesn't pop up again
    await page.waitForTimeout(5000);
    await expect(tooltip).toHaveClass(/invisible/);
  });

  test('redirection state should preserve tooltip visibility', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');
    const tooltipText = page.locator('#wa-tooltip-text');

    // Click button
    await btn.click();

    await expect(tooltipText).toHaveText('¡Redirigiendo!');
    await expect(tooltip).not.toHaveClass(/invisible/);

    // Try to hide by moving away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);

    // Should still be visible because isRedirecting is true
    await expect(tooltip).not.toHaveClass(/invisible/);
    await expect(tooltip).toHaveCSS('opacity', '1');

    // Wait for redirection timeout (3s)
    await page.waitForTimeout(3000);

    // Now it should hide
    await expect(tooltip).toHaveClass(/opacity-0/);
  });
});
