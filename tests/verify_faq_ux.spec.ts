import { test, expect } from '@playwright/test';

test.describe('FAQ UX Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the local development server
    await page.goto('http://localhost:4321/');
  });

  test('FAQ items should toggle correctly with smooth transitions', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();

    const firstFaqTrigger = page.locator('.faq-trigger').first();
    const firstFaqAnswer = page.locator('.faq-answer-container').first();

    // Initially closed
    await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'false');
    await expect(firstFaqAnswer).toHaveClass(/invisible/);
    await expect(firstFaqAnswer).toHaveClass(/opacity-0/);
    await expect(firstFaqAnswer).toHaveCSS('height', '0px');

    // Open first FAQ
    await firstFaqTrigger.click();
    await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(firstFaqAnswer).not.toHaveClass(/invisible/);
    await expect(firstFaqAnswer).not.toHaveClass(/opacity-0/);

    // Wait for transition to stabilize
    await page.waitForTimeout(500);
    const heightAfterOpen = await firstFaqAnswer.evaluate(el => el.scrollHeight);
    await expect(firstFaqAnswer).toHaveCSS('height', `${heightAfterOpen}px`);

    // Close first FAQ
    await firstFaqTrigger.click();
    await expect(firstFaqTrigger).toHaveAttribute('aria-expanded', 'false');

    // Immediately after click, height should start decreasing but invisible class should NOT be there yet
    await expect(firstFaqAnswer).not.toHaveClass(/invisible/);

    // Wait for transition (350ms in code + some buffer)
    await page.waitForTimeout(500);
    await expect(firstFaqAnswer).toHaveClass(/invisible/);
    await expect(firstFaqAnswer).toHaveClass(/opacity-0/);
    await expect(firstFaqAnswer).toHaveCSS('height', '0px');
  });

  test('Opening one FAQ should close others with delay', async ({ page }) => {
    const triggers = page.locator('.faq-trigger');
    const answers = page.locator('.faq-answer-container');

    // Open first
    await triggers.nth(0).click();
    await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(answers.nth(0)).not.toHaveClass(/invisible/);

    // Open second
    await triggers.nth(1).click();
    await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'false');

    // First one should still be visible during transition
    await expect(answers.nth(0)).not.toHaveClass(/invisible/);

    // Wait for transition
    await page.waitForTimeout(500);
    await expect(answers.nth(0)).toHaveClass(/invisible/);
    await expect(answers.nth(1)).not.toHaveClass(/invisible/);
  });
});
