import { test, expect } from '@playwright/test';

test.describe('Diferenciales Micro-UX Parity', () => {
  test('diferenciales cards should have focus-within classes matching hover translate behavior', async ({ page }) => {
    await page.goto('http://localhost:4321/#diferenciales');

    const card = page.locator('#diferenciales ul li').first();
    await expect(card).toHaveClass(/hover:-translate-y-1/);
    await expect(card).toHaveClass(/focus-within:-translate-y-1/);
    await expect(card).toHaveClass(/hover:shadow-card-hover/);
    await expect(card).toHaveClass(/focus-within:shadow-card-hover/);
  });
});
