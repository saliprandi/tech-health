import { test, expect } from '@playwright/test';

test.describe('Contacto Form Ctrl+Enter Micro-UX', () => {
  test('should submit contact form when pressing Ctrl+Enter inside message textarea', async ({ page }) => {
    await page.goto('http://localhost:4321/#contacto');

    // Verify visual shortcut hint and screen reader aria-describedby hint
    const shortcutHint = page.locator('span', { hasText: 'Ctrl + Enter para enviar' });
    await expect(shortcutHint).toBeVisible();

    const descTextarea = page.locator('#f-desc');
    await expect(descTextarea).toHaveAttribute('aria-describedby', /f-desc-hint/);

    const descHint = page.locator('#f-desc-hint');
    await expect(descHint).toHaveText('Presione Control y Enter para enviar el formulario directamente.');

    // Fill required form fields
    await page.locator('#f-nombre').fill('Carlos Gómez');
    await page.locator('#f-tel').fill('+54 9 381 9876543');
    await descTextarea.fill('Consulta sobre calibración de electrocardiógrafo');

    // Press Control+Enter inside the textarea
    await descTextarea.press('Control+Enter');

    // Verify submit button state updates synchronously to 'Redirigiendo...'
    const submitBtnText = page.locator('#f-submit-text');
    await expect(submitBtnText).toHaveText('Redirigiendo...');

    // Verify live region announcement
    const redirectAnnouncement = page.locator('#redirect-announcement');
    await expect(redirectAnnouncement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
