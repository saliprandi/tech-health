import { test, expect } from '@playwright/test';

test.describe('Contacto Form Reset Button Icon Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('reset contact form button should feature group class and rotation micro-animation on SVG icon', async ({ page }) => {
    const resetBtn = page.locator('#reset-contact-form');
    await expect(resetBtn).toHaveClass(/group/);
    await expect(resetBtn).toHaveAttribute('title', 'Reiniciar formulario para enviar otra consulta');
    await expect(resetBtn).toHaveAttribute('aria-label', 'Reiniciar formulario para enviar otra consulta');

    const icon = resetBtn.locator('svg');
    await expect(icon).toBeAttached();
    await expect(icon).toHaveClass(/group-hover:text-navy/);
    await expect(icon).toHaveClass(/group-focus-visible:text-navy/);
    await expect(icon).toHaveClass(/group-hover:rotate-180/);
    await expect(icon).toHaveClass(/group-focus-visible:rotate-180/);
    await expect(icon).toHaveClass(/transition-all/);
  });
});
