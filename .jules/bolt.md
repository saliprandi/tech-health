## 2026-05-19 - [DOM and Payload Optimization via Component Stabilization]
**Learning:** Severe code duplication in core Astro components (Nav, Contacto, Servicios, Footer) caused redundant DOM nodes and multiple JS execution blocks, bloating the HTML payload and potentially leading to build failures. Stabilization through deduplication reduced the final `index.html` size to 55KB and ensured a stable build.
**Action:** Always audit components for repeated template or script blocks after complex merges or migrations. Ensure client-side scripts are lean and avoid redundant event listeners.

## 2026-05-19 - [In-line Script Constraint for `define:vars`]
**Learning:** Using `define:vars` in Astro automatically treats the script as `is:inline`, which disables TypeScript features like type assertions in the browser.
**Action:** When using `define:vars`, use standard JavaScript syntax and avoid TypeScript-specific expressions to maintain compatibility and pass `astro check`.
