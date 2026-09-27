import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Micro-UX', () => {
  test('should render "Volver arriba" link with correct attributes and focus styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopBtn = page.locator('footer a[href="#hero"]');
    await expect(backToTopBtn).toBeVisible();
    await expect(backToTopBtn).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    const text = await backToTopBtn.textContent();
    expect(text).toContain('Volver arriba');

    await backToTopBtn.focus();
    await expect(backToTopBtn).toBeFocused();
  });
});
