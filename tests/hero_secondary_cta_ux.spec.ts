import { test, expect } from '@playwright/test';

test.describe('Hero CTA UX & Directional Icons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render primary CTA button with directional arrow icon and group hover/focus micro-animation', async ({ page }) => {
    const primaryBtn = page.locator('#hero-cta');

    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toContainText('Solicitar servicio');
    await expect(primaryBtn).toHaveClass(/group/);

    const arrowIcon = primaryBtn.locator('svg').filter({ has: page.locator('path[d="M9 5l7 7-7 7"]') });
    await expect(arrowIcon).toBeVisible();
    await expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
    await expect(arrowIcon).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-1/);
  });

  test('should render secondary CTA button with directional chevron icon and group hover styling', async ({ page }) => {
    const secondaryBtn = page.locator('a[href="#servicios"].btn-secondary');

    await expect(secondaryBtn).toBeVisible();
    await expect(secondaryBtn).toContainText('Ver servicios');
    await expect(secondaryBtn).toHaveClass(/group/);
    await expect(secondaryBtn).toHaveClass(/gap-2/);

    const icon = secondaryBtn.locator('svg');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');

    const useTag = icon.locator('use');
    await expect(useTag).toHaveAttribute('href', '#icon-chevron-down');

    await expect(icon).toHaveClass(/group-hover:translate-y-0\.5/);
    await expect(icon).toHaveClass(/group-focus-visible:translate-y-0\.5/);
  });
});
