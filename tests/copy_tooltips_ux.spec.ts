import { test, expect } from '@playwright/test';

test.describe('Copy Buttons Tooltips & Micro-UX', () => {
  test('should have native title tooltips, active press animations, and dynamic title synchronization on Contacto copy buttons', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('http://localhost:4321/#contacto');

    const copyPhoneBtn = page.locator('#copy-phone');
    await expect(copyPhoneBtn).toBeVisible();
    await expect(copyPhoneBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhoneBtn).toHaveClass(/active:scale-95/);

    const copyAddressBtn = page.locator('#copy-address');
    await expect(copyAddressBtn).toBeVisible();
    await expect(copyAddressBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddressBtn).toHaveClass(/active:scale-95/);

    // Test dynamic title update on click
    await copyPhoneBtn.click();
    await expect(copyPhoneBtn).toHaveAttribute('title', 'Teléfono copiado');
  });

  test('should have native title tooltips, active press animations, and dynamic title synchronization on Estado page', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-8888',
            estado: 'diagnostico',
            nombre: 'Clínica Norte',
            servicio: 'Consulta general',
            tecnico: 'María López',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado?ticket=TH-2026-8888');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toBeVisible();
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyTicketBtn).toHaveClass(/active:scale-95/);

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toBeVisible();
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareTicketBtn).toHaveClass(/active:scale-95/);

    // Click copy button and check dynamic title update
    await copyTicketBtn.click();
    await expect(copyTicketBtn).toHaveAttribute('title', 'Número de ticket copiado al portapapeles');

    // Click share button and check dynamic title update
    await shareTicketBtn.click();
    await expect(shareTicketBtn).toHaveAttribute('title', 'Enlace directo del ticket copiado al portapapeles');
  });

  test('should hide native WebKit search cancel button on FAQ search input', async ({ page }) => {
    await page.goto('http://localhost:4321/#faq');
    const faqSearchInput = page.locator('#faq-search-input');
    await expect(faqSearchInput).toBeVisible();
    await expect(faqSearchInput).toHaveClass(/\[&::-webkit-search-cancel-button\]:hidden/);
  });
});
