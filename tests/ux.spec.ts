import { test, expect } from '@playwright/test';

test('reading progress bar should exist and update on scroll', async ({ page }) => {
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const progressBar = page.locator('#scroll-progress');
  await expect(progressBar).toBeAttached();

  // Initial transform should be scaleX(0)
  let transform = await progressBar.evaluate(el => el.style.transform);
  expect(transform).toContain('scaleX(0)');

  // Scroll to middle
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight / 2);
  });

  // Wait for transition
  await page.waitForTimeout(500);

  transform = await progressBar.evaluate(el => el.style.transform);
  let scaleX = parseFloat(transform.match(/scaleX\(([^)]+)\)/)?.[1] || '0');
  expect(scaleX).toBeGreaterThan(0.4);
  expect(scaleX).toBeLessThan(0.6);

  // Scroll to bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });

  await page.waitForTimeout(500);
  transform = await progressBar.evaluate(el => el.style.transform);
  scaleX = parseFloat(transform.match(/scaleX\(([^)]+)\)/)?.[1] || '0');
  expect(scaleX).toBeGreaterThan(0.95);
});
