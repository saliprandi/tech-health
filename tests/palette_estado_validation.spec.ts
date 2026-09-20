import { test, expect } from '@playwright/test';

test.describe('Estado Form Validation UX', () => {
  test('should report validity when submitting an empty ticket query', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const form = page.locator('#estado-form');
    const input = page.locator('#ticket-input');
    const submitBtn = page.locator('#estado-submit');

    // Ensure input is empty
    await input.fill('');

    // Verify input has required attribute
    await expect(input).toHaveAttribute('required', '');

    // Check validity of the form before click
    const isValidBefore = await form.evaluate((el: HTMLFormElement) => el.checkValidity());
    expect(isValidBefore).toBe(false);

    // Click submit button
    await submitBtn.click();

    // Result section should not be displayed on invalid submission
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeHidden();
  });
});
