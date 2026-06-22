import { test, expect } from '@playwright/test';

test.describe('Contacto Component Fix Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
    // Wait for the contact section to be visible
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('should have a single contact form and correctly functioning micro-UX', async ({ page }) => {
    // 1. Verify single form and elements (no duplication)
    const forms = page.locator('#contact-form');
    await expect(forms).toHaveCount(1);

    const submitBtns = page.locator('#f-submit');
    await expect(submitBtns).toHaveCount(1);

    const charCounters = page.locator('#char-counter');
    await expect(charCounters).toHaveCount(1);

    const statusBadges = page.locator('#status-badge');
    await expect(statusBadges).toHaveCount(1);

    // 2. Test Character Counter
    const textarea = page.locator('#f-desc');
    await textarea.fill('Hola, necesito mantenimiento para un monitor.');
    const counterText = await charCounters.textContent();
    expect(counterText).toContain('45 / 500');

    // 3. Test Business Hours Badge Visibility
    await expect(statusBadges).not.toHaveClass(/hidden/);
    const badgeText = await statusBadges.textContent();
    expect(['Abierto ahora', 'Cerrado', 'Abrirá pronto', 'Cerrará pronto']).toContain(badgeText?.trim());

    // 4. Test Clipboard Copy (Visual feedback only as clipboard API is tricky in some CI envs)
    // We check if the classes and text change as expected in the script
    const copyPhoneBtn = page.locator('#copy-phone');
    const copyPhoneText = page.locator('#copy-phone-text');

    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    await copyPhoneBtn.click();
    await expect(copyPhoneText).toHaveText('¡Copiado!');
    await expect(copyPhoneBtn).toHaveClass(/text-blue/);
    await expect(copyPhoneBtn).toHaveClass(/scale-110/);

    // Wait for restore
    await page.waitForTimeout(3000);
    await expect(copyPhoneText).toHaveText('Copiar');
    await expect(copyPhoneBtn).not.toHaveClass(/ text-blue /);
  });

  test('should show redirection feedback on form submit', async ({ page }) => {
    const submitBtn = page.locator('#f-submit');
    const submitBtnText = page.locator('#f-submit-text');

    // Fill required fields
    await page.locator('#f-nombre').fill('Test User');
    await page.locator('#f-tel').fill('123456789');
    await page.locator('#f-desc').fill('Test message');

    // We catch the navigation/redirection if possible or just check the button state
    // Since it opens in a new tab, we just check the UI feedback
    await submitBtn.click();

    await expect(submitBtnText).toHaveText('Redirigiendo...');
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toHaveClass(/opacity-70/);
  });

  test('screenshot capture for visual verification', async ({ page }) => {
    // FAQ Section
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'tests/screenshots/faq-section.png' });

    // Contact Section
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'tests/screenshots/contacto-section.png' });
  });
});
