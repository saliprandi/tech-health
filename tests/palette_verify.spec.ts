import { test, expect } from '@playwright/test';

test('Contacto accessibility and micro-UX enhancements', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('http://localhost:4321/');

  // 1. Verify character counter link
  const textarea = page.locator('#f-desc');
  const counter = page.locator('#char-counter');
  await expect(textarea).toHaveAttribute('aria-describedby', 'char-counter');

  await textarea.fill('Hola TechHealth');
  await expect(counter).toHaveText('15 / 500');

  // 2. Verify copy address announcement
  const copyBtn = page.locator('#copy-address');
  const announcement = page.locator('#copy-announcement');

  await expect(copyBtn).toHaveAttribute('aria-label', 'Copiar dirección al portapapeles');

  await copyBtn.click();
  await expect(announcement).toHaveText('Dirección copiada al portapapeles');

  // Wait for it to clear
  await page.waitForTimeout(3000);
  await expect(announcement).toHaveText('');

  // 3. Verify submit button aria-busy
  const submitBtn = page.locator('#f-submit');
  const nombreInput = page.locator('#f-nombre');
  const telInput = page.locator('#f-tel');

  await nombreInput.fill('Test User');
  await telInput.fill('123456789');

  // Since click triggers a real window open (redirect), we should intercept it if possible or just check the state
  // In our script, we use a created 'a' tag. We can check if the button goes into busy state.

  await submitBtn.click();
  await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
  await expect(submitBtn).toHaveText('Redirigiendo...');

  // Wait for it to restore
  await page.waitForTimeout(3500);
  await expect(submitBtn).not.toHaveAttribute('aria-busy');
  await expect(submitBtn).toHaveText('Enviar por WhatsApp');
});
