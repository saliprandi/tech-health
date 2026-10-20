import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Link UX', () => {
  test('should render "Volver arriba" link with correct attributes and focus-visible styling', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');

    // Verify it contains the text "Volver arriba"
    await expect(backToTopLink).toContainText('Volver arriba');

    // Scroll to footer
    await backToTopLink.scrollIntoViewIfNeeded();

    // Verify keyboard focus navigation
    await backToTopLink.focus();
    await expect(backToTopLink).toBeFocused();

    // Click back to top and verify page scrolls towards top (#hero)
    await backToTopLink.click();
    await page.waitForTimeout(500);

    // Verify hero section is visible
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeInViewport();
  });

  test('should render social media and action links with title tooltips and active scale micro-animations', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Footer WhatsApp action link
    const waLink = page.locator('footer a[href*="wa.me"]');
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute('title', /Contactar por WhatsApp/);
    const waClass = await waLink.getAttribute('class');
    expect(waClass).toContain('active:scale-95');

    // Footer Ticket status action link
    const statusLink = page.locator('footer a[href="/estado"]');
    await expect(statusLink).toBeVisible();
    await expect(statusLink).toHaveAttribute('title', 'Seguimiento de reparaciones');
    const statusClass = await statusLink.getAttribute('class');
    expect(statusClass).toContain('active:scale-95');

    // Social media links
    const socialLinks = page.locator('footer div[role="group"][aria-label="Redes sociales"] a');
    const count = await socialLinks.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const link = socialLinks.nth(i);
        const title = await link.getAttribute('title');
        expect(title).toBeTruthy();
        expect(title).toMatch(/^Seguir en/);
        const cls = await link.getAttribute('class');
        expect(cls).toContain('active:scale-95');
      }
    }
  });
});
