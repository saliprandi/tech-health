import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('should render wa-ticket-btn with accessible attributes and update on ticket query', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-4321',
            estado: 'intervencion',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación de placa',
            tecnico: 'Santiago Aliprandi',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const icon = waBtn.locator('svg');
    await expect(icon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(icon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // Query ticket
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-4321');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify result is visible
    await expect(page.locator('#result-ticket-number')).toHaveText('TH-2026-4321');

    // Verify updated WhatsApp href, aria-label, and title
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-4321 por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-4321 por WhatsApp');
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('TH-2026-4321');
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);

    // Test reset action restores waBtn
    const resetBtn = page.locator('#nueva-consulta');
    await resetBtn.click();
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
  });
});
