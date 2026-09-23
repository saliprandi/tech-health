import { test, expect } from '@playwright/test';

test.describe('Proceso Ticket Lookup Form Micro-UX and A11y', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should display loading spinner and update ARIA attributes during submit', async ({ page }) => {
    const input = page.locator('#proceso-ticket-input');
    const submitBtn = page.locator('#proceso-estado-submit');
    const spinner = page.locator('#proceso-estado-spinner');
    const submitText = page.locator('#proceso-estado-submit-text');
    const announcement = page.locator('#proceso-estado-announcement');

    await expect(input).toBeVisible();
    await expect(submitBtn).toBeVisible();
    await expect(spinner).toHaveClass(/hidden/);

    // Prevent page navigation so we can assert the loading state before navigation completes
    await page.evaluate(() => {
      document.getElementById('proceso-estado-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
      });
    });

    await input.fill('  th 2026 9999 ');

    // Submit form
    await submitBtn.click();

    // Verify loading spinner and submit button state
    await expect(spinner).not.toHaveClass(/hidden/);
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(submitBtn).toHaveAttribute('aria-disabled', 'true');
    await expect(submitText).toHaveText('Buscando...');
    await expect(announcement).toHaveText('Buscando estado de ticket...');

    // Verify input value sanitization
    expect(await input.inputValue()).toBe('TH20269999');
  });

  test('should navigate to /estado with sanitized ticket parameter on submit', async ({ page }) => {
    const input = page.locator('#proceso-ticket-input');
    const submitBtn = page.locator('#proceso-estado-submit');

    await input.fill('th-2026-1234');
    await submitBtn.click();

    await page.waitForURL('**/estado?ticket=TH-2026-1234');
    expect(page.url()).toContain('/estado?ticket=TH-2026-1234');
  });
});
