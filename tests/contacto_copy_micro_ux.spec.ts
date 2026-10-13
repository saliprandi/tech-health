import { test, expect } from '@playwright/test';

test.describe('Contacto Copy Buttons Micro-UX & Accessibility', () => {
  test('should have native title tooltips and active press scale micro-animation utilities', async ({ page }) => {
    await page.goto('/');

    const copyPhoneBtn = page.locator('#copy-phone');
    const copyAddressBtn = page.locator('#copy-address');
    const copyTicketBtn = page.locator('#copy-ticket');

    // Verify #copy-phone attributes
    await expect(copyPhoneBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhoneBtn).toHaveClass(/active:scale-95/);

    // Verify #copy-address attributes
    await expect(copyAddressBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddressBtn).toHaveClass(/active:scale-95/);

    // Verify #copy-ticket attributes
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);
  });
});
