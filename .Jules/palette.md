## 2026-06-01 - Accessible Interactive Cards and Modal Focus Management
**Learning:** Custom interactive elements (like `div` cards) must be manually enriched with keyboard support and focus management to be truly accessible. Simply adding a click listener is insufficient for screen readers and keyboard users.
**Action:** Always add `tabindex="0"`, `role="button"`, and keydown listeners to custom interactive containers. Ensure modals implement focus traps or at least focus-restoration logic.
## 2025-05-22 - Accessibility and Focus Management in Modals
**Learning:** Adding `invisible` (visibility: hidden) to a modal when closing it at the same time as `opacity-0` cuts off the CSS transition.
**Action:** Use a `setTimeout` matching the transition duration to apply `invisible` only after the fade-out is complete, ensuring both accessibility (hidden from screen readers) and smooth UX.
## 2025-05-15 - [A11y: Focus Management in Astro Modals]
**Learning:** When using Astro with client-side scripts to manage modals, manual focus management is required for accessibility. Simply showing/hiding with CSS classes leaves focus on the trigger element, which is confusing for screen reader and keyboard users.
**Action:** Use `lastFocusedElement = document.activeElement` before opening, focus the first interactive element (close button) inside the modal using `setTimeout` to wait for transitions, and restore focus when closing.

## 2025-05-15 - [UX: Interaction Feedback with Animations]
**Learning:** Adding subtle animations (like 'heartbeat' for medical icons) on group-hover provides delightful feedback that reinforces the brand identity (medical engineering) without being intrusive.
**Action:** Define custom keyframes in `tailwind.config.mjs` and use `group-hover` on parent containers to trigger animations on child SVG icons.
## 2025-05-15 - [Accessible Modals in Astro]
**Learning:** Transitioning a static list to an interactive modal requires careful focus management and ARIA roles. Using `invisible` alongside `opacity-0` is crucial to ensure that hidden modal content is truly "gone" for screen readers and tab navigation during transitions.
**Action:** Always use `role="dialog"`, `aria-modal="true"`, and implement focus traps or focus restoration for any modal implementation. Ensure interactive triggers have `role="button"` and keyboard listeners.
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

## 2026-06-02 - [UX: Form Validation and Feedback]
**Learning:** Converting non-semantic interactive sections to formal HTML `<form>` elements provides native validation and better mobile accessibility. Providing immediate visual feedback (e.g., 'Redirigiendo...') during external redirections reduces user uncertainty and prevents duplicate actions.
**Action:** Always use semantic forms for user inputs and implement clear loading/transition states for async or external actions.
