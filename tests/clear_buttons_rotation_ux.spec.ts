import { test, expect } from '@playwright/test';

test.describe('Search Input Clear Buttons Rotation Micro-UX', () => {
  test('estado ticket search clear button features group class and icon rotation micro-animation', async ({ page }) => {
    await page.goto('http://localhost:4321/estado');

    const clearBtn = page.locator('#clear-ticket-input');
    await expect(clearBtn).toHaveClass(/group/);

    const svgIcon = clearBtn.locator('svg');
    await expect(svgIcon).toHaveClass(/group-hover:rotate-90/);
    await expect(svgIcon).toHaveClass(/group-focus-visible:rotate-90/);
    await expect(svgIcon).toHaveClass(/transition-transform/);
  });

  test('proceso ticket search clear button features group class and icon rotation micro-animation', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const clearBtn = page.locator('#proceso-clear-ticket-input');
    await expect(clearBtn).toHaveClass(/group/);

    const svgIcon = clearBtn.locator('svg');
    await expect(svgIcon).toHaveClass(/group-hover:rotate-90/);
    await expect(svgIcon).toHaveClass(/group-focus-visible:rotate-90/);
    await expect(svgIcon).toHaveClass(/transition-transform/);
  });

  test('faq search clear button features group class and icon rotation micro-animation', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const clearBtn = page.locator('#clear-faq-search');
    await expect(clearBtn).toHaveClass(/group/);

    const svgIcon = clearBtn.locator('svg');
    await expect(svgIcon).toHaveClass(/group-hover:rotate-90/);
    await expect(svgIcon).toHaveClass(/group-focus-visible:rotate-90/);
    await expect(svgIcon).toHaveClass(/transition-transform/);
  });
});
