import { test, expect } from '@playwright/test';

test.describe('Hero Featured Equipment Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render hero stats grid as semantic description list with dt/dd ordering and aria-label', async ({ page }) => {
    const dl = page.locator('dl[aria-label="Métricas y estadísticas de servicio"]');
    await expect(dl).toBeVisible();

    const dtElements = dl.locator('dt');
    const ddElements = dl.locator('dd');

    await expect(dtElements).toHaveCount(2);
    await expect(ddElements).toHaveCount(2);

    const firstDd = ddElements.first();
    const firstDt = dtElements.first();

    await expect(firstDd).toHaveClass(/order-1/);
    await expect(firstDt).toHaveClass(/order-2/);
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
