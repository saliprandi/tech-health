import { test, expect } from '@playwright/test';

test.describe('Copy and Action Buttons Micro-UX & Tooltips', () => {
  test('proceso clear ticket input button has native title tooltip and active scale micro-animation', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/');
    const clearBtn = page.locator('#proceso-clear-ticket-input');

    // Title attribute for native tooltip affordance
    await expect(clearBtn).toHaveAttribute('title', 'Limpiar número de ticket');

    // Classes for hover scaling and active press micro-UX
    const className = await clearBtn.getAttribute('class');
    expect(className).toContain('hover:scale-110');
    expect(className).toContain('active:scale-95');
  });

  test('contacto copy buttons have native title tooltips and active scale micro-animations', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/');

    const phoneCopyBtn = page.locator('#copy-phone');
    await expect(phoneCopyBtn).toHaveAttribute('title', 'Copiar teléfono al portapapeles');
    expect(await phoneCopyBtn.getAttribute('class')).toContain('active:scale-95');

    const addressCopyBtn = page.locator('#copy-address');
    await expect(addressCopyBtn).toHaveAttribute('title', 'Copiar dirección al portapapeles');
    expect(await addressCopyBtn.getAttribute('class')).toContain('active:scale-95');
  });

  test('estado copy and share buttons have native title tooltips and active scale micro-animations', async ({ page }) => {
    await page.goto('http://127.0.0.1:4321/estado');

    const copyTicketBtn = page.locator('#copy-ticket-btn');
    await expect(copyTicketBtn).toHaveAttribute('title', 'Copiar número de ticket al portapapeles');
    expect(await copyTicketBtn.getAttribute('class')).toContain('active:scale-95');

    const shareTicketBtn = page.locator('#share-ticket-btn');
    await expect(shareTicketBtn).toHaveAttribute('title', 'Copiar enlace directo del ticket al portapapeles');
    expect(await shareTicketBtn.getAttribute('class')).toContain('active:scale-95');
  });
});
