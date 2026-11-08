import { test, expect } from '@playwright/test';

test.describe('Contacto Confirmation Card Micro-UX & Color Parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('ticket confirmation link has tactile active scale and group hover/focus icon color parity', async ({ page }) => {
    const confirmationLink = page.locator('#ticket-confirmation-link');
    await expect(confirmationLink).toHaveClass(/active:scale-95/);

    const arrowIcon = confirmationLink.locator('svg');
    await expect(arrowIcon).toHaveClass(/group-hover:text-navy/);
    await expect(arrowIcon).toHaveClass(/group-focus-visible:text-navy/);
  });

  test('copy ticket button has group/copy container and icon hover/focus color transition', async ({ page }) => {
    const copyTicketBtn = page.locator('#copy-ticket');
    await expect(copyTicketBtn).toHaveClass(/group\/copy/);

    const copyIcon = copyTicketBtn.locator('svg');
    await expect(copyIcon).toHaveClass(/group-hover\/copy:text-navy/);
    await expect(copyIcon).toHaveClass(/group-focus-visible\/copy:text-navy/);
  });
});
