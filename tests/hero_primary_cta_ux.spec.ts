import { test, expect } from '@playwright/test';

test.describe('Hero Primary CTA Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render hero CTA with proper ARIA attributes, SVG icon micro-animation class, and show redirection feedback on click', async ({ page }) => {
    const heroCta = page.locator('#hero-cta');
    await expect(heroCta).toBeVisible();

    // Verify SVG icon inside hero CTA has micro-animation scale classes
    const svgIcon = heroCta.locator('svg');
    await expect(svgIcon).toHaveClass(/group-hover:scale-110/);
    await expect(svgIcon).toHaveClass(/group-focus-visible:scale-110/);

    // Verify click redirection feedback state
    const ctaText = page.locator('#hero-cta-text');
    const announcement = page.locator('#hero-cta-announcement');

    await expect(ctaText).toHaveText('Solicitar servicio');
    await heroCta.click();

    await expect(ctaText).toHaveText('Redirigiendo...');
    await expect(heroCta).toHaveAttribute('aria-busy', 'true');
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
