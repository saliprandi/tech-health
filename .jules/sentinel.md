## 2025-05-22 - [Broken Astro build due to corrupted component]
**Vulnerability:** XSS (missing sanitization), Tabnabbing (missing rel attributes), and Outdated dependencies with known CVEs.
**Learning:** The `Servicios.astro` component was severely corrupted with multiple duplicated logic blocks, which not only caused build failures but also introduced security gaps where attributes were missing in some copies but present in others.
**Prevention:** Always verify `pnpm build` after any modification to Astro components. Use automated tests (`playwright`) to verify security attributes on dynamic elements that are injected via `innerHTML`.
