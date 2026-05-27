## 2025-05-15 - [Baseline Stabilization & A11y Foundations]
**Learning:** Structural corruption, such as massive code duplication and mismatched HTML tags, frequently occurs in rapidly iterated Astro components. This not only blocks production builds due to esbuild syntax errors but also creates disjointed and unreliable UX (e.g., duplicated logic for mobile menus or counters).
**Action:** Prioritize deduplication and syntax normalization as a prerequisite for UX work. Always verify baseline stability with `pnpm build` before adding interactive polish.

**Learning:** Micro-animations (like CTA pulses) provide great visual cues but must always be accompanied by a `prefers-reduced-motion` media query to ensure the site remains accessible to users with vestibular sensitivities.
**Action:** Standardize a "motion-safe" pattern in `global.css` that disables all transitions and animations when requested by the OS.
