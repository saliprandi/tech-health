import { test, expect } from '@playwright/test';

test.describe('WhatsApp Floating Button ARIA & Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should have aria-describedby referencing wa-tooltip and dynamic aria-busy/aria-disabled during redirection', async ({ page }) => {
    const btn = page.locator('#wa-float-btn');

    // Check aria-describedby attribute
    await expect(btn).toHaveAttribute('aria-describedby', 'wa-tooltip');

    // Initially should not be aria-busy or aria-disabled
    await expect(btn).not.toHaveAttribute('aria-busy', 'true');
    await expect(btn).not.toHaveAttribute('aria-disabled', 'true');

    // Trigger redirection click
    await btn.click();

    // During redirection state, aria-busy and aria-disabled should be true
    await expect(btn).toHaveAttribute('aria-busy', 'true');
    await expect(btn).toHaveAttribute('aria-disabled', 'true');

    // Wait for timeout reset (3s)
    await page.waitForTimeout(3200);

    // After timeout, attributes should be removed
    await expect(btn).not.toHaveAttribute('aria-busy');
    await expect(btn).not.toHaveAttribute('aria-disabled');
  });
});
