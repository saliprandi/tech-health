import { test, expect } from '@playwright/test';

test.describe('Emergencia CTA Busy & Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('emergencia CTA includes initial aria-label and updates aria-busy, aria-disabled, and aria-label upon click', async ({ page }) => {
    const cta = page.locator('#emergencia-cta');
    await expect(cta).toBeVisible();

    // Verify initial accessibility attributes
    await expect(cta).toHaveAttribute('aria-label', 'Solicitar atención de emergencia por WhatsApp');
    await expect(cta).toHaveAttribute('title', 'Solicitar atención de emergencia por WhatsApp');
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
