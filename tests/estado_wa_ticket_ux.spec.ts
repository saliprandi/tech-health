import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search Direct WhatsApp Action Link Micro-UX', () => {
  test('should render #wa-ticket-btn with accessible attributes and update href dynamically on ticket search', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9876',
            estado: 'intervencion',
            nombre: 'Sanatorio Modelo',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T14:30:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // 1. Locate WhatsApp action link inside ticket action buttons container
    const waTicketBtn = page.locator('#wa-ticket-btn');
    await expect(waTicketBtn).toBeAttached();
    await expect(waTicketBtn).toHaveAttribute('target', '_blank');
    await expect(waTicketBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waTicketBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waTicketBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');

    // 2. Verify micro-UX classes: tactile active scale, focus ring styling, and heartbeat animation
    await expect(waTicketBtn).toHaveClass(/active:scale-95/);
    await expect(waTicketBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waTicketBtn).toHaveClass(/focus-visible:ring-offset-2/);

    const waSvg = waTicketBtn.locator('svg');
    await expect(waSvg).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(waSvg).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);

    // 3. Search ticket to trigger result panel
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9876');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // 4. Verify dynamic href, title, and aria-label updates with ticket context
    await expect(waTicketBtn).toBeVisible();
    await expect(waTicketBtn).toHaveAttribute('title', 'Consultar sobre el ticket TH-2026-9876 por WhatsApp');
    await expect(waTicketBtn).toHaveAttribute('aria-label', 'Consultar sobre el ticket TH-2026-9876 por WhatsApp');

    const href = await waTicketBtn.getAttribute('href');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Deseo consultar sobre el estado de mi ticket TH-2026-9876.'));
  });
});
