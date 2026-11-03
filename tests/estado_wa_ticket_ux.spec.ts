import { test, expect } from '@playwright/test';

test.describe('Ticket Consultation WhatsApp Button Micro-UX & Accessibility', () => {
  test('ticket result card includes accessible WhatsApp action link with dynamic pre-filled ticket message', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Sanatorio Central',
            servicio: 'Reparación Electromedicina',
            tecnico: 'Ing. Biomédico',
            created_at: '2026-03-30T10:00:00Z',
            estado: 'intervencion',
            estado_descripcion: 'En reparación de placa madre'
          },
          historial: []
        })
      });
    });

    await page.goto('http://localhost:4321/estado');
    await page.fill('#ticket-input', 'TH-2026-9999');
    await page.click('#estado-submit');

    await expect(page.locator('#estado-result')).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-9999 en WhatsApp');

    // Verify micro-UX and high contrast focus classes
    const classList = await waBtn.getAttribute('class');
    expect(classList).toContain('focus-visible:ring-emerald-600');
    expect(classList).toContain('focus-visible:ring-offset-2');
    expect(classList).toContain('active:scale-95');

    // Verify dynamic href includes encoded ticket number
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain('TH-2026-9999');

    // Verify embedded svg icon
    const svgIcon = waBtn.locator('svg');
    await expect(svgIcon).toBeVisible();
    await expect(svgIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
