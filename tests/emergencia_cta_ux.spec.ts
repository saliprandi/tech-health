import { test, expect } from '@playwright/test';

test.describe('Emergencia Section CTA Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render emergency CTA button with directional arrow icon and group hover micro-animation styling', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify WhatsApp icon and directional arrow SVG icons are aria-hidden="true"
    const svgs = cta.locator('svg');
    await expect(svgs).toHaveCount(2);

    for (let i = 0; i < await svgs.count(); i++) {
      await expect(svgs.nth(i)).toHaveAttribute('aria-hidden', 'true');
    }

    // Verify directional arrow has transition and hover/focus translate class
    const arrowSvg = svgs.nth(1);
    await expect(arrowSvg).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrowSvg).toHaveClass(/group-focus-visible:translate-x-1/);
  });
});
