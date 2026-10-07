import { test, expect } from '@playwright/test';

test.describe('Contacto UX Enhancements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
    // Scroll to contact section to ensure it's visible/initialized
    await page.locator('#contacto').scrollIntoViewIfNeeded();
  });

  test('should display required indicators for name and phone fields', async ({ page }) => {
    const nameLabel = page.locator('label[for="f-nombre"]');
    const phoneLabel = page.locator('label[for="f-tel"]');

    await expect(nameLabel).toContainText('*');
    await expect(phoneLabel).toContainText('*');

    // Verify indicator color (text-blue-light is #4A90D9)
    const nameAsterisk = nameLabel.locator('span');
    const color = await nameAsterisk.evaluate((el) => getComputedStyle(el).color);
    // rgb(74, 144, 217) is approximately #4A90D9
    expect(color).toBe('rgb(74, 144, 217)');
  });

  test('should update character counter and change color at threshold', async ({ page }) => {
    const textarea = page.locator('#f-desc');
    const counter = page.locator('#char-counter');

    // Initial state
    await expect(counter).toHaveText('0 / 500');

    // Normal state color (text-white/40 is rgba(255, 255, 255, 0.4))
    let color = await counter.evaluate((el) => getComputedStyle(el).color);
    // Note: getComputedStyle might return rgba or rgb depending on browser
    expect(color.replace(/ /g, '')).toContain('rgba(255,255,255,0.4)');

    // Type some text
    await textarea.fill('Testing character counter');
    await expect(counter).toHaveText('25 / 500');

    // Type text near limit (450 characters)
    const longText = 'A'.repeat(450);
    await textarea.fill(longText);
    await expect(counter).toHaveText('450 / 500');

    // Verify warning color class
    await expect(counter).toHaveClass(/text-amber-400/);

    // Back to normal
    await textarea.fill('Short text');
    await expect(counter).toHaveText('10 / 500');
    await expect(counter).toHaveClass(/text-white\/40/);
  });

  test('should toggle aria-invalid on invalid submission and clear on field input', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const submitBtn = page.locator('#f-submit');

    // Submit empty form to trigger validation
    await submitBtn.click();

    // Verify aria-invalid is set on required field
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');

    // Type input to clear aria-invalid
    await nameInput.fill('Juan Perez');
    await expect(nameInput).not.toHaveAttribute('aria-invalid');
  });

  test('should have focus-within classes on contact info cards for keyboard focus parity', async ({ page }) => {
    const waCard = page.locator('.group.relative:has(#phone-text)');
    const labCard = page.locator('.group.relative:has(#address-text)');
    const horarioCard = page.locator('#horario-card');

    await expect(waCard).toHaveClass(/focus-within:bg-off-white/);
    await expect(waCard).toHaveClass(/focus-within:border-border/);

    await expect(labCard).toHaveClass(/focus-within:bg-off-white/);
    await expect(labCard).toHaveClass(/focus-within:border-border/);

    await expect(horarioCard).toHaveClass(/focus-within:bg-off-white/);
    await expect(horarioCard).toHaveClass(/focus-within:border-border/);
  });

  test('should support Ctrl + Enter keyboard submission and include shortcut hint description', async ({ page }) => {
    const textarea = page.locator('#f-desc');
    const shortcutHint = page.locator('#f-desc-shortcut');
    const nameInput = page.locator('#f-nombre');

    await expect(shortcutHint).toContainText('Ctrl + Enter para enviar');
    await expect(textarea).toHaveAttribute('aria-describedby', /f-desc-shortcut/);

    await textarea.focus();
    await textarea.press('Control+Enter');

    // Submitting form without required fields triggers validation setting aria-invalid
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('should clear contact input field and announce to screen reader on Escape key press', async ({ page }) => {
    const nameInput = page.locator('#f-nombre');
    const announcement = page.locator('#copy-announcement');

    await nameInput.focus();
    await nameInput.fill('Juan Perez');
    await expect(nameInput).toHaveValue('Juan Perez');

    await nameInput.press('Escape');

    await expect(nameInput).toHaveValue('');
    await expect(nameInput).not.toHaveAttribute('aria-invalid');
    await expect(announcement).toHaveText('Campo de texto limpiado');
  });
});
