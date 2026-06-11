import { test, expect } from '@playwright/test';

test('reading progress bar works as expected', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const progressBar = page.locator('#reading-progress');

  // Initially, it should be scaleX(0)
  await expect(progressBar).toBeAttached();
  const initialTransform = await progressBar.evaluate((el) => window.getComputedStyle(el).transform);

  // Scroll down
  await page.evaluate(() => window.scrollTo(0, 500));

  // Wait for transition or scroll event
  await page.waitForTimeout(500);

  const scrolledTransform = await progressBar.evaluate((el) => window.getComputedStyle(el).transform);

  expect(scrolledTransform).not.toBe(initialTransform);
  expect(scrolledTransform).toContain('matrix');

  // Extract scaleX from matrix(a, b, c, d, e, f)
  const matrixValues = scrolledTransform.match(/matrix\((.+)\)/)?.[1].split(', ');
  if (matrixValues) {
    const scaleX = parseFloat(matrixValues[0]);
    expect(scaleX).toBeGreaterThan(0);
  }
});
