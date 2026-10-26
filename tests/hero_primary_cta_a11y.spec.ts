import { test, expect } from '@playwright/test';

test.describe('Hero Primary and Secondary CTA Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render primary and secondary CTA buttons with explicit aria-label attributes', async ({ page }) => {
    const primaryBtn = page.locator('#hero-cta');
    const secondaryBtn = page.locator('a[href="#servicios"].btn-secondary');

    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toHaveAttribute('aria-label', 'Solicitar servicio técnico por WhatsApp');

    await expect(secondaryBtn).toBeVisible();
    await expect(secondaryBtn).toHaveAttribute('aria-label', 'Ver catálogo de servicios');
  });

  test('should dynamically update aria-label to Redirigiendo a WhatsApp on primary CTA click', async ({ page }) => {
    const primaryBtn = page.locator('#hero-cta');

    await expect(primaryBtn).toHaveAttribute('aria-label', 'Solicitar servicio técnico por WhatsApp');

    await primaryBtn.click();

    await expect(primaryBtn).toHaveAttribute('aria-label', 'Redirigiendo a WhatsApp');
    await expect(primaryBtn).toHaveAttribute('aria-busy', 'true');
    await expect(primaryBtn).toHaveAttribute('aria-disabled', 'true');
  });
});
