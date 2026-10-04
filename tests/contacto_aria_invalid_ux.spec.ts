import { test, expect } from '@playwright/test';

test.describe('Contacto Form Error & Loading UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('inputs should have aria-invalid visual styling utility classes when validation fails', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const telInput = page.locator('#f-tel');
    const descInput = page.locator('#f-desc');

    // Verify aria-invalid Tailwind classes are present on the element declarations
    await expect(nameInput).toHaveClass(/aria-invalid:border-red-400\/80/);
    await expect(telInput).toHaveClass(/aria-invalid:border-red-400\/80/);
    await expect(descInput).toHaveClass(/aria-invalid:border-red-400\/80/);
  });

  test('submit button should show loading spinner when form is submitted', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const telInput = page.locator('#f-tel');
    const submitBtn = page.locator('#f-submit');
    const submitSpinner = page.locator('#f-submit-spinner');
    const submitIcon = page.locator('#f-submit-icon');

    // Fill valid required fields
    await nameInput.fill('Ana Gómez');
    await telInput.fill('+54 9 381 9876543');

    // Verify initial spinner state
    await expect(submitSpinner).toHaveClass(/hidden/);
    await expect(submitIcon).not.toHaveClass(/hidden/);

    // Submit form
    await submitBtn.click();

    // Verify loading spinner is visible during submit processing
    await expect(submitSpinner).not.toHaveClass(/hidden/);
    await expect(submitIcon).toHaveClass(/hidden/);
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
  });
});
