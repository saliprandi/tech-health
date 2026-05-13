## 2025-05-22 - Focus Trap and Keyboard Accessibility in Astro Components
**Learning:** In Astro projects where interactive elements (like cards) are created using divs, they must be explicitly given `role="button"` and `tabindex="0"` for accessibility. Additionally, modals require manual focus management: capturing the trigger element, focusing the first interactive element (usually the close button) on open, trapping the Tab key, and restoring focus on close.
**Action:** Use a reusable focus-trap pattern for all modals and ensure div-based buttons have keyboard listeners for 'Enter' and 'Space'.
## 2025-05-15 - Improving Mobile Menu and FAB Accessibility
**Learning:** Mobile menus often lack the `aria-expanded` attribute, which is critical for screen reader users to understand the state of the navigation. Additionally, fixed elements like floating WhatsApp buttons often miss visible focus states, making them difficult to find for keyboard-only users.
**Action:** Always include `aria-expanded` on toggle buttons and ensure it's updated via script. Apply project-standard `focus-visible` rings to all interactive elements, especially those with fixed positioning or unusual styles.

## 2025-05-15 - Preventing Layout Shift with Explicit Image Dimensions
**Learning:** Missing `width` and `height` attributes on key images like the navigation logo can cause Cumulative Layout Shift (CLS) when the image loads, pushing the rest of the page content down.
**Action:** Always provide explicit `width` and `height` attributes for images, even when using CSS for responsive sizing.
## 2025-05-15 - Accessible Modal Pattern
**Learning:** For interactive cards that trigger modals, it is essential to implement full keyboard support (role="button", tabindex="0", Enter/Space listeners), focus management (focusing the initial element on open and restoring focus on close), and a focus trap to keep the Tab cycle within the modal.
**Action:** Always apply these three pillars (Attributes, Management, Trap) when implementing custom modal triggers to ensure WCAG compliance.
# Palette's Journal - TechHealth

## 2025-05-14 - Modal Focus Management
**Learning:** The services section uses a modal to show details, but it doesn't manage focus, making it inaccessible for keyboard users.
**Action:** Always focus the first interactive element (like the close button) when a modal opens, and restore focus to the trigger element when it closes. Implement focus trapping.

## 2025-05-14 - Layout Shift Prevention
**Learning:** Images without explicit dimensions in Astro components can cause Cumulative Layout Shift (CLS) during load.
**Action:** Always include 'width' and 'height' attributes on '<img>' tags, especially for critical elements like the logo in the navigation.
