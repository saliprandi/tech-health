import { test, expect } from '@playwright/test';

test.describe('Clear Buttons & Mobile Menu Toggle Micro-UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('proceso clear button has native title tooltip and scale micro-animations', async ({ page }) => {
    const input = page.locator('#proceso-ticket-input');
    const clearBtn = page.locator('#proceso-clear-ticket-input');

    await input.fill('TH-2026-100');
    await expect(clearBtn).toBeVisible();
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);
  });

  test('faq search clear button has native title tooltip and scale micro-animations', async ({ page }) => {
    const input = page.locator('#faq-search-input');
    const clearBtn = page.locator('#clear-faq-search');

    await input.fill('Mantenimiento');
    await expect(clearBtn).toBeVisible();
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar búsqueda');
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);
  });

  test('mobile menu toggle button has initial title tooltip and updates dynamically on toggle', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const toggle = page.locator('#menu-toggle');

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('title', 'Abrir menú');
    await expect(toggle).toHaveClass(/active:scale-95/);

    await toggle.click();
    await expect(toggle).toHaveAttribute('title', 'Cerrar menú');

    await toggle.click();
    await expect(toggle).toHaveAttribute('title', 'Abrir menú');
  });
});
