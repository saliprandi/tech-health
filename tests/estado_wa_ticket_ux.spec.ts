import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Direct Action UX & Accessibility', () => {
  test('should render WhatsApp consultation link with accessible attributes and classes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveCount(1);
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');

    const className = await waBtn.getAttribute('class');
    expect(className).toContain('focus-visible:ring-emerald-600');
    expect(className).toContain('active:scale-95');
    expect(className).toContain('hover:text-emerald-600');
    expect(className).toContain('focus-visible:text-emerald-600');
  });

  test('should update WhatsApp href dynamically with ticket number on search result', async ({ page }) => {
    // Mock the backend API response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            nombre: 'Sanatorio Central',
            servicio: 'Reparación de Cardiodesfibrilador',
            tecnico: 'Ing. Lucas Díaz',
            created_at: '2026-03-30T10:00:00.000Z',
            estado: 'diagnostico',
            estado_descripcion: 'Equipo en banco de pruebas electrónicas',
            equipo: 'Desfibrilador Bifásico',
            marca: 'Mindray',
            modelo: 'BeneHeart D3',
            serie: 'SN-9999-XYZ'
          },
          historial: []
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9999');
    await page.locator('#estado-submit').click();

    const result = page.locator('#estado-result');
    await expect(result).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();

    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain(encodeURIComponent('TH-2026-9999'));
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Deseo consultar sobre el estado de mi ticket TH-2026-9999.'));
  });
});
