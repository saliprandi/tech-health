import { test, expect } from '@playwright/test';

test.describe('Contacto Copy Buttons Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should render copy buttons with active scale micro-animation feedback classes', async ({ page }) => {
    const copyPhone = page.locator('#copy-phone');
    const copyAddress = page.locator('#copy-address');
    const copyTicket = page.locator('#copy-ticket');

    await expect(copyPhone).toBeAttached();
    await expect(copyPhone).toHaveClass(/active:scale-95/);
    await expect(copyPhone).toHaveClass(/transition-all/);

    await expect(copyAddress).toBeAttached();
    await expect(copyAddress).toHaveClass(/active:scale-95/);
    await expect(copyAddress).toHaveClass(/transition-all/);

    await expect(copyTicket).toBeAttached();
    await expect(copyTicket).toHaveClass(/active:scale-95/);
    await expect(copyTicket).toHaveClass(/transition-all/);
  });
});
