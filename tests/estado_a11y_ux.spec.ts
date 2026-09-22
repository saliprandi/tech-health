import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search Accessibility and Micro-UX', () => {
  test('should have accessible focus-visible rings, ARIA live regions, and button attributes', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    // 0. Check "Volver al inicio" back link visible text and directional icon
    const backLink = page.getByRole('link', { name: 'Volver al inicio' });
    await expect(backLink).toBeVisible();
    await expect(backLink.locator('svg')).toHaveClass(/group-hover:-translate-x-0.5/);
    await expect(backLink.locator('svg')).toHaveAttribute('aria-hidden', 'true');

    // 1. Check ticket input attributes, helper text linkage, and focus styling
    const input = page.locator('#ticket-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('aria-describedby', 'ticket-input-hint');
    await expect(input).toHaveClass(/focus-visible:ring-blue-light/);

    const helperText = page.locator('#ticket-input-hint');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText(/Formato: letras y números/);

    // 2. Check submit button focus styling
    const submitBtn = page.locator('#estado-submit');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveClass(/focus-visible:ring-blue-light/);

    // 3. Check ARIA attributes on error container and result container
    const errorContainer = page.locator('#estado-error');
    await expect(errorContainer).toHaveAttribute('role', 'alert');
    await expect(errorContainer).toHaveAttribute('aria-live', 'assertive');

    const resultContainer = page.locator('#estado-result');
    await expect(resultContainer).toHaveAttribute('role', 'status');
    await expect(resultContainer).toHaveAttribute('aria-live', 'polite');

    // 4. Check "Consultar otro ticket" reset button attributes and styling
    const resetBtn = page.locator('#nueva-consulta');
    await expect(resetBtn).toHaveAttribute('type', 'button');
    await expect(resetBtn).toHaveClass(/focus-visible:ring-white/);

    // 5. Check ticket copy button attributes and focus styling
    const copyBtn = page.locator('#copy-ticket-btn');
    await expect(copyBtn).toHaveAttribute('type', 'button');
    await expect(copyBtn).toHaveAttribute('aria-label', 'Copiar número de ticket al portapapeles');
    await expect(copyBtn).toHaveClass(/focus-visible:ring-blue/);

    // 5b. Check ticket share link button attributes and focus styling
    const shareBtn = page.locator('#share-ticket-btn');
    await expect(shareBtn).toHaveAttribute('type', 'button');
    await expect(shareBtn).toHaveAttribute('aria-label', 'Copiar enlace directo del ticket al portapapeles');
    await expect(shareBtn).toHaveClass(/focus-visible:ring-blue/);

    // 6. Check quick clear button attributes, visibility toggle, and focus restoration
    const clearBtn = page.locator('#clear-ticket-input');
    await expect(clearBtn).toBeHidden();
    await expect(clearBtn).toHaveAttribute('aria-label', 'Limpiar número de ticket');

    await input.fill('TH-2026-9999');
    await expect(clearBtn).toBeVisible();

    await clearBtn.click();
    await expect(input).toHaveValue('');
    await expect(clearBtn).toBeHidden();
    await expect(input).toBeFocused();
  });

  test('should display result and allow copying ticket number', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

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

    const input = page.locator('#ticket-input');
    // Enter ticket with spaces to test whitespace stripping
    await input.fill(' TH - 2026 - 1234 ');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const resultTicketNumber = page.locator('#result-ticket-number');
    await expect(resultTicketNumber).toHaveText('TH-2026-1234');

    // Check URL search parameter sync
    await expect(page).toHaveURL(/.*\/estado\?ticket=TH-2026-1234/);

    const copyBtn = page.locator('#copy-ticket-btn');
    await expect(copyBtn).toBeVisible();

    // Verify focus automatically transferred to copyBtn for keyboard accessibility
    await expect(copyBtn).toBeFocused();

    await copyBtn.click();
    await expect(page.locator('#copy-ticket-text')).toHaveText('¡Copiado!');
    await expect(copyBtn).toHaveAttribute('aria-label', 'Número de ticket copiado al portapapeles');

    // Test share link button
    const shareBtn = page.locator('#share-ticket-btn');
    await expect(shareBtn).toBeVisible();
    await shareBtn.click();
    await expect(page.locator('#share-ticket-text')).toHaveText('¡Enlace copiado!');
    await expect(shareBtn).toHaveAttribute('aria-label', 'Enlace directo del ticket copiado al portapapeles');
  });

  test('should handle ticket search error and set aria-live announcement', async ({ page }) => {
    // Mock failed ticket response
    await page.route('**/webhook/techhealth-estado*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Ticket no encontrado' }),
      });
    });

    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    await input.fill('TH-9999-INVALID');

    const submitBtn = page.locator('#estado-submit');
    await submitBtn.click();

    const errorContainer = page.locator('#estado-error');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toHaveText('Ticket no encontrado');

    // Verify dynamic error dismissal on typing
    await input.pressSequentially('X');
    await expect(errorContainer).toBeHidden();
  });
});
