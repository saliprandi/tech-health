import { test, expect } from '@playwright/test';

test.describe('Header Navigation Links Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('desktop navigation links have active scale styling and clean accessible text', async ({ page }) => {
    const desktopLinks = page.locator('ul.hidden.lg\\:flex .nav-link');
    const count = await desktopLinks.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const link = desktopLinks.nth(i);
      await expect(link).toHaveClass(/active:scale-95/);
    }
  });

  test('mobile navigation links have active scale styling', async ({ page }) => {
    const mobileLinks = page.locator('#mobile-menu .mobile-link');
    const count = await mobileLinks.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const link = mobileLinks.nth(i);
      await expect(link).toHaveClass(/active:scale-95/);
    }
  });

  test('navbar CTA button updates aria-label, aria-busy, and aria-disabled during redirection', async ({ page }) => {
    const cta = page.locator('#nav-cta');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('aria-label', 'Consultar por WhatsApp');
    await expect(cta).toHaveAttribute('title', 'Consultar por WhatsApp');

    // Click CTA and verify redirection state attributes
    await cta.click();
    await expect(cta).toHaveAttribute('aria-busy', 'true');
    await expect(cta).toHaveAttribute('aria-disabled', 'true');
    await expect(cta).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp...');
  });
});
