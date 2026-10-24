import { test, expect } from '@playwright/test';

test.describe('Hero Key Stats Description List A11y & UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid using semantic dl element with aria-label and proper dt/dd DOM ordering', async ({ page }) => {
    const statsList = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(statsList).toBeVisible();

    const statItems = statsList.locator('div.flex.flex-col');
    await expect(statItems).toHaveCount(4);

    const firstItem = statItems.first();
    const dt = firstItem.locator('dt');
    const dd = firstItem.locator('dd');

    await expect(dt).toBeVisible();
    await expect(dd).toBeVisible();

    // Verify Tailwind flex ordering
    await expect(dd).toHaveClass(/order-1/);
    await expect(dt).toHaveClass(/order-2/);

    // Verify DOM order (<dt> precedes <dd> in HTML structure)
    const itemHtml = await firstItem.innerHTML();
    const dtIndex = itemHtml.indexOf('<dt');
    const ddIndex = itemHtml.indexOf('<dd');

    expect(dtIndex).toBeGreaterThan(-1);
    expect(ddIndex).toBeGreaterThan(-1);
    expect(dtIndex).toBeLessThan(ddIndex);
  });
});
