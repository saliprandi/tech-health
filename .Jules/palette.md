## 2025-05-15 - Accessible Service Modals
**Learning:** Interactive elements implemented as divs (like cards) must have role="button", tabindex="0", and keyboard listeners (Enter/Space) to be accessible. Modals require dialog roles, focus management (focusing the close button on open and restoring focus on close), and Escape key support.
**Action:** Always implement focus management and ARIA roles when creating custom modal interactions.
## 2025-06-01 - [Interactive Service Cards Accessibility]
**Learning:** In Astro components, using static `div` elements for interactive features like opening modals creates accessibility barriers for keyboard and screen reader users. Simply adding `role="button"` and `tabindex="0"` is not enough; explicit keyboard listeners for 'Enter' and 'Space' must be added, and focus management (shifting focus to the modal and back) is crucial for a complete UX.
**Action:** Always ensure that any custom interactive element has appropriate ARIA roles, keyboard support, and focus management from the start.
