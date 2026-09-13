import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search Accessibility and Micro-UX', () => {
  test('should have accessible focus-visible rings, ARIA live regions, and button attributes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    // 1. Check ticket input attributes and focus styling
    const input = page.locator('#ticket-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveClass(/focus-visible:ring-blue-light/);

    // 2. Check submit button focus styling
    const submitBtn = page.locator('#estado-submit');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveClass(/focus-visible:ring-blue-light/);

    // 3. Check ARIA attributes on error container and result container
    const errorContainer = page.locator('#estado-error');
    await expect(errorContainer).toHaveAttribute('role', 'alert');
    await expect(errorContainer).toHaveAttribute('aria-live', 'assertive');

    const resultContainer = page.locator('#estado-result');
    await expect(resultContainer).toHaveAttribute('role', 'status');
    await expect(resultContainer).toHaveAttribute('aria-live', 'polite');

    // 4. Check "Consultar otro ticket" reset button attributes and styling
    const resetBtn = page.locator('#nueva-consulta');
    await expect(resetBtn).toHaveAttribute('type', 'button');
    await expect(resetBtn).toHaveClass(/focus-visible:ring-white/);
  });

  test('should handle ticket search error and set aria-live announcement', async ({ page }) => {
    // Mock failed ticket response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Ticket no encontrado' }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-9999-INVALID');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const errorContainer = page.locator('#estado-error');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toHaveText('Ticket no encontrado');
  });
});
