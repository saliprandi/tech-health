import { test, expect } from '@playwright/test';

test.describe('Botón de consulta WhatsApp en resultado de estado', () => {
  test('debe mostrar el botón de WhatsApp con accesibilidad, foco y parámetros dinámicos del ticket', async ({ page, context }) => {
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
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación de desfibrilador',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();

    // Verificación de accesibilidad y micro-UX
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-8888 por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-8888 por WhatsApp');
    await expect(waBtn).toHaveClass(/active:scale-95/);
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);

    // Verificación de URL preconfigurada con número de ticket
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239?text=');
    expect(href).toContain(encodeURIComponent('TH-2026-8888'));

    // Verificación de micro-animación en ícono SVG de WhatsApp
    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toBeVisible();
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });
});
