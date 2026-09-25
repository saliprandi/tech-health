import { test, expect } from '@playwright/test';

test.describe('Emergencia CTA Micro-UX and Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('emergencia CTA button should have focus-visible styling and update state on click', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    const ctaText = page.locator('#emergencia-cta-text');
    const announcement = page.locator('#emergencia-cta-announcement');

    await expect(cta).toBeVisible();

    // Check class list contains high-contrast focus ring utilities
    const classList = await cta.getAttribute('class');
    expect(classList).toContain('focus-visible:ring-2');
    expect(classList).toContain('focus-visible:ring-white');

    // Click CTA and verify aria-busy and redirection feedback
    await cta.click();

    await expect(ctaText).toHaveText('Redirigiendo...');
    await expect(cta).toHaveAttribute('aria-busy', 'true');
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
