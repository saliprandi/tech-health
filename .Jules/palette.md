# Palette's Journal - TechHealth

## 2025-05-22 - Focus management and visibility
**Learning:** The project uses a high-contrast navy and blue palette. Interactive elements benefit from consistent, high-visibility focus rings to assist keyboard users.
**Action:** Use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-4` as the project standard for focus indicators on buttons and links.

## 2025-05-22 - Accessible Navigation
**Learning:** Mobile menu toggles must communicate their state (open/closed) to assistive technologies.
**Action:** Always implement `aria-expanded` and ensure it is updated via JavaScript when the menu state changes.
