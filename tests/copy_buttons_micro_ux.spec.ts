import { test, expect } from '@playwright/test';

test.describe('Copy and Share Buttons Micro-UX', () => {
  test('Contacto copy buttons should have title tooltips and active:scale-95 classes', async ({ page }) => {
    await page.goto('http://localhost:4321');
    await page.locator('#contacto').scrollIntoViewIfNeeded();

    const copyPhone = page.locator('#copy-phone');
    const copyAddress = page.locator('#copy-address');

    await expect(copyPhone).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhone).toHaveClass(/active:scale-95/);

    await expect(copyAddress).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddress).toHaveClass(/active:scale-95/);
  });

  test('Estado page copy and share buttons should have title tooltips and active:scale-95 classes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    const shareTicketBtn = page.locator('#share-ticket-btn');

    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);
  });
});
