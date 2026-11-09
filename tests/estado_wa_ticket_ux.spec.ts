import { test, expect } from '@playwright/test';

test.describe('Estado Ticket WhatsApp Action Link Micro-UX & Accessibility', () => {
  test('should render #wa-ticket-btn with accessible attributes and update dynamically on ticket query', async ({ page }) => {
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
            servicio: 'Reparación de desfibrilador',
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // Verify wa-ticket-btn element attributes
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Fill ticket search and submit to show results
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9876');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // Verify wa-ticket-btn dynamically updated with ticket number in URL and labels
    await expect(waBtn).toHaveAttribute('href', /TH-2026-9876/);
    await expect(waBtn).toHaveAttribute('title', 'Consultar por el ticket TH-2026-9876 en WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por el ticket TH-2026-9876 en WhatsApp');
  });
});
