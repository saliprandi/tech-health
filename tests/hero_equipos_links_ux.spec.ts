import { test, expect } from '@playwright/test';

test.describe('Hero Equipment Interactive Links Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render equipment list items in hero card as interactive action links with ARIA and micro-UX attributes', async ({ page }) => {
    const list = page.locator('#hero ul[aria-label="Equipos destacados que atendemos"]');
    await expect(list).toBeVisible();

    const equipmentLinks = list.locator('a[href="#contacto"]');
    const count = await equipmentLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = equipmentLinks.nth(i);
      await expect(link).toBeVisible();

      // Verify ARIA label and native title tooltip
      const text = (await link.locator('span').last().textContent())?.trim();
      await expect(link).toHaveAttribute('aria-label', `Consultar servicio técnico para ${text}`);
      await expect(link).toHaveAttribute('title', `Consultar servicio técnico para ${text}`);

      // Verify focus-visible and active scale utility classes
      await expect(link).toHaveClass(/focus-visible:ring-2/);
      await expect(link).toHaveClass(/focus-visible:ring-blue/);
      await expect(link).toHaveClass(/active:scale-\[0\.98\]/);

      // Verify directional arrow SVG presence and animation class
      const arrowIcon = link.locator('svg');
      await expect(arrowIcon).toBeVisible();
      await expect(arrowIcon).toHaveAttribute('aria-hidden', 'true');
      await expect(arrowIcon).toHaveClass(/group-hover\/item:translate-x-0\.5/);
    }
  });
});
