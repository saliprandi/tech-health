import { test, expect } from '@playwright/test';

test.describe('Footer Social Media Links UX & Accessibility', () => {
  test('should have accessible touch targets, focus styles, and ARIA attributes when social links are present', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const socialLinks = footer.locator('a[aria-label^="Seguir en"]');
    const count = await socialLinks.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const link = socialLinks.nth(i);

        // Verify security and external target attributes
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');

        // Verify class list contains padding for touch target and focus ring classes
        const className = await link.getAttribute('class');
        expect(className).toContain('p-2');
        expect(className).toContain('focus-visible:ring-2');
        expect(className).toContain('outline-none');

        // Verify inner SVG has aria-hidden="true"
        const svg = link.locator('svg');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
      }
    }
  });
});
