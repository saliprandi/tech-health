import { test, expect } from '@playwright/test';

test.describe('Copy Buttons Micro-UX & Native Tooltips', () => {
  test('should render contact section copy buttons with native tooltips and press scale utilities', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const phoneBtn = page.locator('#copy-phone');
    await expect(phoneBtn).toBeVisible();
    await expect(phoneBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(phoneBtn).toHaveClass(/active:scale-95/);

    const addressBtn = page.locator('#copy-address');
    await expect(addressBtn).toBeVisible();
    await expect(addressBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(addressBtn).toHaveClass(/active:scale-95/);
  });

  test('should render ticket status page copy buttons with native tooltips and press scale utilities', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);
  });
});
