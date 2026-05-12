## 2025-05-15 - Interactive Card and Modal Accessibility
**Learning:** Found that service cards were interactive but lacked ARIA roles, keyboard support, and focus management (focus trapping and restoration) which are essential for accessibility.
**Action:** Always implement `role="button"`, `tabindex="0"`, and keyboard listeners for interactive `div` elements. Ensure modals manage focus properly by focusing the close button on open, trapping focus while open, and restoring focus on close.
