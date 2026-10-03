import { test, expect } from '@playwright/test';

test.describe('Marcas Section Micro-UX & Accessibility', () => {
  test('should render brand badges with group-focus-within highlight and scale classes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const marcasList = page.locator('#marcas ul[aria-label="Marcas de equipos médicos soportadas"]');
    await expect(marcasList).toBeVisible();

    const brandItem = marcasList.locator('li.group span').first();
    await expect(brandItem).toBeVisible();

    const className = await brandItem.getAttribute('class');
    expect(className).toContain('group-focus-within:text-navy');
    expect(className).toContain('group-focus-within:scale-105');
  });
});
