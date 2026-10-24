import { test, expect } from '@playwright/test';

test.describe('Hero Featured Equipment Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render featured equipment list items as interactive links with accessibility and micro-UX attributes', async ({ page }) => {
    const list = page.locator('ul[aria-label="Equipos destacados que atendemos"]');
    await expect(list).toBeVisible();

    const items = list.locator('li.group\\/item');
    await expect(items).toHaveCount(5);

    const firstLink = items.first().locator('a[href="#contacto"]');
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toHaveAttribute('aria-label', /Consultar servicio técnico para/);
    await expect(firstLink).toHaveAttribute('title', /Consultar servicio técnico para/);
    await expect(firstLink).toHaveClass(/focus-visible:ring-2/);
    await expect(firstLink).toHaveClass(/active:scale-\[0\.98\]/);

    const chevron = firstLink.locator('svg').filter({ has: page.locator('path[d="M9 5l7 7-7 7"]') });
    await expect(chevron).toBeVisible();
    await expect(chevron).toHaveAttribute('aria-hidden', 'true');
    await expect(chevron).toHaveClass(/group-hover\/item:translate-x-0\.5/);
    await expect(chevron).toHaveClass(/group-focus-within\/item:translate-x-0\.5/);
  });
});
