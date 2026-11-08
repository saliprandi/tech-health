import { test, expect } from '@playwright/test';

test.describe('Ticket Result WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('should render wa-ticket-btn with accessible attributes and dynamic URL upon ticket lookup', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-8888',
            estado: 'diagnostico',
            nombre: 'Sanatorio Central',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeAttached();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveAttribute('title', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por este ticket en WhatsApp');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // Submit ticket query
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify result ticket rendered
    await expect(page.locator('#result-ticket-number')).toHaveText('TH-2026-8888');

    // Verify dynamic update of href, title, and aria-label
    await expect(waBtn).toHaveAttribute('title', 'Consultar estado del ticket TH-2026-8888 por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar estado del ticket TH-2026-8888 por WhatsApp');
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain('TH-2026-8888');
  });
});
