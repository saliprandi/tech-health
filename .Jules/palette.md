## 2025-05-24 - Navigation UX: ScrollSpy, Focus Rings, and Escape Key
**Learning:** For landing pages with fixed headers and section-based navigation:
1. **ScrollSpy:** Use `IntersectionObserver` with a specific `rootMargin` (e.g., `-20% 0px -70% 0px`) to provide visual feedback on the current section.
2. **Scroll Padding:** `scroll-padding-top` on the `html` element is essential to prevent fixed headers from obscuring section targets.
3. **Focus Indicators:** Explicitly define `focus-visible` rings for all interactive elements (links, buttons) to ensure keyboard accessibility.
4. **Escape to Close:** Mobile menus and modals should always be closeable via the `Escape` key for a consistent user experience.

**Action:** Implement these four pillars in any project using a fixed header and anchor-based navigation.

## 2025-05-27 - Centralized A11y: Back to Top Button
**Learning:** On long landing pages, a "Back to Top" button is a high-impact micro-UX addition that improves orientation. It must be paired with proper focus restoration (e.g., to `#main-content`) to avoid leaving the user in a "focus vacuum" at the bottom of the page.
**Action:** Always implement a visibility threshold (e.g., 500px) and ensure focus is programmatically moved to the top of the content after scrolling.
