import { test, expect } from '@playwright/test';

test.describe('Hero Stats Accessibility & Description List UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid as a semantic description list with aria-label, dt, and dd tags', async ({ page }) => {
    const dl = page.locator('dl[aria-label="Estadísticas de la empresa"]');
    await expect(dl).toBeVisible();

    const dtElements = dl.locator('dt');
    const ddElements = dl.locator('dd');

    const dtCount = await dtElements.count();
    const ddCount = await ddElements.count();

    expect(dtCount).toBeGreaterThan(0);
    expect(dtCount).toEqual(ddCount);

    const firstItemContainer = dl.locator('div.flex.flex-col-reverse').first();
    await expect(firstItemContainer).toBeVisible();

    const firstDt = firstItemContainer.locator('dt');
    const firstDd = firstItemContainer.locator('dd');

    await expect(firstDt).toBeVisible();
    await expect(firstDd).toBeVisible();
  });
});
