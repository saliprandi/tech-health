import { test, expect } from '@playwright/test';

test.describe('Estado Ticket WhatsApp Action Button Micro-UX', () => {
  test('should render accessible WhatsApp action link with correct attributes, styling, and dynamic ticket URL', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-1234',
            estado: 'diagnostico',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // 1. Verify static presence and accessibility attributes of #wa-ticket-btn
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // 2. Perform search to trigger displayResult and update link href
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-1234');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // 3. Verify dynamically updated WhatsApp URL with pre-filled message
    await expect(waBtn).toBeVisible();
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239');
    expect(href).toContain(encodeURIComponent('TH-2026-1234'));
  });
});
