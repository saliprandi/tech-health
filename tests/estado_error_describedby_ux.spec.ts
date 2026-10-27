import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search Error aria-describedby Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/estado');
  });

  test('dynamically attaches estado-error to aria-describedby on validation failure and restores on input edit', async ({ page }) => {
    const form = page.locator('#estado-form');
    const input = page.locator('#ticket-input');
    const clearBtn = page.locator('#clear-ticket-input');

    // Initial state
    await expect(input).toHaveAttribute('aria-describedby', 'ticket-input-hint');

    // Submit invalid input with non-whitelisted characters
    await input.fill('###INVALID###');
    await form.evaluate((f) => (f as HTMLFormElement).requestSubmit());

    // Verify aria-describedby includes error ID
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAttribute('aria-describedby', /estado-error/);

    // Edit input -> restores hint-only describedby and removes invalid state
    await input.fill('TH-2026-1234');
    await expect(input).not.toHaveAttribute('aria-invalid');
    await expect(input).toHaveAttribute('aria-describedby', 'ticket-input-hint');

    // Submit invalid input again
    await input.fill('!!!FAIL!!!');
    await form.evaluate((f) => (f as HTMLFormElement).requestSubmit());
    await expect(input).toHaveAttribute('aria-describedby', /estado-error/);

    // Click clear button -> restores hint-only describedby
    await clearBtn.click();
    await expect(input).toHaveAttribute('aria-describedby', 'ticket-input-hint');
    await expect(input).not.toHaveAttribute('aria-invalid');
  });
});
