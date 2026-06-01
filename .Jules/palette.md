## 2025-05-22 - Accessibility and Focus Management in Modals
**Learning:** Adding `invisible` (visibility: hidden) to a modal when closing it at the same time as `opacity-0` cuts off the CSS transition.
**Action:** Use a `setTimeout` matching the transition duration to apply `invisible` only after the fade-out is complete, ensuring both accessibility (hidden from screen readers) and smooth UX.
