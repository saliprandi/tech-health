import { test, expect } from '@playwright/test';

test.describe('Copy Buttons Micro-UX & Native Tooltips', () => {
  test('copy buttons in Contacto section have native title tooltips and micro-animation classes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const copyPhone = page.locator('#copy-phone');
    await expect(copyPhone).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhone).toHaveClass(/active:scale-95/);

    const copyAddress = page.locator('#copy-address');
    await expect(copyAddress).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddress).toHaveClass(/active:scale-95/);
  });

  test('copy and share buttons on Estado page have native title tooltips and micro-animation classes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);
  });
});
