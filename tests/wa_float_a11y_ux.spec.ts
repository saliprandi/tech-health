import { test, expect } from '@playwright/test';

test.describe('WhatsApp Floating Button WAI-ARIA & Micro-UX Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('floating WhatsApp tooltip has role="tooltip", aria-describedby linkage, and updates aria-hidden dynamically', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Verify linkage attributes
    await expect(btn).toHaveAttribute('aria-describedby', 'wa-tooltip');
    await expect(tooltip).toHaveAttribute('role', 'tooltip');
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');

    // Hover button to show tooltip
    await btn.hover();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    await expect(tooltip).not.toHaveClass(/invisible/);

    // Leave hover
    await page.mouse.move(0, 0);
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  });

  test('dismisses open tooltip on Escape key press and restores aria-hidden="true"', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');
    const tooltip = page.locator('#wa-tooltip');

    // Focus button to reveal tooltip
    await btn.focus();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    await expect(tooltip).not.toHaveClass(/invisible/);

    // Press Escape to dismiss
    await btn.press('Escape');
    await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
    await expect(tooltip).toHaveClass(/opacity-0/);
  });
});
