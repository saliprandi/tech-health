import { test, expect } from '@playwright/test';

test('Brands section accessibility and UX', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const brandsSection = page.locator('#marcas');
  await expect(brandsSection).toBeVisible();

  const brandList = brandsSection.locator('ul[role="list"]');
  await expect(brandList).toBeVisible();

  const brandItems = brandList.locator('li');
  const count = await brandItems.count();
  expect(count).toBeGreaterThan(0);

  // Check first item for accessibility attributes
  const firstBrand = brandItems.first();
  // li elements have an implicit role of listitem when inside a ul,
  // but toHaveAttribute checks for the explicit attribute.
  await expect(firstBrand).toHaveAttribute('tabindex', '0');
  await expect(firstBrand).toHaveAttribute('aria-label', /Especialistas en/);

  // Verify focus state
  await firstBrand.focus();
  await expect(firstBrand).toBeFocused();

  // Check scaling on hover/focus if possible via computed style
  const span = firstBrand.locator('span');

  // Before hover/focus
  await page.mouse.move(0, 0);
  await page.keyboard.press('Escape'); // Blur everything

  // Hover and check transform
  await firstBrand.hover();
  await page.waitForTimeout(600); // Wait for transition
  const hoverTransform = await span.evaluate((el) => window.getComputedStyle(el).transform);
  expect(hoverTransform).not.toBe('none');

  // Focus and check transform
  await page.mouse.move(0, 0);
  await firstBrand.focus();
  await page.waitForTimeout(600);
  const focusTransform = await span.evaluate((el) => window.getComputedStyle(el).transform);
  expect(focusTransform).not.toBe('none');
});
