import { test, expect } from '@playwright/test';

test.describe('Proceso Ticket Search Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should format input and navigate to ticket status page on submit', async ({ page }) => {
    const input = page.locator('#proceso-ticket-input');
    const submitBtn = page.locator('#proceso-estado-submit');

    await expect(input).toBeVisible();
    await expect(submitBtn).toBeVisible();

    await input.fill('  th-2026-9999  ');

    // Submit form and verify navigation to /estado with upper-case trimmed ticket query param
    await Promise.all([
      page.waitForURL(/\/estado\?ticket=TH-2026-9999/),
      submitBtn.click(),
    ]);

    expect(page.url()).toContain('/estado?ticket=TH-2026-9999');
  });

  test('should allow clearing ticket input and announce to screen reader', async ({ page }) => {
    const input = page.locator('#proceso-ticket-input');
    const clearBtn = page.locator('#proceso-clear-ticket-input');
    const announcement = page.locator('#proceso-estado-announcement');

    await input.fill('TH-1234');
    await expect(clearBtn).toBeVisible();

    await clearBtn.click();

    await expect(input).toHaveValue('');
    await expect(clearBtn).toHaveClass(/hidden/);
    await expect(announcement).toHaveText('Campo de número de ticket limpiado');
  });
});
