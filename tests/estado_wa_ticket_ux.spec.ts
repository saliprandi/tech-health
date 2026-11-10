import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('should render wa-ticket-btn with accessible attributes and update href dynamically on ticket search', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Sanatorio Central',
            servicio: 'Mantenimiento preventivo',
            tecnico: 'Santiago Aliprandi',
            created_at: '2026-03-15T10:00:00Z',
            estado: 'intervencion',
            estado_descripcion: 'En calibración'
          },
          historial: []
        })
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Initial state before query
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');

    // Perform ticket search
    await page.fill('#ticket-input', 'TH-2026-9999');
    await page.click('#estado-submit');

    await expect(page.locator('#estado-result')).toBeVisible();

    // Verify dynamic update with ticket number
    await expect(waBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-9999 en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-9999 en WhatsApp');

    const href = await waBtn.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href).toContain('https://wa.me/5493815658239');
    expect(href).toContain('TH-2026-9999');
  });
});
