import { test, expect } from '@playwright/test';

test.describe('Section Scroll Margin UX', () => {
  test('landing page sections with IDs should feature scroll-mt-20 utility class', async ({ page }) => {
    await page.goto('http://localhost:4321');

    const sectionIds = [
      'servicios',
      'proceso',
      'equipos',
      'diferenciales',
      'nosotros',
      'contacto',
      'faq',
      'marcas',
      'emergencia',
    ];

    for (const id of sectionIds) {
      const section = page.locator(`section#${id}`);
      await expect(section).toBeAttached();
      const classList = await section.getAttribute('class');
      expect(classList).toContain('scroll-mt-20');
    }
  });
});
