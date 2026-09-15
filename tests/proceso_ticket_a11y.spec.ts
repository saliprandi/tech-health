import { test, expect } from '@playwright/test';

test.describe('Proceso Section Ticket Lookup A11y and Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.locator('#proceso').scrollIntoViewIfNeeded();
  });

  test('should have aria-describedby and visible format helper text on ticket input', async ({ page }) => {
    const ticketInput = page.locator('#proceso-ticket-input');
    const helperText = page.locator('#proceso-ticket-hint');

    await expect(ticketInput).toHaveAttribute('aria-describedby', 'proceso-ticket-hint');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Formato: TH-2026-1234');
  });

  test('should set aria-busy and updating announcement text when submitting form', async ({ page }) => {
    const form = page.locator('#proceso-estado-form');
    const input = page.locator('#proceso-ticket-input');
    const submitBtn = page.locator('#proceso-estado-submit');
    const submitText = page.locator('#proceso-estado-submit-text');
    const announcement = page.locator('#proceso-estado-announcement');

    await input.fill('TH-2026-1234');
    await form.evaluate((formEl: HTMLFormElement) => {
      formEl.addEventListener('submit', (e) => e.preventDefault());
    });

    await submitBtn.click();

    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(submitBtn).toBeDisabled();
    await expect(submitText).toHaveText('Buscando...');
    await expect(announcement).toHaveText('Buscando estado de ticket...');
  });
});
