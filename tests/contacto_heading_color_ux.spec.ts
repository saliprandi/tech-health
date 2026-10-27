import { test, expect } from '@playwright/test';

test.describe('Contacto Card Heading Color Transition Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('Contacto info card headings feature group hover/focus color transition classes', async ({ page }) => {
    const contactHeadings = page.locator('#contacto .flex.flex-col.gap-4 > div .font-heading.font-bold');
    const count = await contactHeadings.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      const classList = await contactHeadings.nth(i).getAttribute('class');
      expect(classList).toContain('group-hover:text-blue');
      expect(classList).toContain('group-focus-within:text-blue');
      expect(classList).toContain('transition-colors');
    }
  });
});
