import { test, expect } from '@playwright/test';

test.describe('Nosotros Section UX Enhancements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should render team member cards and value cards with micro-UX hover/focus support', async ({ page }) => {
    const nosotrosSection = page.locator('#nosotros');
    await expect(nosotrosSection).toBeVisible();

    // Verify team section header and team cards
    const equipoHeading = nosotrosSection.locator('h3', { hasText: 'Nuestro Equipo' });
    await expect(equipoHeading).toBeVisible();

    const teamCards = nosotrosSection.locator('div.group:has(span.font-heading)');
    const count = await teamCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify avatar scaling classes exist
    const avatar = teamCards.first().locator('div').first();
    await expect(avatar).toHaveClass(/group-hover:scale-110/);
    await expect(avatar).toHaveClass(/group-focus-within:scale-110/);

    // Verify value cards
    const valueCards = nosotrosSection.locator('div.group:has(h4:has-text("Precisión técnica")), div.group:has(h4:has-text("Compromiso con la salud")), div.group:has(h4:has-text("Atención personalizada"))');
    await expect(valueCards).toHaveCount(3);

    const firstValueCard = valueCards.first();
    await expect(firstValueCard).toHaveClass(/hover:shadow-card-hover/);
    await expect(firstValueCard).toHaveClass(/focus-within:shadow-card-hover/);
    await expect(firstValueCard).toHaveClass(/hover:border-blue\/20/);

    const numberBadge = firstValueCard.locator('div', { hasText: '01' });
    await expect(numberBadge).toHaveClass(/group-hover:text-blue\/20/);
    await expect(numberBadge).toHaveClass(/group-focus-within:text-blue\/20/);
  });
});
