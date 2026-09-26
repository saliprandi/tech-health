import { test, expect } from '@playwright/test';

test.describe('Footer "Volver arriba" Micro-UX & Accessibility', () => {
  test('should render "Volver arriba" link with correct href, aria-label, and micro-UX styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    // Check inner text
    await expect(backToTopLink).toContainText('Volver arriba');

    // Check high contrast focus ring classes
    await expect(backToTopLink).toHaveClass(/focus-visible:ring-2/);
    await expect(backToTopLink).toHaveClass(/focus-visible:ring-white\/40/);

    // Check directional micro-animation class on SVG icon
    const icon = backToTopLink.locator('svg');
    await expect(icon).toHaveClass(/group-hover:-translate-y-0.5/);
    await expect(icon).toHaveClass(/group-focus-visible:-translate-y-0.5/);
  });
});
