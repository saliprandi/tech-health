import { test, expect } from '@playwright/test';

test.describe('Nav CTA Accessibility & Dynamic ARIA Redirection UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('nav CTA has explicit aria-label and updates aria-busy, aria-disabled, aria-label during redirection', async ({ page }) => {
    const navCta = page.locator('#nav-cta');
    await expect(navCta).toBeVisible();
    await expect(navCta).toHaveAttribute('aria-label', 'Consultar por WhatsApp');
    await expect(navCta).toHaveAttribute('title', 'Consultar por WhatsApp');

    // Click CTA
    await navCta.click();

    // Verify redirection state ARIA attributes
    await expect(navCta).toHaveAttribute('aria-busy', 'true');
    await expect(navCta).toHaveAttribute('aria-disabled', 'true');
    await expect(navCta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp');
  });
});
