import { test, expect } from '@playwright/test';

test.describe('Contacto Form Escape Key & Ticket Confirmation Link Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('ticket confirmation link contains group translation classes on arrow icon', async ({ page }) => {
    const confirmationLink = page.locator('#ticket-confirmation-link');
    await expect(confirmationLink).toHaveClass(/group/);

    const arrowSvg = confirmationLink.locator('svg');
    await expect(arrowSvg).toHaveClass(/group-hover:translate-x-0\.5/);
    await expect(arrowSvg).toHaveClass(/group-focus-visible:translate-x-0\.5/);
  });

  test('pressing Escape in contact form inputs clears field value and announces clearance', async ({ page }) => {
    const nombreInput = page.locator('#f-nombre');
    const announcement = page.locator('#redirect-announcement');

    await nombreInput.fill('Juan Perez');
    await expect(nombreInput).toHaveValue('Juan Perez');

    await nombreInput.focus();
    await page.keyboard.press('Escape');

    await expect(nombreInput).toHaveValue('');
    await expect(announcement).toHaveText('Campo limpiado');
  });

  test('pressing Escape in textarea clears value, updates counter and removes aria-invalid', async ({ page }) => {
    const descInput = page.locator('#f-desc');
    const counter = page.locator('#char-counter');
    const announcement = page.locator('#redirect-announcement');

    await descInput.fill('Consulta sobre mantenimiento');
    await expect(descInput).toHaveValue('Consulta sobre mantenimiento');
    await expect(counter).toContainText('28 / 500');

    await descInput.evaluate((el) => el.setAttribute('aria-invalid', 'true'));
    await expect(descInput).toHaveAttribute('aria-invalid', 'true');

    await descInput.focus();
    await page.keyboard.press('Escape');

    await expect(descInput).toHaveValue('');
    await expect(descInput).not.toHaveAttribute('aria-invalid');
    await expect(counter).toContainText('0 / 500');
    await expect(announcement).toHaveText('Campo limpiado');
  });
});
