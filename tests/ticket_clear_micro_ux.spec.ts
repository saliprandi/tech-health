import { test, expect } from '@playwright/test';

test.describe('Ticket Search Clear Button Micro-UX & Accessibility', () => {
  test('should render clear button with title tooltip and hover/active micro-UX classes on /estado', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const input = page.locator('#ticket-input');
    const clearBtn = page.locator('#clear-ticket-input');

    await expect(clearBtn).toBeHidden();
    await expect(clearBtn).toHaveAttribute('aria-label', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);

    await input.fill('TH-2026-TEST');
    await expect(clearBtn).toBeVisible();

    await clearBtn.click();
    await expect(input).toHaveValue('');
    await expect(clearBtn).toBeHidden();
    await expect(input).toBeFocused();
  });

  test('should render clear button with title tooltip and hover/active micro-UX classes in Proceso section', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const procesoSection = page.locator('#proceso');
    await procesoSection.scrollIntoViewIfNeeded();

    const input = page.locator('#proceso-ticket-input');
    const clearBtn = page.locator('#proceso-clear-ticket-input');

    await expect(clearBtn).toBeHidden();
    await expect(clearBtn).toHaveAttribute('aria-label', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');
    await expect(clearBtn).toHaveClass(/hover:scale-110/);
    await expect(clearBtn).toHaveClass(/active:scale-95/);

    await input.fill('TH-2026-PROC');
    await expect(clearBtn).toBeVisible();

    await clearBtn.click();
    await expect(input).toHaveValue('');
    await expect(clearBtn).toBeHidden();
    await expect(input).toBeFocused();
  });
});
