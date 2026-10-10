import { test, expect } from '@playwright/test';

test.describe('Popup Blocker Fallback & Redirection UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('hero CTA button handles window.open popup blocker gracefully', async ({ page }) => {
    // Stub window.open to simulate popup blocker returning null
    await page.addInitScript(() => {
      window.open = () => null;
    });

    const heroCta = page.locator('#hero-cta');
    await expect(heroCta).toBeVisible();

    const announcement = page.locator('#hero-cta-announcement');
    await heroCta.click();

    // Verify aria-live announcement is updated immediately
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });

  test('emergencia CTA button handles window.open popup blocker gracefully', async ({ page }) => {
    await page.addInitScript(() => {
      window.open = () => null;
    });

    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();

    const announcement = page.locator('#emergencia-cta-announcement');
    await cta.click();

    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
