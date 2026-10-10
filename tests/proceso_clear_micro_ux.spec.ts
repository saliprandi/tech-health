import { test, expect } from '@playwright/test';

test.describe('Proceso Ticket Search Clear Button Micro-UX & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('proceso clear button has native title tooltip and hover/active micro-animation classes', async ({ page }) => {
    const section = page.locator('#proceso');
    await section.scrollIntoViewIfNeeded();

    const input = page.locator('#proceso-ticket-input');
    const clearBtn = page.locator('#proceso-clear-ticket-input');

    await input.fill('TH-2026-8888');
    await expect(clearBtn).toBeVisible();

    // Verify native title tooltip attribute
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');

    // Verify hover and active scale micro-animation classes
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);
    await expect(clearBtn).toHaveClass(/transition-all/);
  });
});
