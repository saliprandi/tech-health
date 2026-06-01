## 2025-05-15 - [A11y: Focus Management in Astro Modals]
**Learning:** When using Astro with client-side scripts to manage modals, manual focus management is required for accessibility. Simply showing/hiding with CSS classes leaves focus on the trigger element, which is confusing for screen reader and keyboard users.
**Action:** Use `lastFocusedElement = document.activeElement` before opening, focus the first interactive element (close button) inside the modal using `setTimeout` to wait for transitions, and restore focus when closing.

## 2025-05-15 - [UX: Interaction Feedback with Animations]
**Learning:** Adding subtle animations (like 'heartbeat' for medical icons) on group-hover provides delightful feedback that reinforces the brand identity (medical engineering) without being intrusive.
**Action:** Define custom keyframes in `tailwind.config.mjs` and use `group-hover` on parent containers to trigger animations on child SVG icons.
