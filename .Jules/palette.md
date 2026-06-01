## 2025-05-15 - Accessible Modal Pattern
**Learning:** Implementing focus management (storing `lastFocusedElement` and restoring it) is critical for a smooth keyboard experience when using modals that are dynamically populated. Adding `role="button"` and `tabindex="0"` to `div` cards is an effective micro-UX improvement for accessibility when full refactoring to `<button>` is not feasible.
**Action:** Always implement focus traps and restoration when adding modals or dropdowns.
## 2025-06-01 - [ScrollSpy and ARIA current]
**Learning:** Implementing ScrollSpy not only provides visual feedback but is also an opportunity to improve accessibility by using `aria-current="location"` on the active link. Using `IntersectionObserver` with a `rootMargin` that favors the top-middle of the viewport ensures the "active" section feels natural to the user's focus.
**Action:** Always combine visual "active" states with semantic ARIA attributes to ensure the UX improvement benefits all users, including those using assistive technologies.
## 2025-05-15 - Accessible Service Modals
**Learning:** Interactive elements implemented as divs (like cards) must have role="button", tabindex="0", and keyboard listeners (Enter/Space) to be accessible. Modals require dialog roles, focus management (focusing the close button on open and restoring focus on close), and Escape key support.
**Action:** Always implement focus management and ARIA roles when creating custom modal interactions.
## 2025-06-01 - [Interactive Service Cards Accessibility]
**Learning:** In Astro components, using static `div` elements for interactive features like opening modals creates accessibility barriers for keyboard and screen reader users. Simply adding `role="button"` and `tabindex="0"` is not enough; explicit keyboard listeners for 'Enter' and 'Space' must be added, and focus management (shifting focus to the modal and back) is crucial for a complete UX.
**Action:** Always ensure that any custom interactive element has appropriate ARIA roles, keyboard support, and focus management from the start.
