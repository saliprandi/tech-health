import { test, expect } from '@playwright/test';

test.describe('Copy Buttons Micro-UX & List Semantics', () => {
  test('should have native title tooltips and active press scale micro-animation utilities on contact copy buttons', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const copyPhone = page.locator('#copy-phone');
    await expect(copyPhone).toBeVisible();
    await expect(copyPhone).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    await expect(copyPhone).toHaveClass(/active:scale-95/);

    const copyAddress = page.locator('#copy-address');
    await expect(copyAddress).toBeVisible();
    await expect(copyAddress).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    await expect(copyAddress).toHaveClass(/active:scale-95/);
  });

  test('should have native title tooltips and active press scale micro-animation utilities on ticket status copy buttons', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-9999',
            estado: 'diagnostico',
            nombre: 'Clínica San Juan',
            servicio: 'Reparación / Mantenimiento correctivo',
            tecnico: 'Carlos Gómez',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-9999');
    await page.locator('#estado-submit').click();

    const copyBtn = page.locator('#copy-ticket-btn');
    await expect(copyBtn).toBeVisible();
    await expect(copyBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    await expect(copyBtn).toHaveClass(/active:scale-95/);

    const shareBtn = page.locator('#share-ticket-btn');
    await expect(shareBtn).toBeVisible();
    await expect(shareBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareBtn).toHaveClass(/active:scale-95/);
  });

  test('should have explicit role="list" on Diferenciales and Proceso list containers', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const difList = page.locator('ul[aria-label="Diferenciales de la empresa"]');
    await expect(difList).toHaveAttribute('role', 'list');

    const procList = page.locator('ol[aria-label="Pasos del proceso de servicio técnico"]');
    await expect(procList).toHaveAttribute('role', 'list');
  });
});
