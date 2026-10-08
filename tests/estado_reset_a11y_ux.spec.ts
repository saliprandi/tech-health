import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search Reset and Clear Micro-UX', () => {
  test('should have native tooltips, press micro-animations, and live region reset announcements', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-1234',
            estado: 'diagnostico',
            nombre: 'Hospital Central',
            servicio: 'Mantenimiento preventivo',
            tecnico: 'Juan Pérez',
            created_at: '2026-03-30T10:00:00Z',
          },
        }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    // 1. Verify clear button title and scale micro-UX classes
    const clearBtn = page.locator('#clear-ticket-input');
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);

    // 2. Verify "Consultar otro ticket" button title and press scale classes
    const resetBtn = page.locator('#nueva-consulta');
    await expect(resetBtn).toHaveAttribute('title', 'Consultar otro número de ticket');
    await expect(resetBtn).toHaveClass(/active:scale-95/);

    // 3. Fill ticket search and submit to show results
    const input = page.locator('#ticket-input');
    await input.fill('TH-2026-1234');
    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultDiv = page.locator('#estado-result');
    await expect(resultDiv).toBeVisible();

    // 4. Click "Consultar otro ticket" and check live region announcement & reset state
    const announcement = page.locator('#estado-announcement');
    await resetBtn.click();

    await expect(resultDiv).toBeHidden();
    await expect(input).toHaveValue('');
    await expect(input).toBeFocused();
    await expect(announcement).toHaveText('Formulario reiniciado para una nueva consulta');
  });
});
