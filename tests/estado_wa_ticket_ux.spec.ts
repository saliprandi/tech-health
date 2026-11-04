import { test, expect } from '@playwright/test';

test.describe('Estado WhatsApp Ticket Consultation Micro-UX & Accessibility', () => {
  test('should render WhatsApp ticket action button with accessible attributes and dynamic pre-filled link', async ({ page }) => {
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
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T12:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-8888');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    // Verify WhatsApp button visibility and attributes
    const waBtn = page.locator('#wa-ticket-btn');
    await expect(waBtn).toBeVisible();
    await expect(waBtn).toHaveAttribute('title', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('aria-label', 'Consultar sobre este ticket por WhatsApp');
    await expect(waBtn).toHaveAttribute('target', '_blank');
    await expect(waBtn).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(waBtn).toHaveClass(/focus-visible:ring-emerald-600/);
    await expect(waBtn).toHaveClass(/active:scale-95/);

    // Verify SVG icon exists inside button and is hidden from screen readers
    const icon = waBtn.locator('svg');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon).toHaveClass(/group-hover\/wa:text-emerald-600/);

    // Verify dynamic href includes the ticket number
    const href = await waBtn.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href).toContain('https://wa.me/');
    expect(href).toContain('TH-2026-8888');
    expect(href).toContain(encodeURIComponent('Hola TechHealth! Deseo consultar sobre el estado de mi ticket TH-2026-8888'));
  });
});
