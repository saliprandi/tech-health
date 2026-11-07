import { test, expect } from '@playwright/test';

test.describe('Servicios List Semantics Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('service cards include role="list" and descriptive aria-label on tasks list', async ({ page }) => {
    const serviceCards = page.locator('.service-card');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = serviceCards.nth(i);
      const list = card.locator('ul[role="list"]');
      await expect(list).toBeVisible();
      await expect(list).toHaveAttribute('aria-label', 'Tareas principales incluidas');

      const items = list.locator('li');
      const itemCount = await items.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });

  test('service modal includes role="list" and descriptive aria-label on detailed tasks list', async ({ page }) => {
    const serviceCard = page.locator('.service-card').first();
    await serviceCard.click();

    const modal = page.locator('#service-modal');
    await expect(modal).toBeVisible();

    const detailedList = modal.locator('ul[role="list"]');
    await expect(detailedList).toBeVisible();
    await expect(detailedList).toHaveAttribute('aria-label', 'Detalle de tareas incluidas');

    const items = detailedList.locator('li');
    const itemCount = await items.count();
    expect(itemCount).toBeGreaterThan(0);
  });
});
