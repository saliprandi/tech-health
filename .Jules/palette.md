## 2025-05-15 - Intl.DateTimeFormat 'numeric' constraint
**Learning:** Using `weekday: 'numeric'` in `Intl.DateTimeFormat` is not supported in many environments and causes a `RangeError`.
**Action:** Use `weekday: 'short'` or `'long'` and compare string values (e.g., 'Mon', 'Tue') for cross-browser reliability in client-side scripts.

## 2025-05-15 - Micro-UX feedback and Script isolation
**Learning:** Providing immediate button feedback (e.g., "Redirigiendo...") improves UX but errors in pre-execution logic (like date parsing) can block subsequent event listeners.
**Action:** Wrap independent logic in try-catch or ensure early initialization is robust to prevent breaking core features like form submissions.
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
## 2025-02-15 - [UX: Immediate Feedback on Redirect]
**Learning:** Providing immediate visual feedback (changing button text to 'Redirigiendo...' and disabling it) during an external redirect (like WhatsApp) confirms the user's action and prevents duplicate submissions, making the interaction feel snappier and more reliable.
**Action:** Always implement loading/redirecting states for buttons that trigger asynchronous or external navigation.
## 2026-06-02 - State-Aware Navigation Accessibility
**Learning:** Mobile navigation toggles must provide clear state feedback via ARIA attributes and support universal keyboard dismissibility (Escape key) to ensure a high-quality, inclusive UX.
**Action:** Always implement `aria-expanded`, dynamic `aria-label` updates, and "Escape" key listeners for mobile navigation menus. Ensure focus is returned to the toggle when closed via keyboard.
## 2025-06-05 - [Mobile Menu Accessibility]
**Learning:** Mobile menu toggles should use `aria-expanded` and `aria-controls` to communicate state to screen readers. Dynamically updating the `aria-label` based on state (e.g., "Abrir menú" vs "Cerrar menú") provides clearer context for the current action.
**Action:** Always implement ARIA state attributes and dynamic labels for mobile navigation toggles to improve the non-visual UX.

## 2025-06-05 - [UX: Real-time Business Hours Status]
**Learning:** Providing immediate, glanceable information about business availability (e.g., "Abierto ahora" vs "Cerrado") reduces user cognitive load and manages expectations for response times before they even interact with a contact form.
**Action:** Use client-side logic to calculate local time relative to the business's timezone and provide a high-contrast, color-coded status badge near contact methods.
## 2026-06-03 - [UX: Real-time Availability Feedback]
**Learning:** The 'Business Hours Status' badge is a highly effective micro-UX pattern for service-based sites. It provides immediate certainty to the user about laboratory availability without requiring them to parse a schedule. Using a client-side script with UTC offsets ensures accuracy across different user timezones while maintaining Tucumán's local context.
**Action:** Implement dynamic status badges for any component displaying business hours to reduce user cognitive load and improve engagement.

## 2025-06-06 - [UX: Live Character Counters]
**Learning:** Adding a real-time character counter to textareas with strict length limits (like 500 characters) provides critical feedback that prevents user frustration during form submission. Using `aria-describedby` links the counter to the input for screen readers, while avoiding `aria-live="polite"` on the counter itself prevents excessive verbosity during every keystroke.
**Action:** Always implement character counters for limited inputs, ensuring clear visual state changes (e.g., color shifts) as the limit approaches, and maintain accessibility via semantic ARIA associations.
