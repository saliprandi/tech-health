import { test, expect } from '@playwright/test';

test.describe('Servicios Modal CTA Busy & Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('modal CTA includes initial aria-label and updates aria-busy, aria-disabled, and aria-label upon click', async ({ page }) => {
    // Open first service modal
    const card = page.locator('.service-card').first();
    await card.click();

    const modal = page.locator('#service-modal');
    await expect(modal).toBeVisible();

    const cta = page.locator('#modal-cta');
    await expect(cta).toBeVisible();

    // Verify initial accessible label
    await expect(cta).toHaveAttribute('aria-label', 'Consultar por este servicio en WhatsApp');
    await expect(cta).not.toHaveAttribute('aria-busy');
    await expect(cta).not.toHaveAttribute('aria-disabled');

    // Click CTA
    await cta.click();

    // Verify busy state and updated aria-label
    await expect(cta).toHaveAttribute('aria-busy', 'true');
    await expect(cta).toHaveAttribute('aria-disabled', 'true');
    await expect(cta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp...');

    // Wait for the feedback restoration timeout (3 seconds)
    await page.waitForTimeout(3200);

    // Verify attributes restored
    await expect(cta).not.toHaveAttribute('aria-busy');
    await expect(cta).not.toHaveAttribute('aria-disabled');
    await expect(cta).toHaveAttribute('aria-label', 'Consultar por este servicio en WhatsApp');
  });
});
