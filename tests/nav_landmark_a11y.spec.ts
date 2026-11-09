import { test, expect } from '@playwright/test';

test.describe('Landmark & ARIA Accessibility UX', () => {
  test('should have explicit aria-label on main navigation landmark', async ({ page }) => {
    await page.goto('http://localhost:4321');
    const mainNav = page.locator('nav[aria-label="Navegación principal"]');
    await expect(mainNav).toBeVisible();

    const mobileMenuNav = page.locator('#mobile-menu');
    await expect(mobileMenuNav).toHaveAttribute('aria-label', 'Menú móvil');
  });

  test('should have explicit aria-label on ticket status navigation landmark', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');
    const statusNav = page.locator('nav[aria-label="Navegación de consulta"]');
    await expect(statusNav).toBeVisible();
  });

  test('should have accessible aria-labels on equipment list', async ({ page }) => {
    await page.goto('http://localhost:4321');
    const heroList = page.locator('ul[aria-label="Equipos destacados que atendemos"]');
    await expect(heroList).toBeVisible();
  });
});
