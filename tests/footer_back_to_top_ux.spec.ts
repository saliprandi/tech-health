import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Link UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render back to top link with proper ARIA attributes, micro-animations, and focus styling', async ({ page }) => {
    const backToTopBtn = page.locator('footer a[href="#hero"]');

    await expect(backToTopBtn).toBeVisible();
    await expect(backToTopBtn).toContainText('Volver arriba');
    await expect(backToTopBtn).toHaveAttribute('aria-label', 'Volver al inicio de la página');
    await expect(backToTopBtn).toHaveClass(/group/);

    const icon = backToTopBtn.locator('svg');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon).toHaveClass(/group-hover:-translate-y-0\.5/);
    await expect(icon).toHaveClass(/group-focus-visible:-translate-y-0\.5/);

    await expect(backToTopBtn).toHaveClass(/focus-visible:ring-2/);
    await expect(backToTopBtn).toHaveClass(/focus-visible:ring-white\/40/);
  });
});
