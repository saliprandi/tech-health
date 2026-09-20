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

    // Normal state class (text-white/40)
    await expect(counter).toHaveClass(/text-white\/40/);

    // Type some text
    await textarea.fill('Testing character counter');
    await expect(counter).toHaveText('25 / 500');

    // Type text near limit (450 characters)
    const longText = 'A'.repeat(450);
    await textarea.fill(longText);
    await expect(counter).toHaveText('450 / 500');

    // Verify warning class (text-amber-400)
    await expect(counter).toHaveClass(/text-amber-400/);

    // Back to normal
    await textarea.fill('Short text');
    await expect(counter).toHaveText('10 / 500');
    await expect(counter).toHaveClass(/text-white\/40/);
  });
});
