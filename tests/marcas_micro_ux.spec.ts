import { test, expect } from '@playwright/test';

test.describe('Marcas Section Micro-UX & Accessibility', () => {
  test('should render multibrand section with role="list" and micro-UX classes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const marcasList = page.locator('section#marcas ul[aria-label="Marcas de equipos médicos soportadas"]');
    await expect(marcasList).toBeVisible();
    await expect(marcasList).toHaveAttribute('role', 'list');

    const brandItems = marcasList.locator('li');
    const count = await brandItems.count();
    expect(count).toBeGreaterThan(0);

    const firstItem = brandItems.first();
    await expect(firstItem).toHaveClass(/hover:bg-slate-50\/80/);
    await expect(firstItem).toHaveClass(/focus-within:bg-slate-50\/80/);

    const firstBrandLink = firstItem.locator('a');
    await expect(firstBrandLink).toHaveAttribute('href', '#contacto');
    await expect(firstBrandLink).toHaveAttribute('aria-label', /Consultar servicio técnico para marca/);
    await expect(firstBrandLink).toHaveAttribute('title', /Consultar servicio técnico para marca/);
    await expect(firstBrandLink).toHaveClass(/group-hover:scale-105/);
    await expect(firstBrandLink).toHaveClass(/group-focus-within:scale-105/);
    await expect(firstBrandLink).toHaveClass(/group-focus-visible:scale-105/);
    await expect(firstBrandLink).toHaveClass(/focus-visible:ring-navy/);
    await expect(firstBrandLink).toHaveClass(/active:scale-95/);
  });
});
