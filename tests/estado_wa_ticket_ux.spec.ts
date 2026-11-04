import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('renders WhatsApp action button with accessibility attributes, title tooltip, and micro-UX styling', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();

    // Verify security & accessibility attributes
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');

    // Verify tactile and focus micro-UX styling classes
    await expect(waBtn).toHaveClass(/focus-visible:ring-2/);
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Verify embedded WhatsApp SVG icon
    const icon = waBtn.locator('svg');
    await expect(icon).toBeVisible({ visible: false }); // hidden inside resultDiv initially
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('dynamically updates WhatsApp action button URL and labels when ticket result is displayed', async ({ page }) => {
    // Intercept ticket query API to return mock ticket data
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Hospital Central',
            servicio: 'Mantenimiento preventivo',
            tecnico: 'Santiago Aliprandi',
            estado: 'intervencion',
            estado_descripcion: 'En calibración técnica',
            created_at: new Date().toISOString(),
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    const submitBtn = page.locator('#estado-submit');
    const waBtn = page.locator('#wa-ticket-btn');

    await input.fill('TH-2026-9999');
    await submitBtn.click();

    // Result panel should become visible
    await expect(page.locator('#estado-result')).toBeVisible();

    // Verify dynamic update of href, title and aria-label
    await expect(waBtn).toHaveAttribute('href', /https:\/\/wa\.me\/.*text=.*TH-2026-9999/);
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-9999 por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-9999 por WhatsApp');
  });
});
