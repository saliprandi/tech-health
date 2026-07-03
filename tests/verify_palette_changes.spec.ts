import { test, expect } from '@playwright/test';

test.describe('Verification of Contacto and Marcas UX', () => {
  test.beforeEach(async ({ context, page }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Mock clipboard before navigation
    await page.addInitScript(() => {
      (window as any)._lastCopiedText = undefined;
      const clipboard = {
        writeText: async (text) => {
          (window as any)._lastCopiedText = text;
          return Promise.resolve();
        }
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: clipboard,
        writable: true,
        configurable: true
      });
    });

    await page.goto('http://localhost:4321');
  });

  test('Contacto: character counter works and changes color', async ({ page }) => {
    const textarea = page.locator('#f-desc');
    const counter = page.locator('#char-counter');

    await textarea.fill('a'.repeat(399));
    await expect(counter).toHaveText('399 / 500');
    await expect(counter).toHaveClass(/text-white\/40/);

    await textarea.fill('a'.repeat(400));
    await expect(counter).toHaveText('400 / 500');
    await expect(counter).toHaveClass(/text-amber-400/);

    await textarea.fill('a'.repeat(450));
    await expect(counter).toHaveText('450 / 500');
    await expect(counter).toHaveClass(/text-red-500/);
  });

  test('Contacto: copy buttons work', async ({ page }) => {
    const copyPhoneBtn = page.locator('#copy-phone');
    const phoneText = await page.locator('#phone-text').textContent();
    const sanitizedPhone = phoneText?.replace(/\s/g, '') || '';

    await copyPhoneBtn.scrollIntoViewIfNeeded();
    await copyPhoneBtn.click();

    await expect(page.locator('#copy-phone-text')).toHaveText('¡Copiado!', { timeout: 10000 });

    const lastCopied = await page.evaluate(() => (window as any)._lastCopiedText);
    expect(lastCopied).toBe(sanitizedPhone);

    const announcement = page.locator('#copy-announcement');
    await expect(announcement).toHaveText('Teléfono copiado');
  });

  test('Marcas: has semantic list structure', async ({ page }) => {
    const list = page.locator('#marcas ul');
    await expect(list).toHaveAttribute('role', 'list');

    const items = list.locator('li');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveAttribute('aria-label', /Especialistas en/);
    }
  });
});
