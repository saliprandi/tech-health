import { test, expect } from '@playwright/test';

test.describe('Equipos Section Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render equipment items with micro-UX hover and focus-within classes', async ({ page }) => {
    const equiposSection = page.locator('section#equipos');
    await expect(equiposSection).toBeVisible();

    const items = equiposSection.locator('ul > li.group');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    const firstItem = items.first();
    await expect(firstItem).toHaveClass(/group/);
    await expect(firstItem).toHaveClass(/hover:scale-\[1\.02\]/);
    await expect(firstItem).toHaveClass(/focus-within:scale-\[1\.02\]/);

    const icon = firstItem.locator('svg');
    await expect(icon).toHaveClass(/group-hover:scale-110/);
    await expect(icon).toHaveClass(/group-focus-within:scale-110/);

    const textSpan = firstItem.locator('span');
    await expect(textSpan).toHaveClass(/group-hover:text-white/);
    await expect(textSpan).toHaveClass(/group-focus-within:text-white/);
  });
});
