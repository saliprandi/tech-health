from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:4321")
    page.wait_for_timeout(1000)

    # 1. Test Navigation ScrollSpy
    page.evaluate("window.scrollTo(0, document.getElementById('servicios').offsetTop)")
    page.wait_for_timeout(1000)

    # 2. Test Modal Opening and Focus
    service_card = page.locator(".service-card").first
    service_card.click()
    page.wait_for_timeout(1000)

    # Take screenshot of open modal
    page.screenshot(path="/home/jules/verification/screenshots/modal_open.png")

    # 3. Test Focus Trap
    page.keyboard.press("Tab")
    page.wait_for_timeout(500)

    # 4. Test Modal Closing (Escape)
    page.keyboard.press("Escape")
    page.wait_for_timeout(1000)

    # Take screenshot after closing (focus should be back on card)
    page.screenshot(path="/home/jules/verification/screenshots/modal_closed.png")

    # 5. Test Click to Copy in Contact section
    page.evaluate("window.scrollTo(0, document.getElementById('contacto').offsetTop)")
    page.wait_for_timeout(1000)

    copy_btn = page.locator(".copy-btn").first
    copy_btn.click()
    page.wait_for_timeout(500) # Wait for state change

    # Take screenshot of copy success state
    page.screenshot(path="/home/jules/verification/screenshots/copy_success.png")

    # 6. Test Mobile Menu
    page.set_viewport_size({"width": 375, "height": 667})
    page.wait_for_timeout(500)

    menu_toggle = page.locator("#menu-toggle")
    menu_toggle.click()
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/mobile_menu.png")

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Grant clipboard permissions
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            permissions=["clipboard-read", "clipboard-write"]
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
