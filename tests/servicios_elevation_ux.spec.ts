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
});
