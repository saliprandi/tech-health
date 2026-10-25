import { test, expect } from '@playwright/test';

test.describe('WhatsApp Floating Button ARIA & Escape Key UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('has role="tooltip" and updates aria-hidden dynamically on hover and focus', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Verify role="tooltip" attribute
    await expect(tooltip).toHaveAttribute('role', 'tooltip');

    // Initially hidden
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');

    // Hover button
    await btn.hover();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');

    // Leave hover
    await page.mouse.move(0, 0);
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');

    // Focus button directly
    await btn.focus();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');

    // Blur button
    await btn.blur();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  });

  test('dismisses open tooltip on Escape key press when focused', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Focus button to reveal tooltip
    await btn.focus();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    await expect(tooltip).not.toHaveClass(/invisible/);

    // Press Escape key
    await page.keyboard.press('Escape');

    // Tooltip should dismiss immediately
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
    await expect(tooltip).toHaveClass(/invisible/);
  });
});
