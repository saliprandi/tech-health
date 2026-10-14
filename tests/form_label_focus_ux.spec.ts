import { test, expect } from '@playwright/test';

test.describe('Form Label Focus Micro-UX', () => {
  test('Contacto form fields have group/field container and focus-within label styling', async ({ page }) => {
    await page.goto('/');

    const nameInput = page.locator('#f-nombre');
    await expect(nameInput).toBeVisible();

    const nameContainer = page.locator('form#contact-form div.group\\/field').filter({ has: nameInput });
    await expect(nameContainer).toBeVisible();

    const nameLabel = nameContainer.locator('label[for="f-nombre"]');
    await expect(nameLabel).toHaveClass(/group-focus-within\/field:text-blue-light/);

    const phoneInput = page.locator('#f-tel');
    const phoneContainer = page.locator('form#contact-form div.group\\/field').filter({ has: phoneInput });
    const phoneLabel = phoneContainer.locator('label[for="f-tel"]');
    await expect(phoneLabel).toHaveClass(/group-focus-within\/field:text-blue-light/);

    const serviceSelect = page.locator('#f-servicio');
    const serviceContainer = page.locator('form#contact-form div.group\\/field').filter({ has: serviceSelect });
    const serviceLabel = serviceContainer.locator('label[for="f-servicio"]');
    await expect(serviceLabel).toHaveClass(/group-focus-within\/field:text-blue-light/);

    const descTextarea = page.locator('#f-desc');
    const descContainer = page.locator('form#contact-form div.group\\/field').filter({ has: descTextarea });
    const descLabel = descContainer.locator('label[for="f-desc"]');
    await expect(descLabel).toHaveClass(/group-focus-within\/field:text-blue-light/);
  });

  test('Estado ticket search form field has group/field container and focus-within label styling', async ({ page }) => {
    await page.goto('/estado');

    const ticketInput = page.locator('#ticket-input');
    await expect(ticketInput).toBeVisible();

    const ticketContainer = page.locator('form#estado-form div.group\\/field').filter({ has: ticketInput });
    await expect(ticketContainer).toBeVisible();

    const ticketLabel = ticketContainer.locator('label[for="ticket-input"]');
    await expect(ticketLabel).toHaveClass(/group-focus-within\/field:text-blue-light/);
  });
});
