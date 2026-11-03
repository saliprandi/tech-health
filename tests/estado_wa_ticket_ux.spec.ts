import { test, expect } from '@playwright/test';

test.describe('WhatsApp Direct Ticket Consultation Action Link UX & Accessibility', () => {
  test('should render wa-ticket-btn with accessible attributes, focus styling, and update href dynamically on ticket lookup', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-8888',
            estado: 'intervencion',
            nombre: 'Clínica Mayo',
            servicio: 'Reparación de placa electrónica',
            tecnico: 'Carlos Gomez',
            created_at: '2026-03-30T14:00:00Z',
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

    // Verify result is displayed
    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    const waSvg = waBtn.locator('svg');
    await expect(waSvg).toBeVisible();
    await expect(waSvg).toHaveAttribute('aria-hidden', 'true');

    // Verify waBtn has been updated with pre-filled message and accessible label
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar por WhatsApp sobre el ticket TH-2026-8888');
    const href = await waBtn.getAttribute('href');
    expect(href).toContain('TH-2026-8888');
    expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  });
});
