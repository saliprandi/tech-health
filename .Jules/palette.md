## 2025-05-15 - [Accessible Modals and Focus Management]
**Learning:** In Astro components where interactive elements (like cards) trigger modals via client-side scripts, standard HTML attributes (`role="button"`, `tabindex="0"`) and proper focus management (storing the trigger element, focusing the close button on open, restoring focus on close, and trapping focus) are essential for a professional and accessible UX.
**Action:** Always implement focus trapping and restoration logic for any custom modal dialogs to ensure keyboard-only users can navigate the interface effectively.
