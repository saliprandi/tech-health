## 2025-05-15 - [Accessible Modals in Astro]
**Learning:** Transitioning a static list to an interactive modal requires careful focus management and ARIA roles. Using `invisible` alongside `opacity-0` is crucial to ensure that hidden modal content is truly "gone" for screen readers and tab navigation during transitions.
**Action:** Always use `role="dialog"`, `aria-modal="true"`, and implement focus traps or focus restoration for any modal implementation. Ensure interactive triggers have `role="button"` and keyboard listeners.
