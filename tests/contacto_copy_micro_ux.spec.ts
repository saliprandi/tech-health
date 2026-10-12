import { test, expect } from '@playwright/test';

test.describe('Copy Buttons Micro-UX & Title Tooltips', () => {
  test('Contacto copy buttons should have title tooltips and active:scale-95 press micro-animations', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();

    const copyPhoneBtn = page.locator('#copy-phone');
    await expect(copyPhoneBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhoneBtn).toHaveClass(/active:scale-95/);

    const copyAddressBtn = page.locator('#copy-address');
    await expect(copyAddressBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddressBtn).toHaveClass(/active:scale-95/);

    const copyTicketBtn = page.locator('#copy-ticket');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);
  });

  test('Estado page copy buttons should have title tooltips and active:scale-95 press micro-animations', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);
  });
});
