import { test, expect } from '@playwright/test';

test.describe('Footer Back to Top Link UX', () => {
  test('should render "Volver arriba" link with correct attributes, focus-visible styling, tooltips, active scale, and aria-live announcements', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const backToTopLink = page.locator('footer a[href="#hero"]');
    await expect(backToTopLink).toBeVisible();
    await expect(backToTopLink).toHaveAttribute('aria-label', 'Volver al inicio de la página');
    await expect(backToTopLink).toHaveAttribute('title', 'Volver al inicio de la página');

    // Verify it contains active:scale-95 utility class
    await expect(backToTopLink).toHaveClass(/active:scale-95/);

    // Verify quick links and social links have title tooltips and active:scale-95
    const waLink = page.locator('footer a[href*="wa.me"]');
    await expect(waLink).toHaveAttribute('title', 'Contactar por WhatsApp');
    await expect(waLink).toHaveClass(/active:scale-95/);

    const estadoLink = page.locator('footer a[href="/estado"]');
    await expect(estadoLink).toHaveAttribute('title', 'Consultar seguimiento de reparaciones');
    await expect(estadoLink).toHaveClass(/active:scale-95/);

    // Verify it contains the text "Volver arriba"
    await expect(backToTopLink).toContainText('Volver arriba');

    // Scroll to footer
    await backToTopLink.scrollIntoViewIfNeeded();

    // Verify keyboard focus navigation
    await backToTopLink.focus();
    await expect(backToTopLink).toBeFocused();

    // Click back to top and verify page scrolls towards top (#hero) and updates aria-live announcement
    const announcement = page.locator('#footer-announcement');
    await backToTopLink.click();
    await expect(announcement).toHaveText('Desplazándose al inicio de la página');

    await page.waitForTimeout(500);

    // Verify hero section is visible
    const heroSection = page.locator('#hero');
    await expect(heroSection).toBeInViewport();
  });
});
