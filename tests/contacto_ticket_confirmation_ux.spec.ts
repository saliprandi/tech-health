import { test, expect } from '@playwright/test';

test.describe('Contacto Ticket Confirmation & Nav CTA Micro-UX', () => {
  test('ticket confirmation link has group hover/focus arrow translation classes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const link = page.locator('#ticket-confirmation-link');
    const svg = link.locator('svg');

    await expect(link).toHaveClass(/group/);
    await expect(svg).toHaveClass(/group-hover:translate-x-0\.5/);
    await expect(svg).toHaveClass(/group-focus-visible:translate-x-0\.5/);
  });

  test('header CTA button has active scale styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const navCta = page.locator('#nav-cta');
    await expect(navCta).toHaveClass(/active:scale-\[0\.98\]/);
  });

  test('footer back-to-top link has focus-visible ring and group translation styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');
  });
});
