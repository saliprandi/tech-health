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

    // Normal state color (text-white/40)
    let color = await counter.evaluate((el) => getComputedStyle(el).color);
    // Use regex to account for slight rounding or browser differences in alpha
    expect(color.replace(/ /g, '')).toMatch(/rgba\(255,255,255,0\.(39|4|41)\)/);

    // Type some text
    await textarea.fill('Testing character counter');
    await expect(counter).toHaveText('25 / 500');

    // Warning state (400 characters)
    const warningText = 'A'.repeat(400);
    await textarea.fill(warningText);
    await expect(counter).toHaveText('400 / 500');
    color = await counter.evaluate((el) => getComputedStyle(el).color);
    // text-amber-400 is rgb(251, 191, 36)
    expect(color.replace(/ /g, '')).toBe('rgb(251,191,36)');

    // Critical state (450 characters)
    const longText = 'A'.repeat(450);
    await textarea.fill(longText);
    await expect(counter).toHaveText('450 / 500');

    // Verify critical color (text-red-500 is rgb(239, 68, 68))
    color = await counter.evaluate((el) => getComputedStyle(el).color);
    expect(color.replace(/ /g, '')).toBe('rgb(239,68,68)');

    // Back to normal
    await textarea.fill('Short text');
    await expect(counter).toHaveText('10 / 500');
    color = await counter.evaluate((el) => getComputedStyle(el).color);
    expect(color.replace(/ /g, '')).toContain('rgba(255,255,255,0.4)');
  });
});
