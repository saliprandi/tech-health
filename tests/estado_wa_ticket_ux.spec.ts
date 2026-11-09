import { test, expect } from '@playwright/test';

test.describe('WhatsApp Ticket Consultation Micro-UX & Accessibility', () => {
  test('should render #wa-ticket-btn with accessible attributes, micro-animations, and dynamic ticket URL', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-8888',
            estado: 'intervencion',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación de placa electrónica',
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T14:30:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // Submit ticket query
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify result card displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Locate WhatsApp button
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/group\/wa/);
    await expect(waBtn).toHaveClass(/active:scale-95/);
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);

    // Verify accessible attributes and dynamic URL with pre-filled message
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-8888 por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-8888 por WhatsApp');
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('wa.me/');
    expect(href).toContain(encodeURIComponent('TH-2026-8888'));

    // Check SVG icon with heartbeat micro-animation class
    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toBeVisible();
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });
});
