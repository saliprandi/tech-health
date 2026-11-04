import { test, expect } from '@playwright/test';

test.describe('Contact Form Submit Button Directional Arrow Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('submit button has directional arrow with hover and focus translation classes', async ({ page }) => {
    const submitBtn = page.locator('#f-submit');
    const arrow = page.locator('#f-submit-arrow');

    await expect(submitBtn).toBeVisible();
    await expect(arrow).toBeVisible();
    await expect(arrow).toHaveAttribute('aria-hidden', 'true');
    await expect(arrow).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrow).toHaveClass(/group-focus-visible:translate-x-1/);
  });

  test('arrow icon is hidden during submission redirect state', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const telInput = page.locator('#f-tel');
    const submitBtn = page.locator('#f-submit');
    const arrow = page.locator('#f-submit-arrow');
    const spinner = page.locator('#f-submit-spinner');

    await nameInput.fill('Test User');
    await telInput.fill('1234567890');

    // Arrow is initially visible before submission
    await expect(arrow).toBeVisible();

    // Trigger submit
    await submitBtn.click();

    // During redirect processing, arrow is hidden and spinner is visible
    await expect(spinner).toBeVisible();
    await expect(arrow).toBeHidden();
  });
});
