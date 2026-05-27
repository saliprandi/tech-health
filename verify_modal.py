from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        page.goto("http://localhost:4321")
        page.wait_for_timeout(1000)

        # Scroll to servicios
        page.evaluate("document.getElementById('servicios').scrollIntoView()")
        page.wait_for_timeout(500)

        # Open first modal
        card = page.locator(".service-card").first
        card.click()
        page.wait_for_timeout(1000)

        # Verify modal is visible
        modal = page.locator("#service-modal")
        is_visible = modal.is_visible()
        print(f"Modal visible: {is_visible}")

        page.screenshot(path="/home/jules/verification/screenshots/modal_actual.png")

        # Check focus is on close button
        close_btn = page.locator("#close-modal")
        is_focused = close_btn.evaluate("el => document.activeElement === el")
        print(f"Close button focused: {is_focused}")

        # Close modal
        page.keyboard.press("Escape")
        page.wait_for_timeout(500)

        # Check focus is back on card
        is_card_focused = card.evaluate("el => document.activeElement === el")
        print(f"Card focused after close: {is_card_focused}")

        # Test Contact form enhancement
        page.evaluate("document.getElementById('contacto').scrollIntoView()")
        page.wait_for_timeout(500)

        # Fill form
        page.fill("#f-nombre", "Test User")
        page.fill("#f-tel", "123456789")
        page.fill("#f-desc", "This is a test message for verification.")

        # Take screenshot of contact form
        page.screenshot(path="/home/jules/verification/screenshots/contact_form.png")

        browser.close()

if __name__ == "__main__":
    run_test()
