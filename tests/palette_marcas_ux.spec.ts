import { test, expect } from '@playwright/test';

test('Marcas section should use semantic list', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const marcasList = page.locator('#marcas ul');
  await expect(marcasList).toBeVisible();
  await expect(marcasList).toHaveAttribute('role', 'list');

  const listItems = marcasList.locator('li');
  const count = await listItems.count();
  expect(count).toBeGreaterThan(0);

  // Verify ARIA labels
  const firstItem = listItems.first();
  await expect(firstItem).toHaveAttribute('aria-label', /Especialistas en/);
});
