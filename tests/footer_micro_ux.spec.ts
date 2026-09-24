import { test, expect } from '@playwright/test';

test.describe('Footer Tracking Link Micro-UX', () => {
  test('should render tracking link with group hover and focus icon scale micro-animation', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const link = page.locator('footer a[href="/estado"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/group/);

    const svg = link.locator('svg');
    await expect(svg).toHaveClass(/group-hover:scale-110/);
    await expect(svg).toHaveClass(/group-focus-visible:scale-110/);
  });
});
