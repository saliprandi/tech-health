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
    await expect(submitBtn).toHaveAttribute('aria-disabled', 'true');
    await expect(announcement).toHaveText('Buscando estado de ticket...');
  });

  test('clears proceso ticket input on Escape key press and announces to screen reader', async ({ page }) => {
    const section = page.locator('#proceso');
    await section.scrollIntoViewIfNeeded();

    const input = page.locator('#proceso-ticket-input');
    const clearBtn = page.locator('#proceso-clear-ticket-input');
    const announcement = page.locator('#proceso-estado-announcement');

    await input.fill('TH-2026-1234');
    await expect(clearBtn).toBeVisible();
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);

    await input.press('Escape');

    await expect(input).toHaveValue('');
    await expect(clearBtn).toBeHidden();
    await expect(input).not.toHaveAttribute('aria-invalid');
    await expect(announcement).toHaveText('Campo de número de ticket limpiado');
  });
});
