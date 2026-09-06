import { test, expect } from '@playwright/test';

test.describe('Footer UX and Accessibility', () => {
  test('footer container is visible and social links have proper classes when present', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const socialLinks = page.locator('footer a[aria-label^="Seguir en"]');
    const count = await socialLinks.count();

    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');

      const className = await link.getAttribute('class');
      expect(className).toContain('focus-visible:ring-2');
      expect(className).toContain('focus-visible:scale-110');

      const svg = link.locator('svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
