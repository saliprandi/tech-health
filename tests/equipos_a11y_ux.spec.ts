import { test, expect } from '@playwright/test';

test.describe('Equipos Section Accessibility and UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render medical equipment list with accessible aria-label and semantic structure', async ({ page }) => {
    const list = page.locator('section#equipos ul');
    await expect(list).toBeVisible();
    await expect(list).toHaveAttribute('aria-label', 'Equipos y tecnología médica atendidos');

    const items = list.locator('li');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    // Verify icons are marked aria-hidden="true"
    const firstSvg = items.first().locator('svg');
    await expect(firstSvg).toHaveAttribute('aria-hidden', 'true');
  });
});
