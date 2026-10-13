import { test, expect } from '@playwright/test';

test.describe('Copy Buttons Native Tooltips & Tactile Micro-UX', () => {
  test('contacto copy buttons feature native title tooltips and active press scale styling', async ({ page }) => {
    await page.goto('http://localhost:4321');

    const copyPhone = page.locator('#copy-phone');
    await expect(copyPhone).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhone).toHaveClass(/active:scale-95/);

    const copyAddress = page.locator('#copy-address');
    await expect(copyAddress).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddress).toHaveClass(/active:scale-95/);

    const copyTicket = page.locator('#copy-ticket');
    await expect(copyTicket).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicket).toHaveClass(/active:scale-95/);
  });

  test('estado page copy buttons feature native title tooltips and active press scale styling', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);
  });
});
