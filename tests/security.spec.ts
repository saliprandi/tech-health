
import { test, expect } from '@playwright/test';

test('all target="_blank" links should have rel="noopener noreferrer"', async ({ page }) => {
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const staticLinks = page.locator('a[target="_blank"]');
  const count = await staticLinks.count();
  console.log(`Found ${count} links with target="_blank"`);

  for (let i = 0; i < count; i++) {
    const href = await staticLinks.nth(i).getAttribute('href');
    const rel = await staticLinks.nth(i).getAttribute('rel');

    // Skip dev-related links (Astro dev toolbar, etc.)
    if (href?.includes('astro.build') || href?.includes('github.com/withastro')) {
      console.log(`Skipping dev-related link: ${href}`);
      continue;
    }

    console.log(`Checking link ${i}: href=${href}, rel=${rel}`);
    expect(rel, `Link to ${href} is missing rel="noopener noreferrer"`).not.toBeNull();
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }

  // Check modal links
  const serviceCards = page.locator('.service-card');
  const cardCount = await serviceCards.count();
  if (cardCount > 0) {
    await serviceCards.first().click();
    const modalCta = page.locator('#modal-cta');
    await expect(modalCta).toBeVisible();
    const rel = await modalCta.getAttribute('rel');
    const href = await modalCta.getAttribute('href');
    console.log(`Modal CTA: href=${href}, rel=${rel}`);
    expect(rel).not.toBeNull();
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }
});
