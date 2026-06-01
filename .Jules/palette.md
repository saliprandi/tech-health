## 2025-06-01 - Service Modal Accessibility and Focus Management
**Learning:** Standard interactive cards used as triggers for modals lack keyboard accessibility (tabindex, role, event listeners) by default in many Astro/Tailwind implementations. Users navigating with screen readers or keyboards are locked out of detailed content.
**Action:** Always apply `role="button"`, `tabindex="0"`, and keyboard event listeners (`Enter`/`Space`) to card triggers. Implement focus management by moving focus to the modal's primary action (e.g., close button) on open and restoring focus to the trigger on close.
>>>>>>> REPLACE
