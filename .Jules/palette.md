## 2025-05-15 - Interactive Div-Buttons Pattern
**Learning:** Components acting as buttons (e.g., clickable cards) often lack proper ARIA roles, tabindex, and keyboard listeners, making them inaccessible to screen readers and keyboard-only users.
**Action:** Always check for `cursor-pointer` elements that trigger actions and ensure they have `role="button"`, `tabindex="0"`, and `keydown` listeners for Enter/Space.
## 2026-05-12 - Interactive Cards and Modal Accessibility Pattern
**Learning:** Found that interactive 'div' cards used to trigger modals lacked basic accessibility (keyboard support, ARIA roles). Also, the detail modal lacked focus management and trapping.
**Action:** Always add 'role="button"', 'tabindex="0"', and keyboard listeners (Enter/Space) to card-like buttons. Ensure modals follow a strict focus management pattern: focus close button on open, restore focus on close, and implement focus trapping logic.
## 2025-05-15 - Interactive Card and Modal Accessibility
**Learning:** Found that service cards were interactive but lacked ARIA roles, keyboard support, and focus management (focus trapping and restoration) which are essential for accessibility.
**Action:** Always implement `role="button"`, `tabindex="0"`, and keyboard listeners for interactive `div` elements. Ensure modals manage focus properly by focusing the close button on open, trapping focus while open, and restoring focus on close.
## 2025-05-15 - [Accessible Modals and Focus Management]
**Learning:** In Astro components where interactive elements (like cards) trigger modals via client-side scripts, standard HTML attributes (`role="button"`, `tabindex="0"`) and proper focus management (storing the trigger element, focusing the close button on open, restoring focus on close, and trapping focus) are essential for a professional and accessible UX.
**Action:** Always implement focus trapping and restoration logic for any custom modal dialogs to ensure keyboard-only users can navigate the interface effectively.
## 2025-05-22 - Modal Focus Management and Accessibility
**Learning:** For interactive elements like cards that act as buttons, it is critical to provide proper ARIA roles (`role="button"`), tab indexing (`tabindex="0"`), and keyboard event listeners (Enter/Space). Furthermore, when these interactions open a modal, focus management is essential: capturing the `lastFocusedElement`, shifting focus to the modal (e.g., the close button), and restoring focus upon closure. Focus trapping within the modal ensures a seamless keyboard navigation experience.
**Action:** Always implement `lastFocusedElement` storage and restoration, and use a standard focus trapping listener in components that use modals or overlays.
## 2025-05-15 - Modal Focus Management Pattern
**Learning:** Proper accessibility for custom modals requires three key interactions:
1. **Initial Focus:** When the modal opens, focus should move to the first interactive element (usually the close button) to orient the user.
2. **Focus Trapping:** Keyboard navigation (Tab) must be restricted within the modal to prevent focus from escaping to the background page.
3. **Focus Restoration:** When the modal closes, focus must be returned to the element that triggered it, maintaining the user's position in the document.

**Action:** Use the `lastFocusedElement = document.activeElement` pattern before opening, and implement a `keydown` listener on the modal container to intercept `Tab` events for trapping. Use `setTimeout` for focusing on open if there are CSS transitions.
## 2025-05-22 - Focus Trap and Keyboard Accessibility in Astro Components
**Learning:** In Astro projects where interactive elements (like cards) are created using divs, they must be explicitly given `role="button"` and `tabindex="0"` for accessibility. Additionally, modals require manual focus management: capturing the trigger element, focusing the first interactive element (usually the close button) on open, trapping the Tab key, and restoring focus on close.
**Action:** Use a reusable focus-trap pattern for all modals and ensure div-based buttons have keyboard listeners for 'Enter' and 'Space'.
## 2025-05-12 - Mobile Menu Accessibility and Logo CLS
**Learning:** Adding ARIA attributes (aria-expanded, aria-hidden) and visible focus indicators to mobile menu toggles is essential for keyboard and screen reader accessibility. Additionally, providing explicit width and height for hero logos prevents Cumulative Layout Shift (CLS).
**Action:** Always audit mobile navigation for proper state representation in the DOM and ensure images have defined dimensions.
## 2025-05-15 - Improving Mobile Menu and FAB Accessibility
**Learning:** Mobile menus often lack the `aria-expanded` attribute, which is critical for screen reader users to understand the state of the navigation. Additionally, fixed elements like floating WhatsApp buttons often miss visible focus states, making them difficult to find for keyboard-only users.
**Action:** Always include `aria-expanded` on toggle buttons and ensure it's updated via script. Apply project-standard `focus-visible` rings to all interactive elements, especially those with fixed positioning or unusual styles.

## 2025-05-15 - Preventing Layout Shift with Explicit Image Dimensions
**Learning:** Missing `width` and `height` attributes on key images like the navigation logo can cause Cumulative Layout Shift (CLS) when the image loads, pushing the rest of the page content down.
**Action:** Always provide explicit `width` and `height` attributes for images, even when using CSS for responsive sizing.
## 2025-05-15 - Accessible Modal Pattern
**Learning:** For interactive cards that trigger modals, it is essential to implement full keyboard support (role="button", tabindex="0", Enter/Space listeners), focus management (focusing the initial element on open and restoring focus on close), and a focus trap to keep the Tab cycle within the modal.
**Action:** Always apply these these three pillars (Attributes, Management, Trap) when implementing custom modal triggers to ensure WCAG compliance.
# Palette's Journal - TechHealth

## 2025-05-14 - Modal Focus Management
**Learning:** The services section uses a modal to show details, but it doesn't manage focus, making it inaccessible for keyboard users.
**Action:** Always focus the first interactive element (like the close button) when a modal opens, and restore focus to the trigger element when it closes. Implement focus trapping.

## 2025-05-14 - Layout Shift Prevention
**Learning:** Images without explicit dimensions in Astro components can cause Cumulative Layout Shift (CLS) during load.
**Action:** Always include 'width' and 'height' attributes on '<img>' tags, especially for critical elements like the logo in the navigation.

## 2025-05-24 - HTML Sanitization in Client-Side Scripts
**Learning:** When injecting dynamic content into the DOM using `innerHTML` within Astro `<script>` tags, it is critical to sanitize the data to prevent XSS vulnerabilities, especially when the data comes from a configuration object that might be modified.
**Action:** Implement a robust `escapeHtml` helper function and use it for all dynamic content injected via `innerHTML`.
## 2025-05-23 - Centralized Accessibility: Skip to Content
**Learning:** In multi-section landing pages with complex navigation, a 'Skip to Content' link is a high-impact, low-effort accessibility win. Centralizing it in the base layout ensures consistency, while targeting the main content with `tabindex="-1"` enables programmatic focus without adding a focus ring.
**Action:** Always include a visually hidden skip link in `Layout.astro` and ensure the main content wrapper in pages has a matching ID and `tabindex="-1"`.
