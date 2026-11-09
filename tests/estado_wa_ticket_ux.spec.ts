import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Direct Action Link Micro-UX', () => {
  test('should render #wa-ticket-btn with accessible micro-UX classes and update URL dynamically on status query', async ({ page }) => {
    // Intercept webhook call to return a mock ticket response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Sanatorio Central',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Ing. Carlos Mendoza',
            created_at: '2026-03-30T10:00:00Z',
            estado: 'diagnostico',
            estado_descripcion: 'En proceso de medición de componentes.',
            equipo: 'Desfibrilador Bifásico',
            marca: 'Mindray',
            modelo: 'BeneHeart D3',
            serie: 'SN-987654',
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();

    // Check accessibility & micro-UX initial classes
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // Query ticket
    await page.fill('#ticket-input', 'TH-2026-9999');
    await page.click('#estado-submit');

    // Result should be visible
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Check dynamically updated WhatsApp attributes
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por ticket TH-2026-9999 en WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por ticket TH-2026-9999 en WhatsApp');

    const updatedHref = await waBtn.getAttribute('href');
    expect(updatedHref).toContain('TH-2026-9999');
    expect(updatedHref).toMatch(/^https:\/\/wa\.me\/5493815658239\?text=/);
  });
});
