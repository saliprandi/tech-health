import { test, expect } from '@playwright/test';

test.describe('Hero CTA Tooltips & Redirection ARIA Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render native title tooltips on primary and secondary hero CTA buttons', async ({ page }) => {
    const primaryBtn = page.locator('#hero-cta');
    const secondaryBtn = page.locator('a[href="#servicios"].btn-secondary');

    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toHaveAttribute('title', 'Solicitar servicio por WhatsApp');

    await expect(secondaryBtn).toBeVisible();
    await expect(secondaryBtn).toHaveAttribute('title', 'Ver lista de servicios');
  });

  test('should set aria-busy and aria-disabled during primary CTA redirection', async ({ page }) => {
    const primaryBtn = page.locator('#hero-cta');

    await expect(primaryBtn).not.toHaveAttribute('aria-busy');
    await expect(primaryBtn).not.toHaveAttribute('aria-disabled');

    await primaryBtn.click();

    await expect(primaryBtn).toHaveAttribute('aria-busy', 'true');
    await expect(primaryBtn).toHaveAttribute('aria-disabled', 'true');
    await expect(primaryBtn).toContainText('Redirigiendo...');
  });
});
