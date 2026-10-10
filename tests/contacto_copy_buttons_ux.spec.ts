import { test, expect } from '@playwright/test';

test.describe('Contacto Copy Buttons Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('should render copy phone button with native title tooltip, aria-label, and active scale micro-UX', async ({ page }) => {
    const copyPhoneBtn = page.locator('#copy-phone');
    await expect(copyPhoneBtn).toBeVisible();
    await expect(copyPhoneBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhoneBtn).toHaveAttribute('aria-label', 'Copiar teléfono al portapapeles');
    await expect(copyPhoneBtn).toHaveClass(/active:scale-95/);
    await expect(copyPhoneBtn).toHaveClass(/transition-all/);
  });

  test('should render copy address button with native title tooltip, aria-label, and active scale micro-UX', async ({ page }) => {
    const copyAddressBtn = page.locator('#copy-address');
    await expect(copyAddressBtn).toBeVisible();
    await expect(copyAddressBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddressBtn).toHaveAttribute('aria-label', 'Copiar dirección al portapapeles');
    await expect(copyAddressBtn).toHaveClass(/active:scale-95/);
    await expect(copyAddressBtn).toHaveClass(/transition-all/);
  });

  test('should render copy ticket confirmation button with native title tooltip, aria-label, and active scale micro-UX when present', async ({ page }) => {
    const copyTicketBtn = page.locator('#copy-ticket');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveAttribute('aria-label', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);
    await expect(copyTicketBtn).toHaveClass(/transition-all/);
  });
});
