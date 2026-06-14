import { test, expect } from '@playwright/test';

test('WhatsApp tooltip improved interaction', async ({ page }) => {
  await page.goto('http://localhost:4321');

  const btn = page.locator('#wa-float-btn');
  const tooltip = page.locator('#wa-tooltip');

  // 1. Initially hidden
  await expect(tooltip).toBeHidden();

  // 2. Visible on hover
  await btn.hover();
  await expect(tooltip).toBeVisible();

  // 3. Hidden after mouse leaves
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600); // Wait for transition
  await expect(tooltip).toBeHidden();

  // 4. Visible on focus
  await btn.focus();
  await expect(tooltip).toBeVisible();

  // 5. Hidden on blur
  await btn.blur();
  await page.waitForTimeout(600); // Wait for transition
  await expect(tooltip).toBeHidden();
});
