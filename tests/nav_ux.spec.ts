import { test, expect } from '@playwright/test';

test.describe('Navigation UX', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('mobile menu should open and close correctly', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggle = page.locator('#menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    await expect(menuToggle).toBeVisible();
    await expect(mobileMenu).not.toBeVisible();

    await menuToggle.click();
    await expect(mobileMenu).toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');

    // Check focus trap (optional but good)

    await menuToggle.click();
    await expect(mobileMenu).not.toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile menu should close when clicking outside or resizing to desktop', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggle = page.locator('#menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    // Test outside click
    await menuToggle.click();
    await expect(mobileMenu).toBeVisible();

    // Click outside menu (on position below menu)
    await page.mouse.click(10, 500);
    await expect(mobileMenu).not.toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    // Test resize to desktop
    await menuToggle.click();
    await expect(mobileMenu).toBeVisible();

    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(mobileMenu).not.toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('logo link should have focus-visible ring styles for keyboard navigation', async ({ page }) => {
    const logoLink = page.locator('nav a[aria-label="TechHealth Home"]');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveClass(/focus-visible:ring-2/);
    await expect(logoLink).toHaveClass(/focus-visible:ring-navy/);
  });

  test('mobile nav links should have focus-visible ring styles and title tooltips', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggle = page.locator('#menu-toggle');
    await menuToggle.click();

    const mobileLinks = page.locator('#mobile-menu .mobile-link');
    const count = await mobileLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = mobileLinks.nth(i);
      await expect(link).toHaveClass(/focus-visible:ring-2/);
      await expect(link).toHaveClass(/focus-visible:ring-navy/);
      await expect(link).toHaveAttribute('title', /.+/);
    }
  });

  test('reading progress bar should update on scroll', async ({ page }) => {
    const progressBar = page.locator('#reading-progress').first();
    await expect(progressBar).toBeAttached();

    // Initial state
    const initialTransform = await progressBar.evaluate(el => el.style.transform);
    expect(initialTransform).toContain('scaleX(0)');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500); // Wait for transition

    const scrolledTransform = await progressBar.evaluate(el => el.style.transform);
    expect(scrolledTransform).not.toContain('scaleX(0)');
    expect(scrolledTransform).toContain('scaleX');
  });
});
