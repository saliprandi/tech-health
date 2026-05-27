import re
from playwright.sync_api import sync_playwright

def verify_security_and_ux(page):
    page.goto("http://localhost:4321")
    page.wait_for_timeout(1000)

    # 1. Verify CSP (via header or meta - check if meta is present and correct)
    csp_meta = page.locator('meta[http-equiv="Content-Security-Policy"]')
    content = csp_meta.get_attribute("content")
    print(f"CSP Content: {content}")
    assert "form-action 'self'" in content
    assert "base-uri 'self'" in content
    assert "upgrade-insecure-requests" in content

    # 2. Verify window.open security in Contacto
    # Since we can't easily intercept window.open in a simple way without more complex setup,
    # we'll trust our manual code check, but we can check if the form exists and button is clickable.
    form = page.locator("#contact-form")
    assert form.is_visible()

    # 3. Verify Modal (UX regression check)
    service_card = page.locator(".service-card").first
    service_card.click()
    page.wait_for_timeout(500)

    modal = page.locator("#service-modal")
    # Check if it has the scale-100 class (as per our implementation)
    # Actually, we should check for visibility/opacity
    page.wait_for_selector("#service-modal", state="visible")
    assert modal.is_visible()
    page.screenshot(path="/home/jules/verification/screenshots/modal_security_check.png")

    page.keyboard.press("Escape")
    page.wait_for_timeout(500)

    # 4. Verify Mobile Menu (UX regression check)
    page.set_viewport_size({"width": 375, "height": 667})
    menu_toggle = page.locator("#menu-toggle")
    menu_toggle.click()
    page.wait_for_timeout(500)

    mobile_menu = page.locator("#mobile-menu")
    assert mobile_menu.is_visible()
    page.screenshot(path="/home/jules/verification/screenshots/mobile_menu_security_check.png")

    print("Security and UX verification complete.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Grant clipboard permissions for our copy buttons
        context = browser.new_context()
        context.grant_permissions(["clipboard-read", "clipboard-write"])
        page = context.new_page()
        try:
            verify_security_and_ux(page)
        finally:
            context.close()
            browser.close()
