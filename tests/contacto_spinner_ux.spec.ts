import { test, expect } from '@playwright/test';

test.describe('Contacto Form Submit Spinner Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('should display loading spinner and hide static icon on form submit', async ({ page }) => {
    const submitBtn = page.locator('#f-submit');
    const spinner = page.locator('#f-submit-spinner');
    const staticIcon = page.locator('#f-submit-icon');
    const submitBtnText = page.locator('#f-submit-text');

    // Initially, spinner is hidden and static icon is visible
    await expect(spinner).toHaveClass(/hidden/);
    await expect(staticIcon).not.toHaveClass(/hidden/);

    // Fill required form fields
    await page.locator('#f-nombre').fill('Carlos Gómez');
    await page.locator('#f-tel').fill('3811234567');
    await page.locator('#f-desc').fill('Consulta sobre calibración de electrocardiógrafo');

    // Submit form
    await submitBtn.click();

    // Verification: spinner is displayed, static icon is hidden, text says "Redirigiendo..."
    await expect(spinner).not.toHaveClass(/hidden/);
    await expect(staticIcon).toHaveClass(/hidden/);
    await expect(submitBtnText).toHaveText('Redirigiendo...');
    await expect(submitBtn).toBeDisabled();
  });
});
