import { test, expect } from '@playwright/test';

test.describe('FAQ Search Enter Key Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should expand and focus single matching FAQ when pressing Enter in search input', async ({ page }) => {
    const searchInput = page.locator('#faq-search-input');
    await expect(searchInput).toBeVisible();

    // Type query matching exactly 1 FAQ
    await searchInput.fill('garantía');

    const visibleItems = page.locator('.faq-item:not(.hidden)');
    await expect(visibleItems).toHaveCount(1);

    const matchingTrigger = visibleItems.first().locator('.faq-trigger');
    await expect(matchingTrigger).toHaveAttribute('aria-expanded', 'false');

    // Press Enter in search input
    await searchInput.press('Enter');

    // Matching trigger should now be expanded and focused
    await expect(matchingTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(matchingTrigger).toBeFocused();
  });

  test('should focus first matching FAQ trigger when pressing Enter with multiple search results', async ({ page }) => {
    const searchInput = page.locator('#faq-search-input');
    await expect(searchInput).toBeVisible();

    // Type query matching multiple FAQs
    await searchInput.fill('equipo');

    const visibleItems = page.locator('.faq-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(1);

    const firstTrigger = visibleItems.first().locator('.faq-trigger');

    // Press Enter in search input
    await searchInput.press('Enter');

    // First matching trigger should receive focus
    await expect(firstTrigger).toBeFocused();
  });
});
