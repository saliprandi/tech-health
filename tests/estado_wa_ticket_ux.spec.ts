import { test, expect } from '@playwright/test';

test.describe('Estado Ticket WhatsApp Consultation UX', () => {
  test('should display WhatsApp consultation action link with dynamic prefilled ticket message', async ({ page }) => {
    // Mock successful ticket search response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-8888',
            estado: 'diagnostico',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación de placa',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // 1. Initial state: verify WhatsApp ticket action button attributes in DOM
    const waTicketBtn = page.locator('#wa-ticket-btn');
    await expect(waTicketBtn).toBeAttached();
    await expect(waTicketBtn).toHaveAttribute('target', '_blank');
    await expect(waTicketBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waTicketBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waTicketBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waTicketBtn).toHaveClass(/active:scale-95/);

    const waIcon = waTicketBtn.locator('svg');
    await expect(waIcon).toBeAttached();
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // 2. Query ticket and check dynamic URL & aria-label updates
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    await expect(waTicketBtn).toBeVisible();
    await expect(waTicketBtn).toHaveAttribute(
      'href',
      /https:\/\/wa\.me\/5493815658239\?text=.*TH-2026-8888.*/
    );
    await expect(waTicketBtn).toHaveAttribute(
      'aria-label',
      'Consultar por el ticket TH-2026-8888 en WhatsApp'
    );
  });
});
