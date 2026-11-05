import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Link Micro-UX & Accessibility', () => {
  test('renders WhatsApp consultation action link with accessible attributes, micro-animations and contextual message', async ({ page }) => {
    // Intercept webhook to return mock ticket response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Dra. María González',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Santiago Aliprandi',
            estado: 'intervencion',
            estado_descripcion: 'En proceso de calibración final',
            created_at: '2026-03-30T10:00:00.000Z',
            equipo: 'Monitor Multiparamétrico',
            marca: 'Mindray',
            modelo: 'uMEC12',
            serie: 'SN-999123',
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();

    // Verify initial accessibility attributes
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify micro-UX styling classes (tactile active press, high-contrast focus ring, group-hover animations)
    const classAttr = await waBtn.getAttribute('class');
    expect(classAttr).toContain('active:scale-95');
    expect(classAttr).toContain('focus-visible:ring-2');
    expect(classAttr).toContain('focus-visible:ring-emerald-600');

    // Fill and submit form
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9999');
    await page.locator('#estado-submit').click();

    // Verify result card is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify dynamically generated href with contextual ticket message
    const updatedHref = await waBtn.getAttribute('href');
    expect(updatedHref).toContain('https://wa.me/5493815658239?text=');
    expect(decodeURIComponent(updatedHref || '')).toContain('Hola TechHealth! Deseo consultar sobre el estado de mi ticket TH-2026-9999.');

    // Verify embedded SVG icon is marked aria-hidden="true"
    const svgIcon = waBtn.locator('svg');
    await expect(svgIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
