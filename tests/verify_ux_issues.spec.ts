import { test, expect } from '@playwright/test';

test('verify nested interactive isolation in Contacto.astro', async ({ page, context }) => {
  await page.goto('http://localhost:4321/');

  // Find the copy button
  const copyBtn = page.locator('#copy-address');
  await expect(copyBtn).toBeVisible();

  // 1. Verify clicking "Copy" does NOT trigger Google Maps navigation
  // Listen for new pages being opened
  let newPageOpened = false;
  context.on('page', () => { newPageOpened = true; });

  await copyBtn.click();
  // Wait a bit to see if a page opens
  await page.waitForTimeout(1000);
  expect(newPageOpened).toBe(false);

  // 2. Verify clicking the background (card area) triggers Google Maps
  const addressBlock = page.locator('.group.relative:has(#address-text)');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    // Click at the top-left of the card where only the background link is
    addressBlock.click({ position: { x: 5, y: 5 } })
  ]);

  expect(newPage.url()).toContain('google.com/maps');
});
