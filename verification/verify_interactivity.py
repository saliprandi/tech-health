import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            await page.goto("http://localhost:4322")
            print("Page loaded successfully")

            # 1. Verify Navigation
            await page.screenshot(path="verification/screenshots/nav_desktop_v3.png")

            # 2. Verify Service Modal Interactivity
            card = await page.query_selector(".service-card")
            if card:
                await card.click()
                await page.wait_for_selector("#service-modal:not(.opacity-0)")
                await page.screenshot(path="verification/screenshots/service_modal_v3.png")
                print("Service modal opened")

                # Close it
                await page.keyboard.press("Escape")
                await page.wait_for_selector("#service-modal.opacity-0")
                print("Service modal closed")

            # 3. Verify Contact Form
            contact_form = await page.query_selector("#contact-form")
            if contact_form:
                await contact_form.scroll_into_view_if_needed()
                await page.screenshot(path="verification/screenshots/contact_form_v3.png")
                print("Contact form visible")

            print("Verification complete")
        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
