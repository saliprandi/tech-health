import { test, expect } from '@playwright/test';

test.describe('Business Hours Badge UX', () => {
  test.beforeEach(async ({ page }) => {
    // We need to serve the app first. For simplicity in this test,
    // we assume the server is running or we use a mocked environment.
    // However, since we want to test the REAL logic in the component,
    // we'll navigate to the page.
    await page.goto('http://localhost:4321');
  });

  test('should show "Abierto ahora" during normal business hours', async ({ page }) => {
    // Mock time to Wednesday 14:00 Tucumán (UTC-3) -> 17:00 UTC
    await page.evaluate(() => {
      const mockDate = new Date('2025-05-21T17:00:00Z');
      // @ts-ignore
      window.Date = class extends Date {
        constructor() {
          super();
          return mockDate;
        }
        static now() {
          return mockDate.getTime();
        }
      };
      // Trigger the interval logic manually or wait for it
      // Since it runs on init, we might need to reload or trigger manually
    });

    await page.reload();

    // We need to re-mock after reload because it's a new page context
    await page.addInitScript(() => {
        const mockDate = new Date('2025-05-21T17:00:00Z');
        const RealDate = Date;
        // @ts-ignore
        window.Date = class extends RealDate {
          constructor(arg) {
            if (arg) return new RealDate(arg);
            return mockDate;
          }
          static now() {
            return mockDate.getTime();
          }
        };
    });
    await page.reload();

    const badge = page.locator('#status-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Abierto ahora');
    await expect(badge).toHaveClass(/bg-emerald-100/);
  });

  test('should show "Cerrará pronto" near closing time', async ({ page }) => {
    // Mock time to Wednesday 17:45 Tucumán (UTC-3) -> 20:45 UTC
    await page.addInitScript(() => {
        const mockDate = new Date('2025-05-21T20:45:00Z');
        const RealDate = Date;
        // @ts-ignore
        window.Date = class extends RealDate {
          constructor(arg) {
            if (arg) return new RealDate(arg);
            return mockDate;
          }
          static now() {
            return mockDate.getTime();
          }
        };
    });
    await page.reload();

    const badge = page.locator('#status-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Cerrará pronto');
    await expect(badge).toHaveClass(/bg-amber-100/);
  });

  test('should show "Abrirá pronto" near opening time', async ({ page }) => {
    // Mock time to Wednesday 08:45 Tucumán (UTC-3) -> 11:45 UTC
    await page.addInitScript(() => {
        const mockDate = new Date('2025-05-21T11:45:00Z');
        const RealDate = Date;
        // @ts-ignore
        window.Date = class extends RealDate {
          constructor(arg) {
            if (arg) return new RealDate(arg);
            return mockDate;
          }
          static now() {
            return mockDate.getTime();
          }
        };
    });
    await page.reload();

    const badge = page.locator('#status-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Abrirá pronto');
    await expect(badge).toHaveClass(/bg-amber-100/);
  });

  test('should show "Cerrado" at night', async ({ page }) => {
    // Mock time to Wednesday 22:00 Tucumán (UTC-3) -> Thursday 01:00 UTC
    await page.addInitScript(() => {
        const mockDate = new Date('2025-05-22T01:00:00Z');
        const RealDate = Date;
        // @ts-ignore
        window.Date = class extends RealDate {
          constructor(arg) {
            if (arg) return new RealDate(arg);
            return mockDate;
          }
          static now() {
            return mockDate.getTime();
          }
        };
    });
    await page.reload();

    const badge = page.locator('#status-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Cerrado');
    await expect(badge).toHaveClass(/bg-gray-100/);
  });
});
