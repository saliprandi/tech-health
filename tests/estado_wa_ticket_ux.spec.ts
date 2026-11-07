import { test, expect } from '@playwright/test';

test.describe('Estado WhatsApp Direct Action Button Micro-UX & Accessibility', () => {
  test('should render #wa-ticket-btn with accessible attributes and update dynamically on ticket query', async ({ page }) => {
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
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // Query ticket
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify WhatsApp ticket button exists in result panel
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-8888 en WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-8888 en WhatsApp');

    // Verify WhatsApp pre-filled text in URL
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239');
    expect(href).toContain(encodeURIComponent('TH-2026-8888'));

    // Verify micro-UX focus and active classes
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Verify embedded WhatsApp SVG icon styling
    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toBeVisible();
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });
});
