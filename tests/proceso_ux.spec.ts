import { test, expect } from '@playwright/test';

test.describe('Proceso Ticket CTA Micro-UX and Accessibility', () => {
  test('should have accessible aria-describedby hint, clear button, and submit feedback', async ({ page }) => {
    await page.goto('http://localhost:4321/#proceso');

    const input = page.locator('#proceso-ticket-input');
    await expect(input).toBeVisible();

    // 1. Verify aria-describedby linkage to sr-only hint
    await expect(input).toHaveAttribute('aria-describedby', 'proceso-ticket-input-hint');
    const hint = page.locator('#proceso-ticket-input-hint');
    await expect(hint).toHaveText(/Formato: letras y números/);

    // 2. Verify quick clear button behavior
    const clearBtn = page.locator('#proceso-clear-ticket-input');
    await expect(clearBtn).toBeHidden();

    await input.fill('TH-2026-8888');
    await expect(clearBtn).toBeVisible();

    await clearBtn.click();
    await expect(input).toHaveValue('');
    await expect(clearBtn).toBeHidden();
    await expect(input).toBeFocused();

    // 3. Verify submit navigation to /estado with ticket query parameter
    await input.fill('TH-2026-8888');
    const submitBtn = page.locator('#proceso-estado-submit');
    const spinner = page.locator('#proceso-estado-spinner');

    await expect(spinner).toBeHidden();

    await submitBtn.click();
    await page.waitForURL('**/estado?ticket=TH-2026-8888');
    await expect(page).toHaveURL(/.*\/estado\?ticket=TH-2026-8888/);
  });
});
