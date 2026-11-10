import { test, expect } from '@playwright/test';

test.describe('Nav CTA Busy & Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('desktop nav CTA includes initial aria-label and updates aria-busy, aria-disabled, and aria-label upon click', async ({ page }) => {
    const navCta = page.locator('#nav-cta');
    await expect(navCta).toBeVisible();

    // Verify initial accessibility attributes
    await expect(navCta).toHaveAttribute('aria-label', 'Consultar por WhatsApp');
    await expect(navCta).toHaveAttribute('title', 'Consultar por WhatsApp');
    await expect(navCta).not.toHaveAttribute('aria-busy', 'true');
    await expect(navCta).not.toHaveAttribute('aria-disabled', 'true');

    // Trigger CTA click
    await navCta.click();

    // Verify dynamic state transitions during redirection
    await expect(navCta).toHaveAttribute('aria-busy', 'true');
    await expect(navCta).toHaveAttribute('aria-disabled', 'true');
    await expect(navCta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp...');
    await expect(page.locator('#nav-redirection-announcement')).toHaveText('Redirigiendo a WhatsApp...');

    // Wait for the feedback timeout (3000ms) to verify attribute restoration
    await expect(navCta).not.toHaveAttribute('aria-busy', 'true', { timeout: 4500 });
    await expect(navCta).not.toHaveAttribute('aria-disabled', 'true');
    await expect(navCta).toHaveAttribute('aria-label', 'Consultar por WhatsApp');
    await expect(page.locator('#nav-redirection-announcement')).toHaveText('');
  });

  test('mobile nav CTA includes initial aria-label and updates aria-busy, aria-disabled, and aria-label upon click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuToggle = page.locator('#menu-toggle');
    await menuToggle.click();

    const mobileCta = page.locator('#mobile-nav-cta');
    await expect(mobileCta).toBeVisible();

    // Verify initial accessibility attributes
    await expect(mobileCta).toHaveAttribute('aria-label', 'Consultar por WhatsApp');
    await expect(mobileCta).toHaveAttribute('title', 'Consultar por WhatsApp');
    await expect(mobileCta).not.toHaveAttribute('aria-busy', 'true');
    await expect(mobileCta).not.toHaveAttribute('aria-disabled', 'true');

    // Trigger mobile CTA click
    await mobileCta.click();

    // Verify dynamic state transitions during redirection
    await expect(mobileCta).toHaveAttribute('aria-busy', 'true');
    await expect(mobileCta).toHaveAttribute('aria-disabled', 'true');
    await expect(mobileCta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp...');
    await expect(page.locator('#nav-redirection-announcement')).toHaveText('Redirigiendo a WhatsApp...');

    // Wait for the feedback timeout (3000ms) to verify attribute restoration
    await expect(mobileCta).not.toHaveAttribute('aria-busy', 'true', { timeout: 4500 });
    await expect(mobileCta).not.toHaveAttribute('aria-disabled', 'true');
    await expect(mobileCta).toHaveAttribute('aria-label', 'Consultar por WhatsApp');
    await expect(page.locator('#nav-redirection-announcement')).toHaveText('');
  });
});
