import { test, expect } from '@playwright/test';

test.describe('Hero Stats Grid Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render stats grid as a semantic description list <dl> with aria-label, <dd> numbers, and <dt> labels', async ({ page }) => {
    const statsList = page.locator('dl[aria-label="Estadísticas de la empresa"]');
    await expect(statsList).toBeVisible();

    const statItems = statsList.locator('div.group\\/stat');
    const count = await statItems.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const item = statItems.nth(i);
      await expect(item).toHaveClass(/hover:bg-slate-50\/80/);
      await expect(item).toHaveClass(/focus-within:bg-slate-50\/80/);

      const dd = item.locator('dd');
      await expect(dd).toBeVisible();
      await expect(dd).toHaveClass(/order-1/);
      await expect(dd).toHaveClass(/group-hover\/stat:scale-105/);

      const dt = item.locator('dt');
      await expect(dt).toBeVisible();
      await expect(dt).toHaveClass(/order-2/);
      await expect(dt).toHaveClass(/group-hover\/stat:text-navy/);
    }
  });
});
