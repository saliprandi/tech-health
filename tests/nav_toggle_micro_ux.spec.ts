import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation Toggle Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321');
  });

  test('should have title tooltip, active scale feedback, and synchronize aria-label & title on toggle', async ({ page }) => {
    const menuToggle = page.locator('#menu-toggle');

    await expect(menuToggle).toBeVisible();

    // Verify initial title attribute and micro-animation classes
    await expect(menuToggle).toHaveAttribute('title', 'Abrir menú');
    await expect(menuToggle).toHaveAttribute('aria-label', 'Abrir menú');
    await expect(menuToggle).toHaveClass(/active:scale-95/);

    // Click to open mobile menu
    await menuToggle.click();

    // Verify title & aria-label dynamically update when menu opens
    await expect(menuToggle).toHaveAttribute('title', 'Cerrar menú');
    await expect(menuToggle).toHaveAttribute('aria-label', 'Cerrar menú');

    // Click to close mobile menu
    await menuToggle.click();

    // Verify title & aria-label restore when menu closes
    await expect(menuToggle).toHaveAttribute('title', 'Abrir menú');
    await expect(menuToggle).toHaveAttribute('aria-label', 'Abrir menú');
  });
});
