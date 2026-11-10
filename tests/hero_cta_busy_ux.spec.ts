import { test, expect } from '@playwright/test';

test.describe('Hero CTA Busy & Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('hero CTA includes initial aria-label and updates aria-busy, aria-disabled, and aria-label upon click', async ({ page }) => {
    const heroCta = page.locator('#hero-cta');
    await expect(heroCta).toBeVisible();

    // Verify initial accessibility attributes
    await expect(heroCta).toHaveAttribute('aria-label', 'Solicitar servicio técnico por WhatsApp');
    await expect(heroCta).toHaveAttribute('title', 'Solicitar servicio técnico por WhatsApp');
    await expect(heroCta).not.toHaveAttribute('aria-busy', 'true');
    await expect(heroCta).not.toHaveAttribute('aria-disabled', 'true');

    // Trigger CTA click
    await heroCta.click();

    // Verify dynamic state transitions during redirection
    await expect(heroCta).toHaveAttribute('aria-busy', 'true');
    await expect(heroCta).toHaveAttribute('aria-disabled', 'true');
    await expect(heroCta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp...');
    await expect(page.locator('#hero-cta-announcement')).toHaveText('Redirigiendo a WhatsApp...');

    // Wait for the feedback timeout (3000ms) to verify attribute restoration
    await expect(heroCta).not.toHaveAttribute('aria-busy', 'true', { timeout: 4500 });
    await expect(heroCta).not.toHaveAttribute('aria-disabled', 'true');
    await expect(heroCta).toHaveAttribute('aria-label', 'Solicitar servicio técnico por WhatsApp');
    await expect(page.locator('#hero-cta-announcement')).toHaveText('');
  });
});
