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

  test('modal close button has enhanced aria-label and focus-visible styling', async ({ page }) => {
    const serviceCard = page.locator('.service-card').first();
    await serviceCard.click();

    const closeBtn = page.locator('#close-modal');
    await expect(closeBtn).toBeVisible();
    await expect(closeBtn).toHaveAttribute('aria-label', 'Cerrar detalles del servicio');

    const classList = await closeBtn.getAttribute('class');
    expect(classList).toContain('focus-visible:ring-2');
    expect(classList).toContain('focus-visible:ring-navy');
    expect(classList).toContain('hover:scale-110');
    expect(classList).toContain('focus-visible:scale-110');
  });
});
