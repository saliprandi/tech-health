import { test, expect } from '@playwright/test';

test.describe('Emergencia CTA Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render emergency CTA button with directional arrow icon and group hover/focus micro-animation', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('title', 'Solicitar atención de emergencia por WhatsApp');

    // Verify WhatsApp icon and directional arrow icon are present with aria-hidden="true"
    const svgIcons = cta.locator('svg[aria-hidden="true"]');
    await expect(svgIcons).toHaveCount(2);

    // Verify directional arrow SVG has translate-x transition classes
    const arrowIcon = svgIcons.nth(1);
    await expect(arrowIcon).toHaveClass(/group-hover:translate-x-1/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:translate-x-1/);

    // Test click feedback and aria-live announcement
    const announcement = page.locator('#emergencia-cta-announcement');
    await cta.click();
    await expect(announcement).toHaveText('Redirigiendo a WhatsApp...');
  });

  test('emergencia CTA dynamically updates and restores aria-label and busy states upon click', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();

    // Verify initial accessibility attributes
    await expect(cta).toHaveAttribute('aria-label', 'Solicitar atención de emergencia por WhatsApp');
    await expect(cta).not.toHaveAttribute('aria-busy', 'true');
    await expect(cta).not.toHaveAttribute('aria-disabled', 'true');

    // Trigger CTA click
    await cta.click();

    // Verify dynamic state transitions during redirection
    await expect(cta).toHaveAttribute('aria-busy', 'true');
    await expect(cta).toHaveAttribute('aria-disabled', 'true');
    await expect(cta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp...');
    await expect(page.locator('#emergencia-cta-announcement')).toHaveText('Redirigiendo a WhatsApp...');

    // Wait for the feedback timeout (3000ms) to verify attribute restoration
    await expect(cta).not.toHaveAttribute('aria-busy', 'true', { timeout: 4500 });
    await expect(cta).not.toHaveAttribute('aria-disabled', 'true');
    await expect(cta).toHaveAttribute('aria-label', 'Solicitar atención de emergencia por WhatsApp');
    await expect(page.locator('#emergencia-cta-announcement')).toHaveText('');
  });
});
