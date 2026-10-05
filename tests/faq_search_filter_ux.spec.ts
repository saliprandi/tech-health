import { test, expect } from '@playwright/test';

test.describe('FAQ Search Filter Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should filter FAQ items dynamically by query text', async ({ page }) => {
    const searchInput = page.locator('#faq-search-input');
    const clearBtn = page.locator('#clear-faq-search');
    const faqItems = page.locator('.faq-item');
    const liveCounter = page.locator('#faq-search-counter');

    await expect(searchInput).toBeVisible();
    await expect(clearBtn).toBeHidden();

    const initialCount = await faqItems.count();
    expect(initialCount).toBeGreaterThan(0);

    // Type a specific search query matching one or few FAQs
    await searchInput.fill('garantía');

    // Clear button should become visible
    await expect(clearBtn).toBeVisible();

    // Check visible items count
    const visibleItems = page.locator('.faq-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(initialCount);

    // Live counter announcement check
    await expect(liveCounter).toHaveText(new RegExp(`${count} pregunta`));
  });

  test('should show empty state when query matches no FAQs and reset on button click', async ({ page }) => {
    const searchInput = page.locator('#faq-search-input');
    const emptyState = page.locator('#faq-empty-state');
    const resetBtn = page.locator('#faq-reset-btn');
    const visibleItems = page.locator('.faq-item:not(.hidden)');

    await searchInput.fill('xyznonexistentquery123');

    // All FAQ items hidden, empty state visible
    await expect(visibleItems).toHaveCount(0);
    await expect(emptyState).toBeVisible();

    // Click reset button
    await resetBtn.click();

    // Input cleared, empty state hidden, FAQs restored
    await expect(searchInput).toHaveValue('');
    await expect(emptyState).toBeHidden();
    expect(await visibleItems.count()).toBeGreaterThan(0);
  });

  test('should clear search input on Escape key press and restore all FAQs', async ({ page }) => {
    const searchInput = page.locator('#faq-search-input');
    const visibleItems = page.locator('.faq-item:not(.hidden)');
    const initialCount = await visibleItems.count();

    await searchInput.fill('mantenimiento');
    expect(await visibleItems.count()).toBeLessThan(initialCount);

    await searchInput.press('Escape');

    await expect(searchInput).toHaveValue('');
    expect(await visibleItems.count()).toBe(initialCount);
  });
});
