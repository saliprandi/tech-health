## 2025-05-15 - [Baseline Stabilization & Micro-Animations]
**Learning:** Repositories with structural corruption (duplicated code blocks from merge conflicts) require surgical stabilization before UX enhancements can be verified via build. Accessibility patterns like focus trapping in modals and mobile menus are critical for compliance but should be implemented minimally to respect scope.
**Action:** Use IIFEs in Astro `is:inline` scripts to isolate scope and prevent variable collision when dealing with deduplicated components. Always verify that DOM selectors are correctly initialized after refactoring.

## 2025-05-15 - [CTA Delight & Accessibility]
**Learning:** Adding a subtle pulse animation to primary CTAs (WhatsApp buttons) improves visual hierarchy and "signposting" for users without being intrusive.
**Action:** Implement `animate-cta-pulse` using CSS keyframes and ensure it respects `prefers-reduced-motion` to maintain accessibility standards.
