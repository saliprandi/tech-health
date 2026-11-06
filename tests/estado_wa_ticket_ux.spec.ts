import { test, expect } from '@playwright/test';

test.describe('Ticket Consultation WhatsApp Micro-UX & Accessibility', () => {
  test('should render WhatsApp consultation link with accessible attributes and dynamic ticket message', async ({ page }) => {
    // Intercept the status webhook to provide mock ticket response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Dra. María González',
            servicio: 'Reparación de placa electrónica',
            tecnico: 'Santiago Aliprandi',
            estado: 'intervencion',
            estado_descripcion: 'Reemplazando componentes SMD en circuito de potencia.',
            created_at: new Date().toISOString(),
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // Fill in ticket number and submit
    const ticketInput = page.locator('#ticket-input');
    await ticketInput.fill('TH-2026-9999');
    await page.locator('#estado-submit').click();

    // Verify result card displays
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify the WhatsApp ticket consultation link
    const waTicketBtn = page.locator('#wa-ticket-btn');
    await expect(waTicketBtn).toBeVisible();

    // Verify accessible labels and tooltips
    await expect(waTicketBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waTicketBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waTicketBtn).toHaveAttribute('target', '_blank');
    await expect(waTicketBtn).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify href contains sanitized WhatsApp URL and encoded ticket number
    const href = await waTicketBtn.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('https://wa.me/');
    expect(href).toContain('TH-2026-9999');

    // Verify embedded SVG icon is aria-hidden
    const waIcon = waTicketBtn.locator('svg');
    await expect(waIcon).toHaveAttribute('aria-hidden', 'true');

    // Verify focus-visible styling classes
    const classList = await waTicketBtn.getAttribute('class');
    expect(classList).toContain('focus-visible:ring-2');
    expect(classList).toContain('focus-visible:ring-emerald-600');
    expect(classList).toContain('active:scale-95');
  });
});
