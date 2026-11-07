import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Micro-UX & Accessibility', () => {
  test('should render direct WhatsApp consultation link with correct accessibility attributes and micro-UX styling', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();

    // Verify accessible attributes
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify classes for micro-UX, focus ring and active tactile feedback
    const classAttr = await waBtn.getAttribute('class');
    expect(classAttr).toContain('focus-visible:ring-2');
    expect(classAttr).toContain('focus-visible:ring-emerald-600');
    expect(classAttr).toContain('active:scale-95');
    expect(classAttr).toContain('group/wa');

    // Verify SVG icon heartbeat animation classes
    const svgIcon = waBtn.locator('svg');
    await expect(svgIcon).toBeAttached();
    const svgClass = await svgIcon.getAttribute('class');
    expect(svgClass).toContain('group-hover/wa:animate-heartbeat');
    expect(svgClass).toContain('group-focus-visible/wa:animate-heartbeat');
  });

  test('should dynamically update WhatsApp link URL, title, and aria-label when a ticket is queried and displayed', async ({ page }) => {
    // Intercept webhook to return mock ticket response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-TEST',
            estado: 'diagnostico',
            nombre: 'Clínica San Lucas',
            servicio: 'Mantenimiento correctivo',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
            estado_descripcion: 'Equipo en banco de pruebas para diagnóstico de fuente conmutada.',
          },
          historial: [],
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-TEST');
    await page.locator('#estado-submit').click();

    // Verify result is visible
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();

    // Verify URL and accessibility attributes update dynamically with ticket number
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('TH-2026-TEST');
    expect(href).toContain('https://wa.me/');

    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre el ticket TH-2026-TEST');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre el ticket TH-2026-TEST');
  });
});
