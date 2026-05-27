from playwright.sync_api import sync_playwright

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:4321")
        page.wait_for_timeout(1000)

        # Scroll to servicios
        page.evaluate("document.getElementById('servicios').scrollIntoView()")
        page.wait_for_timeout(500)

        # Open first modal
        card = page.locator(".service-card").first
        card.click()

        # Wait for modal and transition
        page.wait_for_selector("#service-modal.opacity-100")
        page.wait_for_timeout(300) # Wait for setTimeout

        # Check active element
        active_id = page.evaluate("document.activeElement.id")
        active_tag = page.evaluate("document.activeElement.tagName")
        active_aria = page.evaluate("document.activeElement.getAttribute('aria-label')")
        print(f"Active element: ID={active_id}, Tag={active_tag}, AriaLabel={active_aria}")

        browser.close()

if __name__ == "__main__":
    run_test()
