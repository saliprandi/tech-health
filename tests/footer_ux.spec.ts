import { test, expect } from '@playwright/test';

test('Verify Footer UX and Contacto structural integrity', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // 1. Verify Footer interactive links
  const footer = page.locator('footer');

  // Address link
  const addressLink = footer.getByLabel(/Ver ubicación en Google Maps/);
  await expect(addressLink).toBeVisible();
  await expect(addressLink).toHaveAttribute('href', /google\.com/);

  // WhatsApp link
  const waLink = footer.getByLabel(/Contactar por WhatsApp/);
  await expect(waLink).toBeVisible();
  await expect(waLink).toHaveAttribute('href', /wa\.me/);

  // 2. Verify Contacto structural integrity (No duplicate labels/inputs)
  // Check for "Nombre completo" labels - should only be one visible for each input
  const nameLabels = page.locator('label[for="f-nombre"]');
  await expect(nameLabels).toHaveCount(1);

  const telLabels = page.locator('label[for="f-tel"]');
  await expect(telLabels).toHaveCount(1);

  const telInputs = page.locator('input[id="f-tel"]');
  await expect(telInputs).toHaveCount(1);

  // Take screenshots for verification
  const contacto = page.locator('#contacto');
  await contacto.scrollIntoViewIfNeeded();
  await expect(contacto).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/contacto_structure.png', fullPage: true });

  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
  await page.screenshot({ path: '/home/jules/verification/footer_ux.png' });
});
