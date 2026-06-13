import { test, expect } from '@playwright/test';

test.describe('Contacto Accessibility and UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/#contacto');
  });

  test('form fields have correct aria-labels', async ({ page }) => {
    const nombreInput = page.locator('#f-nombre');
    await expect(nombreInput).toHaveAttribute('aria-label', 'Nombre completo');

    const telInput = page.locator('#f-tel');
    await expect(telInput).toHaveAttribute('aria-label', 'Teléfono o WhatsApp');

    const descTextarea = page.locator('#f-desc');
    await expect(descTextarea).toHaveAttribute('aria-label', 'Tu mensaje o consulta');
  });

  test('textarea is described by char-counter', async ({ page }) => {
    const descTextarea = page.locator('#f-desc');
    await expect(descTextarea).toHaveAttribute('aria-describedby', 'char-counter');

    const counter = page.locator('#char-counter');
    await expect(counter).toBeVisible();
    await expect(counter).toContainText('0 / 500');
  });

  test('copy address provides aria-live feedback', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const copyBtn = page.locator('#copy-address');
    const announcement = page.locator('#copy-announcement');

    await expect(announcement).toHaveAttribute('aria-live', 'polite');
    await expect(announcement).toBeEmpty();

    await copyBtn.click();

    await expect(announcement).toHaveText('Dirección copiada al portapapeles');

    // Wait for the message to be cleared (after 2500ms in the script)
    await expect(announcement).toBeEmpty({ timeout: 5000 });
  });
});
