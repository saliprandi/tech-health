## 2025-05-14 - Accessibility Integrity in Animation Patterns
**Learning:** Adding `tabindex="0"` to non-interactive elements (like informational grid cards) to enable focus-triggered animations is an accessibility anti-pattern. It introduces redundant tab stops that provide no functional value to keyboard or screen reader users, disrupting the natural navigation flow of the page.
**Action:** Restrict `tabindex` and focus-visible styles to elements with valid interactive roles (buttons, links, forms). For decorative or informational items, prioritize hover-only animations or ensure they are contained within a parent interactive element if the interaction is essential.

## 2025-05-14 - Surgical Stabilization of Corrupted Components
**Learning:** Large-scale merge corruption can result in duplicated script blocks and HTML templates within the same file, which may partially work but create a bloat-heavy, non-semantic DOM and break the build with syntax errors (e.g., redeclared variables).
**Action:** When encountering such corruption, perform a complete surgical rewrite of the component based on its intended logic rather than attempting to patch the duplicated mess. This ensures a single source of truth for both the template and the client-side logic.
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
