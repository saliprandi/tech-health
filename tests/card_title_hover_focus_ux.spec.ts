import { test, expect } from '@playwright/test';

test.describe('Section Card Heading Hover and Focus Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('Servicios card headings feature group hover/focus color transition classes', async ({ page }) => {
    const serviceCards = page.locator('#servicios .service-card');
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const heading = serviceCards.nth(i).locator('h3');
      const classList = await heading.getAttribute('class');
      expect(classList).toContain('group-hover:text-blue');
      expect(classList).toContain('group-focus-visible:text-blue');
      expect(classList).toContain('transition-colors');
    }
  });

  test('Proceso step card headings feature group hover/focus color transition classes', async ({ page }) => {
    const procesoCards = page.locator('#proceso ol > li');
    const count = await procesoCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const heading = procesoCards.nth(i).locator('h3');
      const classList = await heading.getAttribute('class');
      expect(classList).toContain('group-hover:text-blue');
      expect(classList).toContain('group-focus-within:text-blue');
      expect(classList).toContain('transition-colors');
    }
  });

  test('Diferenciales card headings feature group hover/focus color transition classes', async ({ page }) => {
    const diferencialCards = page.locator('#diferenciales ul > li');
    const count = await diferencialCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const heading = diferencialCards.nth(i).locator('h3');
      const classList = await heading.getAttribute('class');
      expect(classList).toContain('group-hover:text-blue');
      expect(classList).toContain('group-focus-within:text-blue');
      expect(classList).toContain('transition-colors');
    }
  });

  test('Nosotros team member and value card headings feature group hover/focus color transition classes', async ({ page }) => {
    const teamCards = page.locator('#nosotros ul[aria-label="Integrantes de nuestro equipo"] > li');
    const teamCount = await teamCards.count();
    expect(teamCount).toBeGreaterThan(0);

    for (let i = 0; i < teamCount; i++) {
      const heading = teamCards.nth(i).locator('h4');
      const classList = await heading.getAttribute('class');
      expect(classList).toContain('group-hover:text-blue');
      expect(classList).toContain('group-focus-within:text-blue');
      expect(classList).toContain('transition-colors');
    }

    const valueCards = page.locator('#nosotros ul[aria-label="Valores fundamentales de la empresa"] > li');
    const valueCount = await valueCards.count();
    expect(valueCount).toBeGreaterThan(0);

    for (let i = 0; i < valueCount; i++) {
      const heading = valueCards.nth(i).locator('h4');
      const classList = await heading.getAttribute('class');
      expect(classList).toContain('group-hover:text-blue');
      expect(classList).toContain('group-focus-within:text-blue');
      expect(classList).toContain('transition-colors');
    }
  });
});
