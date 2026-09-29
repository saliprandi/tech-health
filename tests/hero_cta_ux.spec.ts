import { test, expect } from '@playwright/test';

test.describe('Hero Primary CTA UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('hero primary CTA sets aria-busy and updates text on click', async ({ page }) => {
    const heroCta = page.locator('#hero-cta');
    const heroCtaText = page.locator('#hero-cta-text');
    const heroCtaAnnouncement = page.locator('#hero-cta-announcement');

    await expect(heroCta).toBeVisible();
    await expect(heroCtaText).toHaveText('Solicitar servicio');

    await heroCta.click();

    await expect(heroCta).toHaveAttribute('aria-busy', 'true');
    await expect(heroCtaText).toHaveText('Redirigiendo...');
    await expect(heroCtaAnnouncement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
