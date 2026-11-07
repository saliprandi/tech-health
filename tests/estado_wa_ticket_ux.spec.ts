import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Direct Consultation UX & Accessibility', () => {
  test('renders #wa-ticket-btn with accessibility attributes, title tooltip, and dynamically updates on ticket query', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Sanatorio Central',
            servicio: 'Reparación de placa',
            tecnico: 'Santiago Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
            estado: 'intervencion',
            estado_descripcion: 'Reemplazo de componentes SMD en curso'
          },
          historial: []
        })
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Query ticket
    await page.fill('#ticket-input', 'TH-2026-9999');
    await page.click('#estado-submit');

    await expect(page.locator('#estado-result')).toBeVisible();

    // Verify dynamic updates
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-9999 en WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-9999 en WhatsApp');
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239?text=');
    expect(href).toContain(encodeURIComponent('TH-2026-9999'));
  });
});
