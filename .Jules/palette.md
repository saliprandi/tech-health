## 2025-05-15 - Accessible Modal Pattern
**Learning:** Implementing focus management (storing `lastFocusedElement` and restoring it) is critical for a smooth keyboard experience when using modals that are dynamically populated. Adding `role="button"` and `tabindex="0"` to `div` cards is an effective micro-UX improvement for accessibility when full refactoring to `<button>` is not feasible.
**Action:** Always implement focus traps and restoration when adding modals or dropdowns.
