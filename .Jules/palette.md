## 2026-06-01 - Accessible Interactive Cards and Modal Focus Management
**Learning:** Custom interactive elements (like `div` cards) must be manually enriched with keyboard support and focus management to be truly accessible. Simply adding a click listener is insufficient for screen readers and keyboard users.
**Action:** Always add `tabindex="0"`, `role="button"`, and keydown listeners to custom interactive containers. Ensure modals implement focus traps or at least focus-restoration logic.
