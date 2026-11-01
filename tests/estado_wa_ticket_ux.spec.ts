import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Direct Action UX & Accessibility', () => {
  test('should render #wa-ticket-btn with micro-UX classes and accessibility attributes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();

    // Verify rel, target, and accessibility attributes
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');

    // Verify tactile and focus-visible styling
    const className = await waBtn.getAttribute('class');
    expect(className).toContain('active:scale-95');
    expect(className).toContain('focus-visible:ring-2');
    expect(className).toContain('focus-visible:ring-emerald-600');
    expect(className).toContain('focus-visible:ring-offset-2');

    // Verify embedded SVG WhatsApp icon with aria-hidden
    const icon = waBtn.locator('svg');
    await expect(icon).toBeAttached();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon.locator('use')).toHaveAttribute('href', '#icon-whatsapp');
  });

  test('should update #wa-ticket-btn href, aria-label, and title dynamically when ticket is loaded', async ({ page }) => {
    // Mock the webhook endpoint response
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
            tecnico: 'Santiago Aliprandi',
            estado: 'diagnostico',
            estado_descripcion: 'Equipo en evaluación de circuitos',
            created_at: '2026-03-30T10:00:00Z',
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9999');
    await page.locator('#estado-submit').click();

    // Wait for the result section to be visible
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-9999 en WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-9999 en WhatsApp');

    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Deseo consultar sobre el estado de mi ticket TH-2026-9999.'));
  });
});
