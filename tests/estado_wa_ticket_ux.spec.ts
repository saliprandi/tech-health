import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Result WhatsApp Consultation Link Micro-UX & A11y', () => {
  test('should render wa-ticket-btn with proper security attributes, focus styling, and SVG icon', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre este ticket');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });

  test('should dynamically update wa-ticket-btn href, title, and aria-label when ticket results are loaded', async ({ page }) => {
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
            servicio: 'Reparación de placa',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T12:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();

    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/5493815658239?text=');
    expect(href).toContain('TH-2026-8888');

    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre el ticket TH-2026-8888');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre el ticket TH-2026-8888');
  });
});
