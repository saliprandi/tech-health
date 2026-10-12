import { test, expect } from '@playwright/test';

test.describe('Copy Action Buttons Micro-UX & Tooltips', () => {
  test('home page copy phone and copy address buttons have native title tooltips and active scale classes', async ({ page }) => {
    await page.goto('/#contacto');

    const copyPhoneBtn = page.locator('#copy-phone');
    await expect(copyPhoneBtn).toBeVisible();
    await expect(copyPhoneBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhoneBtn).toHaveClass(/active:scale-95/);

    const copyAddressBtn = page.locator('#copy-address');
    await expect(copyAddressBtn).toBeVisible();
    await expect(copyAddressBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddressBtn).toHaveClass(/active:scale-95/);
  });

  test('ticket status page copy and share buttons have native title tooltips and active scale classes', async ({ page }) => {
    await page.goto('/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);
  });
});
