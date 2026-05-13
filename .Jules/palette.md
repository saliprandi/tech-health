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
