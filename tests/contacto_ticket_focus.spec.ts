import { test, expect } from '@playwright/test';

test.describe('Contacto Ticket Focus and Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept n8n webhook request to mock a successful ticket creation response
    await page.route('**/webhook/techhealth-solicitud', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ticket_number: 'TH-2026-9999',
        }),
      });
    });

    await page.goto('http://localhost:4321/');
  });

  test('transfers focus to copy-ticket button and announces ticket creation when ticket is returned', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const phoneInput = page.locator('#f-tel');
    const submitBtn = page.locator('#f-submit');
    const copyTicketBtn = page.locator('#copy-ticket');
    const redirectAnnouncement = page.locator('#redirect-announcement');
    const ticketConfirmation = page.locator('#ticket-confirmation');
    const ticketNumEl = page.locator('#ticket-confirmation-number');

    await nameInput.fill('María González');
    await phoneInput.fill('+543819876543');

    await submitBtn.click();

    // Expect ticket confirmation banner to be visible with the mocked ticket number
    await expect(ticketConfirmation).toBeVisible();
    await expect(ticketNumEl).toHaveText('TH-2026-9999');

    // Expect focus to transfer to the copy ticket button
    await expect(copyTicketBtn).toBeFocused();

    // Expect live region announcement to inform screen reader users
    await expect(redirectAnnouncement).toContainText('TH-2026-9999');
  });
});
