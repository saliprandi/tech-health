import { test, expect } from '@playwright/test';

test.describe('Proceso Ticket Search Form Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('proceso ticket search form shows loading spinner, aria-busy, and disabled state on submit', async ({ page }) => {
    const section = page.locator('#proceso');
    await section.scrollIntoViewIfNeeded();

    const input = page.locator('#proceso-ticket-input');
    const submitBtn = page.locator('#proceso-estado-submit');
    const submitText = page.locator('#proceso-estado-submit-text');
    const spinner = page.locator('#proceso-estado-spinner');
    const arrowIcon = page.locator('#proceso-estado-arrow');
    const announcement = page.locator('#proceso-estado-announcement');

    await input.fill('TH-2026-9999');

    // Prevent navigation in capture phase so handleSubmit runs without navigating away
    await page.evaluate(() => {
      const form = document.getElementById('proceso-estado-form');
      form?.addEventListener('submit', (e) => e.preventDefault(), true);
    });

    await submitBtn.click();

    await expect(submitText).toHaveText('Buscando...');
    await expect(spinner).toBeVisible();
    await expect(arrowIcon).toBeHidden();
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(submitBtn).toBeDisabled();
    await expect(announcement).toHaveText('Buscando estado de ticket...');
  });
});
