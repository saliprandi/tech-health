import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Link Micro-UX & Accessibility', () => {
  test('should render accessible WhatsApp action link with dynamic ticket prefill in estado result', async ({ page }) => {
    // Intercept webhook call to return mock ticket data
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
            estado: 'diagnostico',
            estado_descripcion: 'Equipo en fase de análisis técnico de componentes',
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

    // Verify result card is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify WhatsApp button presence, accessibility, and styling
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');

    // Verify dynamic ticket pre-filled message in href
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239');
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Consulto por mi ticket TH-2026-9999'));

    // Verify focus-visible and active styles are included in classes
    const classList = await waBtn.getAttribute('class');
    expect(classList).toContain('focus-visible:ring-2');
    expect(classList).toContain('focus-visible:ring-emerald-600');
    expect(classList).toContain('active:scale-95');

    // Verify SVG icon attributes
    const icon = waBtn.locator('svg');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    const iconClass = await icon.getAttribute('class');
    expect(iconClass).toContain('group-hover/wa:animate-heartbeat');
    expect(iconClass).toContain('group-focus-visible/wa:animate-heartbeat');
  });
});
