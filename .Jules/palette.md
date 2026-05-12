## 2025-05-15 - Improving Mobile Menu and FAB Accessibility
**Learning:** Mobile menus often lack the `aria-expanded` attribute, which is critical for screen reader users to understand the state of the navigation. Additionally, fixed elements like floating WhatsApp buttons often miss visible focus states, making them difficult to find for keyboard-only users.
**Action:** Always include `aria-expanded` on toggle buttons and ensure it's updated via script. Apply project-standard `focus-visible` rings to all interactive elements, especially those with fixed positioning or unusual styles.

## 2025-05-15 - Preventing Layout Shift with Explicit Image Dimensions
**Learning:** Missing `width` and `height` attributes on key images like the navigation logo can cause Cumulative Layout Shift (CLS) when the image loads, pushing the rest of the page content down.
**Action:** Always provide explicit `width` and `height` attributes for images, even when using CSS for responsive sizing.
