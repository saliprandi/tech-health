import { test, expect } from '@playwright/test';

test.describe('Hero Stats Grid Semantic Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid using semantic description list <dl> with aria-label', async ({ page }) => {
    const statsList = page.locator('dl[aria-label="Estadísticas clave de la empresa"]');
    await expect(statsList).toBeVisible();

    const flexContainers = statsList.locator('div.flex.flex-col-reverse');
    const count = await flexContainers.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const container = flexContainers.nth(i);
      const dt = container.locator('dt');
      const dd = container.locator('dd');

      await expect(dt).toBeVisible();
      await expect(dd).toBeVisible();

      await expect(dt).toHaveClass(/font-body/);
      await expect(dd).toHaveClass(/font-heading/);
    }
  });
});
