import { test, expect } from '@playwright/test';

test.describe('Servicios Modal CTA Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('modal CTA includes aria-live announcement region and updates on click', async ({ page }) => {
    const serviceCard = page.locator('.service-card').first();
    await serviceCard.click();

    const modal = page.locator('#service-modal');
    await expect(modal).toBeVisible();

    const modalCta = page.locator('#modal-cta');
    await expect(modalCta).toBeVisible();

    const announcement = page.locator('#modal-cta-announcement');
    await expect(announcement).toBeAttached();
    await expect(announcement).toHaveAttribute('aria-live', 'polite');

    await modalCta.click();

    await expect(page.locator('#modal-cta-text')).toHaveText('Redirigiendo...');
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });
});
