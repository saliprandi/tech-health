import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept n8n webhook request with a mock response
    await page.route('**/webhook/techhealth-estado*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Sanatorio Central',
            servicio: 'Mantenimiento preventivo',
            tecnico: 'Ing. Lucas Rodríguez',
            created_at: '2026-03-30T10:00:00Z',
            estado: 'intervencion',
            estado_descripcion: 'Equipo en banco de calibración.',
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
  });

  test('should render #wa-ticket-btn with accessibility attributes and focus ring styling', async ({ page }) => {
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();

    // Verify accessible labels and tooltips
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify focus-visible and active scale classes
    await expect(waBtn).toHaveClass(/focus-visible:ring-2/);
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Verify embedded SVG WhatsApp icon
    const svgIcon = waBtn.locator('svg');
    await expect(svgIcon).toBeAttached();
    await expect(svgIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('should dynamically update WhatsApp link with ticket number when search succeeds', async ({ page }) => {
    const ticketInput = page.locator('#ticket-input');
    const submitBtn = page.locator('#estado-submit');
    const waBtn = page.locator('#wa-ticket-btn');

    await ticketInput.fill('TH-2026-9999');
    await submitBtn.click();

    // Verify result is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify WhatsApp button is visible and contains ticket reference in URL
    await expect(waBtn).toBeVisible();
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain(encodeURIComponent('TH-2026-9999'));
  });
});
