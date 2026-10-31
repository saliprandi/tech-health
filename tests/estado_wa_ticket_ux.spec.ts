import { test, expect } from '@playwright/test';

test.describe('Ticket WhatsApp Inquiry Action Micro-UX & Accessibility', () => {
  test('should render #wa-ticket-btn with accessible attributes, micro-UX classes, and update link on ticket lookup', async ({ page }) => {
    // Intercept webhook call to return mock ticket
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            estado: 'diagnostico',
            estado_descripcion: 'Equipo en etapa de diagnóstico especializado.',
            nombre: 'Hospital Central',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Santiago Aliprandi',
            created_at: new Date().toISOString(),
            equipo: 'Monitor Multiparamétrico',
            marca: 'Mindray',
            modelo: 'ePM 10M',
            serie: 'SN-999888',
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    const submitBtn = page.locator('#estado-submit');
    const waTicketBtn = page.locator('#wa-ticket-btn');

    // Verify initial button properties
    await expect(waTicketBtn).toHaveAttribute('target', '_blank');
    await expect(waTicketBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waTicketBtn).toHaveClass(/focus-visible:ring-2/);
    await expect(waTicketBtn).toHaveClass(/active:scale-95/);

    // Search ticket
    await input.fill('TH-2026-9999');
    await submitBtn.click();

    // Verify result card is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify #wa-ticket-btn has dynamic ticket href and ARIA attributes
    await expect(waTicketBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-9999 en WhatsApp');
    await expect(waTicketBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-9999 en WhatsApp');
    const href = await waTicketBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain(encodeURIComponent('TH-2026-9999'));

    // Verify SVG icon has aria-hidden="true"
    const svgIcon = waTicketBtn.locator('svg');
    await expect(svgIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
