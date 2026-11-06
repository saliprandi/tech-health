import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('should render #wa-ticket-btn with accessible attributes, focus ring, and active scale styling', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveClass(/active:scale-95/);
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });

  test('should dynamically format WhatsApp URL and ARIA attributes with ticket number upon successful lookup', async ({ page }) => {
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

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toBeVisible();
    await expect(waBtn).toHaveAttribute('href', /https:\/\/wa\.me\/5493815658239\?text=Hola%20TechHealth!%20Deseo%20consultar%20sobre%20el%20estado%20de%20mi%20ticket%20TH-2026-8888/);
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-8888 por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-8888 por WhatsApp');
  });
});
