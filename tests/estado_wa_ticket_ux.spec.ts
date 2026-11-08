import { test, expect } from '@playwright/test';

test.describe('Estado WhatsApp Ticket Consultation Micro-UX & Accessibility', () => {
  test('should render wa-ticket-btn with accessible attributes, focus styling, and active press scale', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });

  test('should update wa-ticket-btn href, title, and aria-label when ticket is queried', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9876',
            estado: 'intervencion',
            nombre: 'Clínica San Lucas',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T14:30:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9876');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn.locator('svg')).toBeVisible();
    await expect(waBtn).toHaveAttribute('href', /https:\/\/wa\.me\/5493815658239\?text=.*TH-2026-9876/);
    await expect(waBtn).toHaveAttribute('title', 'Consultar por ticket TH-2026-9876 en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por ticket TH-2026-9876 en WhatsApp');
  });
});
