import { test, expect } from '@playwright/test';

test('verify copy phone button in Contacto section', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Ensure Contacto section is visible
  const contactSection = page.locator('#contacto');
  await contactSection.scrollIntoViewIfNeeded();

  const copyPhoneBtn = page.locator('#copy-phone');
  await expect(copyPhoneBtn).toBeVisible();

  // Get current phone text
  const phoneText = await page.locator('#phone-text').textContent();

  // Grant clipboard permissions
  const context = page.context();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);

  // Click copy button
  await copyPhoneBtn.click();

  // Check feedback text
  const copyText = page.locator('#copy-phone-text');
  await expect(copyText).toHaveText('¡Copiado!');

  // Check accessibility announcement
  const announcement = page.locator('#copy-announcement');
  await expect(announcement).toHaveText('Número de WhatsApp copiado al portapapeles');

  // Verify clipboard content
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText.trim()).toBe(phoneText?.trim());

  // Wait for feedback to reset
  await page.waitForTimeout(3000);
  await expect(copyText).toHaveText('Copiar');
});
