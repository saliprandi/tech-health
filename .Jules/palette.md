## 2025-05-15 - Interactive Div-Buttons Pattern
**Learning:** Components acting as buttons (e.g., clickable cards) often lack proper ARIA roles, tabindex, and keyboard listeners, making them inaccessible to screen readers and keyboard-only users.
**Action:** Always check for `cursor-pointer` elements that trigger actions and ensure they have `role="button"`, `tabindex="0"`, and `keydown` listeners for Enter/Space.
