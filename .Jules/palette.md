## 2025-05-15 - Service Modal Accessibility
**Learning:** Using `invisible` in addition to `opacity-0` for modals ensures they are correctly removed from the accessibility tree and tab order when closed, preventing keyboard users from accidentally tabbing into hidden elements.
**Action:** Always combine opacity transitions with `visibility: hidden` (Tailwind `invisible`) for modal backdrops and containers.

**Learning:** Focus restoration is a critical UX pattern for modal dialogs. Saving the `activeElement` before opening and calling `.focus()` on it after closing maintains the user's context in the tab order.
**Action:** Implement `lastFocusedElement` logic in all custom modal implementations.
