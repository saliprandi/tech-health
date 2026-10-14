import { test, expect } from '@playwright/test';

test.describe('Section Scroll Margin UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render main navigation target sections with scroll-mt-16 class to prevent fixed header overlap', async ({ page }) => {
    const targetSections = ['servicios', 'proceso', 'equipos', 'nosotros', 'contacto'];

    for (const sectionId of targetSections) {
      const section = page.locator(`section#${sectionId}`);
      await expect(section).toBeAttached();
      await expect(section).toHaveClass(/scroll-mt-16/);
    }
  });
});
