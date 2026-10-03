import { test, expect } from '@playwright/test';

test.describe('Contacto Form Submit Button Micro-UX & Visual Feedback', () => {
  test('submit button renders directional arrow icon and group hover micro-animation classes', async ({ page }) => {
    await page.goto('http://localhost:4321/#contacto');

    const submitBtn = page.locator('#f-submit');
    await expect(submitBtn).toBeVisible();

    const arrowIcon = page.locator('#f-submit-arrow');
    await expect(arrowIcon).toBeVisible();
    await expect(arrowIcon).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-1/);

    const waIcon = page.locator('#f-submit-wa-icon');
    await expect(waIcon).toBeVisible();

    const spinner = page.locator('#f-submit-spinner');
    await expect(spinner).toHaveClass(/hidden/);
  });

  test('toggles loading spinner and redirection feedback on submit', async ({ page }) => {
    await page.goto('http://localhost:4321/#contacto');

    await page.fill('#f-nombre', 'Carlos Tester');
    await page.fill('#f-tel', '3815551234');
    await page.fill('#f-desc', 'Consulta de prueba micro-UX');

    const submitBtn = page.locator('#f-submit');
    const submitText = page.locator('#f-submit-text');
    const spinner = page.locator('#f-submit-spinner');
    const waIcon = page.locator('#f-submit-wa-icon');
    const arrowIcon = page.locator('#f-submit-arrow');

    await submitBtn.click();

    await expect(submitText).toHaveText('Redirigiendo...');
    await expect(spinner).not.toHaveClass(/hidden/);
    await expect(waIcon).toHaveClass(/hidden/);
    await expect(arrowIcon).toHaveClass(/hidden/);
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
  });
});
