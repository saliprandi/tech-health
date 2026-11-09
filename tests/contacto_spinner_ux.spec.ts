import { test, expect } from '@playwright/test';

test.describe('Contact Form Submit Spinner UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('submit button toggles loading spinner, updates text, and sets aria-busy on submit', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const phoneInput = page.locator('#f-tel');
    const submitBtn = page.locator('#f-submit');
    const submitText = page.locator('#f-submit-text');
    const submitIcon = page.locator('#f-submit-icon');
    const submitSpinner = page.locator('#f-submit-spinner');
    const announcement = page.locator('#redirect-announcement');

    await nameInput.fill('Test User');
    await phoneInput.fill('+543811234567');

    await expect(submitIcon).toBeVisible();
    await expect(submitSpinner).toBeHidden();
    await expect(submitBtn).not.toHaveAttribute('aria-busy', 'true');

    await submitBtn.click();

    await expect(submitText).toHaveText('Redirigiendo...');
    await expect(submitIcon).toBeHidden();
    await expect(submitSpinner).toBeVisible();
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
