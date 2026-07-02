import { test, expect } from '@playwright/test';

test.describe('Contact Form Cleanup Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should not have duplicate IDs for name and phone inputs', async ({ page }) => {
    const nameInputs = await page.locator('#f-nombre').count();
    const phoneInputs = await page.locator('#f-tel').count();

    expect(nameInputs).toBe(1);
    expect(phoneInputs).toBe(1);
  });

  test('should have only one label for each input', async ({ page }) => {
    // Labels are associated with IDs
    const nameLabels = await page.locator('label[for="f-nombre"]').count();
    const phoneLabels = await page.locator('label[for="f-tel"]').count();

    expect(nameLabels).toBe(1);
    expect(phoneLabels).toBe(1);
  });

  test('form should still function and redirect correctly', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const phoneInput = page.locator('#f-tel');
    const submitBtn = page.locator('#f-submit');

    await nameInput.fill('Test User');
    await phoneInput.fill('1234567890');

    // We can't easily test the actual redirect in a simple way without mocking or checking for window.open
    // but we can check if the button text changes as expected in our script.

    // Mock window.open to prevent actual redirection if it was still using it,
    // but our script now uses a programmatic link click.

    await submitBtn.click();

    const submitText = await page.locator('#f-submit-text').textContent();
    expect(submitText).toBe('Redirigiendo...');
  });
});
