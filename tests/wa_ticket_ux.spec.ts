import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Link Micro-UX & Accessibility', () => {
  test('should render WhatsApp consultation action link with accessibility attributes and focus styles', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveClass(/focus-visible:ring-2/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const icon = waBtn.locator('svg');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('should dynamically update WhatsApp link with prefilled ticket number upon query result', async ({ page }) => {
    // Intercept webhook to provide a mock response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            estado: 'diagnostico',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación de electrocardiógrafo',
            tecnico: 'Germán Aliprandi',
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

    // Result container should be displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();

    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239');
    expect(href).toContain('TH-2026-9999');
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Quisiera consultar sobre el estado de mi ticket TH-2026-9999.'));
  });
});
