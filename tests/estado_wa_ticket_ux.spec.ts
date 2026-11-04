import { test, expect } from '@playwright/test';

test.describe('Estado Ticket WhatsApp Consultation Action Link UX', () => {
  test('should have accessible attributes, focus ring, tactile classes, and update dynamically with ticket query', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9876',
            estado: 'intervencion',
            nombre: 'Clínica Mayo',
            servicio: 'Reparación de electrocardiógrafo',
            tecnico: 'Santiago Aliprandi',
            created_at: '2026-03-30T14:30:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/active:scale-95/);
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // Search ticket
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9876');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify result card is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify WhatsApp button and icon are visible in the result card
    await expect(waBtn).toBeVisible();
    await expect(waIcon).toBeVisible();

    // Verify WhatsApp button updated with dynamic ticket query context
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-9876 por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-9876 por WhatsApp');

    const expectedText = encodeURIComponent('Hola TechHealth! Quisiera consultar sobre el estado de mi ticket TH-2026-9876.');
    await expect(waBtn).toHaveAttribute('href', `https://wa.me/5493815658239?text=${expectedText}`);
  });
});
