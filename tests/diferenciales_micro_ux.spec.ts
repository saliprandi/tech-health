import { test, expect } from '@playwright/test';

test.describe('Diferenciales Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render differential cards with hover and focus-within micro-UX classes', async ({ page }) => {
    const list = page.locator('ul[aria-label="Diferenciales de la empresa"]');
    await expect(list).toBeVisible();

    const cards = list.locator('li');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card).toHaveClass(/hover:-translate-y-1/);
      await expect(card).toHaveClass(/focus-within:-translate-y-1/);
      await expect(card).toHaveClass(/focus-within:ring-2/);
      await expect(card).toHaveClass(/focus-within:ring-blue/);
      await expect(card).toHaveClass(/focus-within:ring-offset-2/);
    }
  });
});
