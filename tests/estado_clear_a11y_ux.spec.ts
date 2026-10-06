import { test, expect } from '@playwright/test';

test.describe('Estado Ticket Search Clear Button Accessibility & ARIA-Invalid UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/estado');
  });

  test('clears ticket input on clear button click and announces to screen reader', async ({ page }) => {
    const input = page.locator('#ticket-input');
    const clearBtn = page.locator('#clear-ticket-input');
    const announcement = page.locator('#estado-announcement');

    await input.fill('TH-2026-9999');
    await expect(clearBtn).toBeVisible();

    await clearBtn.click();

    await expect(input).toHaveValue('');
    await expect(clearBtn).toBeHidden();
    await expect(input).not.toHaveAttribute('aria-invalid');
    await expect(announcement).toHaveText('Campo de número de ticket limpiado');
  });

  test('includes aria-invalid visual error styling class on ticket search input', async ({ page }) => {
    const input = page.locator('#ticket-input');
    await expect(input).toHaveClass(/aria-invalid:border-red-400\/80/);
  });
});
