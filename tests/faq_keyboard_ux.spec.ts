import { test, expect } from '@playwright/test';

test.describe('FAQ Accordion Keyboard Navigation & ARIA Accessibility UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should navigate FAQ triggers using ArrowDown, ArrowUp, Home, and End keys', async ({ page }) => {
    const triggers = page.locator('.faq-trigger');
    await expect(triggers.first()).toBeVisible();
    const count = await triggers.count();
    expect(count).toBeGreaterThan(1);

    // Focus the first trigger
    await triggers.first().focus();
    await expect(triggers.first()).toBeFocused();

    // Press ArrowDown -> should focus second trigger
    await page.keyboard.press('ArrowDown');
    await expect(triggers.nth(1)).toBeFocused();

    // Press ArrowUp -> should focus back to first trigger
    await page.keyboard.press('ArrowUp');
    await expect(triggers.first()).toBeFocused();

    // Press End -> should focus the last trigger
    await page.keyboard.press('End');
    await expect(triggers.nth(count - 1)).toBeFocused();

    // Press ArrowDown on last trigger -> should wrap to first trigger
    await page.keyboard.press('ArrowDown');
    await expect(triggers.first()).toBeFocused();

    // Press Home -> should focus the first trigger
    await page.keyboard.press('Home');
    await expect(triggers.first()).toBeFocused();

    // Press ArrowUp on first trigger -> should wrap to last trigger
    await page.keyboard.press('ArrowUp');
    await expect(triggers.nth(count - 1)).toBeFocused();
  });

  test('should have descriptive aria-label on Equipos grid list', async ({ page }) => {
    const list = page.locator('#equipos ul[role="list"]');
    await expect(list).toBeVisible();
    await expect(list).toHaveAttribute('aria-label', 'Equipos médicos que atendemos');
  });
});
