import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search WhatsApp Action Button Micro-UX & Accessibility', () => {
  test('should render WhatsApp ticket button with accessible attributes and dynamic ticket details', async ({ page }) => {
    // Mock successful ticket query response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-8888',
            estado: 'intervencion',
            nombre: 'Sanatorio del Norte',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Germán Aliprandi',
            created_at: '2026-03-30T14:30:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // Perform ticket search
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify result card and dynamic WhatsApp URL and attributes
    const resultContainer = page.locator('#estado-result');
    await expect(resultContainer).toBeVisible();

    // WhatsApp ticket button in DOM and visible in result card
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waIcon = waBtn.locator('svg');
    await expect(waIcon).toBeVisible();
    await expect(waIcon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waIcon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain(encodeURIComponent('TH-2026-8888'));
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Deseo consultar sobre el estado de mi ticket TH-2026-8888'));

    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar en WhatsApp por el ticket TH-2026-8888');
    await expect(waBtn).toHaveAttribute('title', 'Consultar en WhatsApp por el ticket TH-2026-8888');
  });
});
