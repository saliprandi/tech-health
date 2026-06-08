import { test, expect } from '@playwright/test';

test('all target="_blank" links should have rel="noopener noreferrer"', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Static links
  const staticLinks = await page.locator('a[target="_blank"]');
  const count = await staticLinks.count();
  for (let i = 0; i < count; i++) {
    const rel = await staticLinks.nth(i).getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }

  // Dynamic link in modal
  // Click first service card
  await page.locator('.service-card').first().click();

  // Wait for modal and link
  const modalCta = page.locator('#modal-cta');
  await expect(modalCta).toBeVisible();

  const relModal = await modalCta.getAttribute('rel');
  expect(relModal).toContain('noopener');
  expect(relModal).toContain('noreferrer');
});
