import { test, expect } from '@playwright/test';

test.describe('Contacto Form Submit Spinner Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('contact form shows loading spinner, aria-busy, and disabled state on submit', async ({ page }) => {
    await page.fill('#f-nombre', 'Carlos Gómez');
    await page.fill('#f-tel', '+543815551234');
    await page.fill('#f-desc', 'Consulta de mantenimiento');

    const submitBtn = page.locator('#f-submit');
    const submitText = page.locator('#f-submit-text');
    const submitSpinner = page.locator('#f-submit-spinner');
    const submitIcon = page.locator('#f-submit-icon');

    await expect(submitSpinner).toHaveClass(/hidden/);
    await expect(submitIcon).not.toHaveClass(/hidden/);

    await submitBtn.click();

    await expect(submitSpinner).not.toHaveClass(/hidden/);
    await expect(submitIcon).toHaveClass(/hidden/);
    await expect(submitText).toHaveText('Redirigiendo...');
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(submitBtn).toHaveAttribute('disabled', '');
  });
});
