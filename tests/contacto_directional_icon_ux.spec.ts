import { test, expect } from '@playwright/test';

test.describe('Contacto Submit Button Directional Icon Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('submit button renders directional arrow icon with group hover/focus translation classes', async ({ page }) => {
    const submitBtn = page.locator('#f-submit');
    const submitArrow = page.locator('#f-submit-arrow');

    await expect(submitBtn).toBeVisible();
    await expect(submitArrow).toBeVisible();

    await expect(submitArrow).toHaveClass(/group-hover:translate-x-1/);
    await expect(submitArrow).toHaveClass(/group-focus-visible:translate-x-1/);
    await expect(submitArrow).toHaveClass(/transition-all/);
  });
});
