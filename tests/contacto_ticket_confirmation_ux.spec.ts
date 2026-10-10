import { test, expect } from '@playwright/test';

test.describe('Contacto Ticket Confirmation Link Micro-UX', () => {
  test('ticket confirmation link has group class, focus offset, and directional chevron translation classes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const link = page.locator('#ticket-confirmation-link');
    await expect(link).toHaveCount(1);

    const classList = await link.getAttribute('class');
    expect(classList).toContain('group');
    expect(classList).toContain('focus-visible:ring-offset-2');

    const svgChevron = link.locator('svg');
    await expect(svgChevron).toHaveCount(1);

    const svgClassList = await svgChevron.getAttribute('class');
    expect(svgClassList).toContain('group-hover:translate-x-0.5');
    expect(svgClassList).toContain('group-focus-visible:translate-x-0.5');
    expect(svgClassList).toContain('transition-transform');
  });
});
