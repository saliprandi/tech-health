import { test, expect } from '@playwright/test';

test.describe('Servicios Elevation Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('service cards include hover and focus-visible elevation micro-UX classes', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = serviceCards.nth(i);
      const classList = await card.getAttribute('class');
      expect(classList).toContain('hover:-translate-y-1');
      expect(classList).toContain('focus-visible:-translate-y-1');
    }
  });

  test('service card click indicator container is hidden from screen readers', async ({ page }) => {
    const serviceCard = page.locator('.service-card').first();
    const clickIndicator = serviceCard.locator('div.absolute.bottom-6.right-6');
    await expect(clickIndicator).toBeAttached();
    await expect(clickIndicator).toHaveAttribute('aria-hidden', 'true');
  });

  test('service cards and modal buttons feature native title tooltips and active press scale micro-animations', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    const firstCard = serviceCards.first();

    // Verify title attribute and active scale class on service cards
    await expect(firstCard).toHaveAttribute('title', /Ver detalles del servicio:/);
    const cardClassList = await firstCard.getAttribute('class');
    expect(cardClassList).toContain('active:scale-[0.98]');

    // Click card to open modal
    await firstCard.click();
    const modal = page.locator('#service-modal');
    await expect(modal).toBeVisible();

    // Verify modal CTA button title and active scale class
    const modalCta = page.locator('#modal-cta');
    await expect(modalCta).toHaveAttribute('title', 'Consultar por este servicio en WhatsApp');
    const ctaClassList = await modalCta.getAttribute('class');
    expect(ctaClassList).toContain('active:scale-[0.98]');

    // Verify modal secondary close button title and active scale class
    const modalCloseSec = page.locator('#modal-close-secondary');
    await expect(modalCloseSec).toHaveAttribute('title', 'Cerrar ventana de detalles');
    const closeClassList = await modalCloseSec.getAttribute('class');
    expect(closeClassList).toContain('active:scale-95');
  });
});
