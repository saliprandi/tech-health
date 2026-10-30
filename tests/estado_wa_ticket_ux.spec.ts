import { test, expect } from '@playwright/test';

test.describe('Estado Page WhatsApp Ticket Action Button UX & Accessibility', () => {
  test('renders #wa-ticket-btn with correct attributes, accessibility, and micro-UX classes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveCount(1);
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const svgIcon = waBtn.locator('svg');
    await expect(svgIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('updates #wa-ticket-btn href, title, and aria-label with ticket query text on result display', async ({ page }) => {
    // Intercept webhook call or pass a ticket via URL
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-1234',
            estado: 'diagnostico',
            nombre: 'Juan Pérez',
            servicio: 'Mantenimiento preventivo',
            tecnico: 'Santiago Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
            estado_descripcion: 'En revisión de laboratorio',
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-1234');
    await page.locator('#estado-submit').click();

    await expect(page.locator('#estado-result')).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('href', /https:\/\/wa\.me\/5493815658239\?text=.*TH-2026-1234/);
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-1234 por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-1234 por WhatsApp');
  });
});
