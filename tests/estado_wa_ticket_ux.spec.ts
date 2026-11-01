import { test, expect } from '@playwright/test';

test.describe('WhatsApp Direct Ticket Consultation Action Link UX', () => {
  test('should render direct WhatsApp consultation link with correct accessibility attributes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toBeAttached();
    await expect(waIcon).toHaveClass(/group-hover:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible:animate-heartbeat/);
  });

  test('should dynamically format pre-filled WhatsApp link with searched ticket number', async ({ page }) => {
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
            servicio: 'Reparación de electrocardiógrafo',
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T14:30:00Z',
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
    expect(href).toContain('TH-2026-8888');
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);

    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-8888 en WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-8888 en WhatsApp');
  });
});
