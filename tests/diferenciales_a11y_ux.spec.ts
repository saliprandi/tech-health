import { test, expect } from '@playwright/test';

test.describe('Diferenciales Section Accessibility & Micro-UX', () => {
  test('should render differential cards with list semantics, focus-within ring styling, and interactive action links', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const list = page.locator('section#diferenciales ul[role="list"]');
    await expect(list).toBeVisible();
    await expect(list).toHaveAttribute('aria-label', 'Diferenciales de la empresa');

    const cardItems = page.locator('section#diferenciales ul[role="list"] > li');
    const count = await cardItems.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cardItems.nth(i);
      const cardClass = await card.getAttribute('class');
      expect(cardClass).toContain('focus-within:ring-2');
      expect(cardClass).toContain('focus-within:ring-blue');

      const actionLink = card.locator('a[href="#contacto"]');
      await expect(actionLink).toBeVisible();

      const title = await actionLink.getAttribute('title');
      expect(title).toContain('Consultar por');

      const ariaLabel = await actionLink.getAttribute('aria-label');
      expect(ariaLabel).toContain('Consultar por');

      const svgArrow = actionLink.locator('svg');
      await expect(svgArrow).toBeAttached();
      const svgClass = await svgArrow.getAttribute('class');
      expect(svgClass).toContain('group-focus-within:translate-x-0.5');
    }
  });
});
