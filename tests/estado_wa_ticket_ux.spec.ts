import { test, expect } from '@playwright/test';

test.describe('Estado Page WhatsApp Ticket Button Micro-UX & Accessibility', () => {
  test('should render wa-ticket-btn with title tooltip, aria-label, and focus-visible ring styles', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');

    const classList = await waBtn.getAttribute('class');
    expect(classList).toContain('focus-visible:ring-2');
    expect(classList).toContain('focus-visible:ring-emerald-600');
    expect(classList).toContain('active:scale-95');
  });

  test('should update wa-ticket-btn href dynamically when ticket status result renders', async ({ page }) => {
    // Intercept webhook call to return mock ticket data
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Clínica Central',
            servicio: 'Mantenimiento preventivo',
            tecnico: 'Santiago Aliprandi',
            estado: 'diagnostico',
            estado_descripcion: 'En proceso de prueba',
            created_at: '2026-03-30T10:00:00Z'
          },
          historial: []
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');
    await page.fill('#ticket-input', 'TH-2026-9999');
    await page.click('#estado-submit');

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();

    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239');
    expect(href).toContain(encodeURIComponent('TH-2026-9999'));
  });
});
