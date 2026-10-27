import { test, expect } from '@playwright/test';

test.describe('Palette UX & Accessibility Improvements', () => {
  test('f-tel input in Contacto section includes accessible helper text and aria-describedby linkage', async ({ page }) => {
    await page.goto('http://localhost:4321/#contacto');
    await page.locator('#contacto').scrollIntoViewIfNeeded();

    const telInput = page.locator('#f-tel');
    const telHint = page.locator('#f-tel-hint');

    await expect(telInput).toBeVisible();
    await expect(telInput).toHaveAttribute('aria-describedby', 'f-tel-hint');
    await expect(telHint).toBeVisible();
    await expect(telHint).toContainText('Código de área y número');
  });

  test('ticket history in estado page renders as semantic list with role="list" and aria-label', async ({ page }) => {
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ticket: {
            ticket_number: 'TH-2026-TEST',
            nombre: 'Cliente Test',
            servicio: 'Mantenimiento Preventivo',
            tecnico: 'Técnico Especialista',
            created_at: '2026-03-01T10:00:00Z',
            estado: 'diagnostico',
            estado_descripcion: 'En diagnóstico técnico'
          },
          historial: [
            {
              estado_anterior: 'recepcion',
              estado_nuevo: 'diagnostico',
              fecha: '2026-03-01T11:00:00Z',
              tecnico: 'Técnico Especialista',
              nota: 'Iniciando diagnóstico'
            }
          ]
        })
      });
    });

    await page.goto('http://localhost:4321/estado');
    await page.fill('#ticket-input', 'TH-2026-TEST');
    await page.click('#estado-submit');

    await expect(page.locator('#estado-result')).toBeVisible();

    const historyList = page.locator('#result-historial ol');
    await expect(historyList).toBeVisible();
    await expect(historyList).toHaveAttribute('role', 'list');
    await expect(historyList).toHaveAttribute('aria-label', 'Historial de cambios del ticket');

    const historyItems = historyList.locator('li');
    await expect(historyItems).toHaveCount(1);
  });
});
