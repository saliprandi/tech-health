import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('should render wa-ticket-btn with accessible attributes, focus ring, and update dynamically upon query', async ({ page }) => {
    // Mock successful ticket query response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9876',
            estado: 'intervencion',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación de monitor',
            tecnico: 'Santiago Aliprandi',
            created_at: '2026-03-30T14:30:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // WhatsApp action button should be defined inside the result actions group
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Initial state before search
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre este ticket');

    // SVG icon inside button should have heartbeat micro-animation classes
    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // Submit ticket query
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9876');
    await page.locator('#estado-submit').click();

    // Verify result is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify WhatsApp button URL dynamically updated with ticket number and message
    const expectedMsg = 'Hola TechHealth! Deseo consultar sobre el estado de mi equipo (Ticket: TH-2026-9876).';
    await expect(waBtn).toHaveAttribute('href', `https://wa.me/5493815658239?text=${encodeURIComponent(expectedMsg)}`);
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre el ticket TH-2026-9876');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre el ticket TH-2026-9876');

    // Test reset button restores wa-ticket-btn attributes
    const resetBtn = page.locator('#nueva-consulta');
    await resetBtn.click();
    await expect(resultDiv).toBeHidden();
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre este ticket');
  });
});
