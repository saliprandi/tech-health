## 2025-05-15 - Consolidating Interactive Components and Accessibility
**Learning:** Redundant tags and conflicting attributes can occur in complex Astro components after multiple edits, leading to broken focus management and accessibility. A "Skip to Content" link is a high-impact, low-effort accessibility win for keyboard users.
**Action:** Regularly audit components for duplicated attributes (like `tabindex` or `aria-label`) and ensure a standard focus-trap/restoration pattern is used for all modals. Always include a Skip Link in the base layout.
