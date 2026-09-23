import { test, expect } from '@playwright/test';

test.describe('Proceso Ticket Search UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should submit form and navigate to /estado with ticket parameter', async ({ page }) => {
    const input = page.locator('#proceso-ticket-input');
    const submitBtn = page.locator('#proceso-estado-submit');

    await expect(input).toBeVisible();
    await expect(submitBtn).toBeVisible();

    await input.fill('TH-2026-9999');

    await Promise.all([
      page.waitForURL(/\/estado\?ticket=TH-2026-9999/),
      submitBtn.click(),
    ]);

    await expect(page).toHaveURL(/.*\/estado\?ticket=TH-2026-9999/);
  });

  test('should set aria-invalid on invalid submit and clear on input', async ({ page }) => {
    const form = page.locator('#proceso-estado-form');
    const input = page.locator('#proceso-ticket-input');

    await input.fill('');
    await form.evaluate((f) => (f as HTMLFormElement).requestSubmit());

    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await input.fill('TH-2026-1234');
    await expect(input).not.toHaveAttribute('aria-invalid');
  });
});
