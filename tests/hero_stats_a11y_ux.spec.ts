import { test, expect } from '@playwright/test';

test.describe('Hero Stats Grid Accessibility & Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render stats grid as semantic description list with accessibility attributes and micro-UX classes', async ({ page }) => {
    const statsList = page.locator('dl[aria-label="Estadísticas y métricas de servicio"]');
    await expect(statsList).toBeVisible();

    const statItems = statsList.locator('div.group\\/stat');
    const count = await statItems.count();
    expect(count).toBeGreaterThan(0);

    const firstStat = statItems.first();
    await expect(firstStat).toHaveClass(/flex-col-reverse/);
    await expect(firstStat).toHaveClass(/hover:bg-slate-50\/80/);

    const term = firstStat.locator('dt');
    const description = firstStat.locator('dd');

    await expect(term).toBeVisible();
    await expect(description).toBeVisible();

    await expect(term).toHaveClass(/group-hover\/stat:text-navy/);
    await expect(description).toHaveClass(/text-\[42px\]/);
  });
});
