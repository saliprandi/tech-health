import { test, expect } from '@playwright/test';

test('all target="_blank" links should have rel="noopener noreferrer"', async ({ page }) => {
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  // Static links
  const staticLinks = page.locator('a[target="_blank"]');
  const count = await staticLinks.count();
  console.log(`Found ${count} static links`);
  for (let i = 0; i < count; i++) {
    const rel = await staticLinks.nth(i).getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }

  // Dynamic link in modal
  // Click first service card
  const serviceCard = page.locator('.service-card').first();
  await serviceCard.scrollIntoViewIfNeeded();
  await serviceCard.click();

  // Wait for modal and link
  const modalCta = page.locator('#modal-cta');
  await expect(modalCta).toBeVisible({ timeout: 10000 });

  const relModal = await modalCta.getAttribute('rel');
  expect(relModal).toContain('noopener');
  expect(relModal).toContain('noreferrer');
});
