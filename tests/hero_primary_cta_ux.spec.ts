import { test, expect } from '@playwright/test';

test.describe('Hero Primary CTA Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render primary CTA button with directional arrow icon and group hover/focus micro-animation', async ({ page }) => {
    const primaryBtn = page.locator('#hero-cta');

    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toContainText('Solicitar servicio');
    await expect(primaryBtn).toHaveClass(/group/);
    await expect(primaryBtn).toHaveClass(/btn-primary/);

    const icons = primaryBtn.locator('svg');
    await expect(icons).toHaveCount(2);

    const arrowIcon = icons.nth(1);
    await expect(arrowIcon).toBeVisible();
    await expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
    await expect(arrowIcon).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-1/);
  });

  test('should render hero card with accessible list attributes', async ({ page }) => {
    const equiposList = page.locator('ul[aria-labelledby="hero-equipos-title"]');
    await expect(equiposList).toBeVisible();

    const title = page.locator('#hero-equipos-title');
    await expect(title).toHaveText('Equipos que atendemos:');
  });
});
