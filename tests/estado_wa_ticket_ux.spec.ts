import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Result WhatsApp Consultation Link Micro-UX & Accessibility', () => {
  test('should render #wa-ticket-btn with accessible attributes, micro-UX styling, and update URL dynamically', async ({ page }) => {
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
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Santiago Aliprandi',
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

    const waTicketBtn = page.locator('#wa-ticket-btn');
    await expect(waTicketBtn).toBeVisible();

    // Verify accessible attributes and target/rel attributes
    await expect(waTicketBtn).toHaveAttribute('target', '_blank');
    await expect(waTicketBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waTicketBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre el ticket TH-2026-8888');
    await expect(waTicketBtn).toHaveAttribute('title', 'Consultar por WhatsApp sobre el ticket TH-2026-8888');

    // Verify WhatsApp URL prefilled message encoding
    const expectedHref = 'https://wa.me/5493815658239?text=Hola%20TechHealth!%20Deseo%20consultar%20sobre%20el%20estado%20de%20mi%20ticket%20TH-2026-8888.';
    await expect(waTicketBtn).toHaveAttribute('href', expectedHref);

    // Verify micro-UX and high-contrast focus ring styling
    await expect(waTicketBtn).toHaveClass(/active:scale-95/);
    await expect(waTicketBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waTicketBtn).toHaveClass(/hover:text-emerald-600/);

    // Verify embedded WhatsApp SVG icon styling
    const icon = waTicketBtn.locator('svg');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveClass(/group-hover\/wa:animate-heartbeat/);
    await expect(icon).toHaveClass(/group-focus-visible\/wa:animate-heartbeat/);
  });
});
