import { test, expect } from '@playwright/test';

test.describe('Marcas Section UX & Accessibility', () => {
  test('should render brand list with proper ARIA label and micro-UX transition classes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const brandList = page.locator('ul[aria-label="Marcas de equipos médicos soportadas"]');
    await expect(brandList).toBeVisible();

    const brandSpans = brandList.locator('li span');
    const count = await brandSpans.count();
    expect(count).toBeGreaterThan(0);

    const firstSpan = brandSpans.first();
    await expect(firstSpan).toHaveClass(/duration-300/);
    await expect(firstSpan).toHaveClass(/group-hover:scale-105/);
    await expect(firstSpan).toHaveClass(/group-hover:text-navy/);
  });
});
