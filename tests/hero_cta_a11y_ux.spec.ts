import { test, expect } from '@playwright/test';

test.describe('Hero CTA Tooltips UX', () => {
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
});
