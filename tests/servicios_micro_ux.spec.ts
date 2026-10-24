import { test, expect } from '@playwright/test';

test.describe('Servicios Micro-UX & Native Tooltips', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('service cards feature native title tooltips and active press scale micro-UX', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = serviceCards.nth(i);
      const titleAttr = await card.getAttribute('title');
      expect(titleAttr).toBeTruthy();
      expect(titleAttr).toContain('Ver detalles:');

      const classList = await card.getAttribute('class');
      expect(classList).toContain('active:scale-[0.98]');
    }
  });

  test('modal action buttons include native title tooltips and active tactile press states', async ({ page }) => {
    const serviceCard = page.locator('.service-card').first();
    await serviceCard.click();

    const modal = page.locator('#service-modal');
    await expect(modal).toBeVisible();

    const modalCta = page.locator('#modal-cta');
    await expect(modalCta).toBeVisible();
    await expect(modalCta).toHaveAttribute('title', 'Consultar por este servicio en WhatsApp');
    const ctaClassList = await modalCta.getAttribute('class');
    expect(ctaClassList).toContain('active:scale-[0.98]');

    const closeSecondary = page.locator('#modal-close-secondary');
    await expect(closeSecondary).toBeVisible();
    await expect(closeSecondary).toHaveAttribute('title', 'Cerrar detalles del servicio');
    const closeClassList = await closeSecondary.getAttribute('class');
    expect(closeClassList).toContain('active:scale-95');
  });
});
