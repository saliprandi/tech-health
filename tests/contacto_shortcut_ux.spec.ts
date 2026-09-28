import { test, expect } from '@playwright/test';

test.describe('Contacto Form Textarea Keyboard Shortcut UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/#contacto');
  });

  test('should display visual and ARIA shortcut hint for textarea submission', async ({ page }) => {
    const desc = page.locator('#f-desc');
    const hint = page.locator('#f-desc-hint');

    await expect(desc).toBeVisible();
    await expect(hint).toBeVisible();
    await expect(hint).toHaveText('Ctrl + Enter para enviar');

    const ariaDescribedBy = await desc.getAttribute('aria-describedby');
    expect(ariaDescribedBy).toContain('f-desc-hint');
  });

  test('should trigger form submission when pressing Ctrl+Enter in message textarea', async ({ page }) => {
    await page.fill('#f-nombre', 'Carlos Ramírez');
    await page.fill('#f-tel', '+54 9 381 9998877');
    await page.fill('#f-desc', 'Consulta enviada con atajo de teclado');

    const desc = page.locator('#f-desc');
    const submitBtn = page.locator('#f-submit');
    const submitText = page.locator('#f-submit-text');

    await desc.focus();
    await page.keyboard.press('Control+Enter');

    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(submitText).toHaveText('Redirigiendo...');
  });

  test('should trigger validation error when pressing Ctrl+Enter with missing required fields', async ({ page }) => {
    const desc = page.locator('#f-desc');
    const nombre = page.locator('#f-nombre');

    await desc.fill('Mensaje sin campos obligatorios');
    await desc.focus();
    await page.keyboard.press('Control+Enter');

    await expect(nombre).toHaveAttribute('aria-invalid', 'true');
  });
});
