## 2025-05-15 - Modal Focus Management Pattern
**Learning:** Proper accessibility for custom modals requires three key interactions:
1. **Initial Focus:** When the modal opens, focus should move to the first interactive element (usually the close button) to orient the user.
2. **Focus Trapping:** Keyboard navigation (Tab) must be restricted within the modal to prevent focus from escaping to the background page.
3. **Focus Restoration:** When the modal closes, focus must be returned to the element that triggered it, maintaining the user's position in the document.

**Action:** Use the `lastFocusedElement = document.activeElement` pattern before opening, and implement a `keydown` listener on the modal container to intercept `Tab` events for trapping. Use `setTimeout` for focusing on open if there are CSS transitions.
