## 2026-05-19 - [DOM and Payload Optimization via Component Stabilization]
**Learning:** Severe code duplication in core Astro components (Nav, Contacto, Servicios, Footer) caused redundant DOM nodes and multiple JS execution blocks, bloating the HTML payload and potentially leading to build failures. Stabilization through deduplication reduced the final `index.html` size to 55KB and ensured a stable build.
**Action:** Always audit components for repeated template or script blocks after complex merges or migrations. Ensure client-side scripts are lean and avoid redundant event listeners.

## 2026-05-19 - [In-line Script Constraint for `define:vars`]
**Learning:** Using `define:vars` in Astro automatically treats the script as `is:inline`, which disables TypeScript features like type assertions in the browser.
**Action:** When using `define:vars`, use standard JavaScript syntax and avoid TypeScript-specific expressions to maintain compatibility and pass `astro check`.
## 2025-05-12 - [CLS Prevention for Logo]
**Learning:** The main logo used h-[56px] w-auto but lacked explicit width/height attributes, causing layout shifts during initial load.
**Action:** Always provide explicit width and height on key branding elements in the navigation bar.

## 2025-05-14 - [DOM and Payload Optimization]
**Learning:** Passing large global configuration objects to client-side scripts via 'define:vars' in Astro can significantly bloat the HTML payload. Additionally, redundant DOM elements and duplicate attributes in loops increase DOM complexity.
**Action:** Always subset data objects before passing them to client-side scripts and audit templates for attribute/element redundancy.

## 2025-05-15 - [Icon Sprite and SVG Optimization]
**Learning:** Consolidating repeated icons into an SVG Sprite reduced the uncompressed HTML payload by ~4KB and allowed for cleaner, smaller client-side scripts by removing hardcoded SVG strings. Additionally, removing a redundant @import from the logo SVG prevented an unnecessary network request.
**Action:** Use <symbol> and <use> for any icons repeated more than twice or shared between server templates and client-side scripts.
## 2026-05-14 - [SVG Spriting and LCP Optimization]
**Learning:** High-frequency icons (like the ECG path used 12 times) and complex SVG paths (like WhatsApp) can significantly bloat the HTML payload when inlined. Moving them to an SVG Sprite system with `<symbol>` and `<use>` reduced the `index.html` size by ~3KB. Additionally, adding `fetchpriority="high"` and `decoding="async"` to the main logo improved LCP.
**Action:** Use an SVG sprite system for any icon used more than once, and always optimize the main brand asset for LCP.
## 2026-05-17 - [Critical Component Deduplication]
**Learning:** Massive code duplication in Astro components (Nav, Contacto, Servicios) caused build failures and significantly bloated the HTML payload. Deduplicating these components not only fixed the build but also reduced the final index.html size by ~5KB (~8%).
**Action:** Always check for redundant HTML and script blocks after complex merges or migrations to ensure payload efficiency and build stability.

## 2025-05-28 - [Critical Component Deduplication & LCP]
**Learning:** Surgical deduplication of core components (Nav, Servicios, Contacto, Equipos) is critical for both build stability and payload efficiency. Redundant HTML and conflicting script blocks caused build failures and increased the uncompressed HTML size by ~8KB. Additionally, preloading the main logo improved LCP.
**Action:** Always verify build stability with 'pnpm build' after any component refactoring and prioritize preloading for the Largest Contentful Paint asset.

## 2026-05-31 - [Critical Component Deduplication & Payload Optimization]
**Learning:** Massive code duplication (multiple HTML blocks and script tags) in core Astro components (Nav, Contacto, Servicios, Equipos, Nosotros) not only bloated the HTML payload but also caused critical build failures ("Expected \")\" but found \"}\"") due to syntax errors in corrupted merge artifacts.
**Action:** Always perform a surgical deduplication of core components after merges or complex tasks to ensure build stability and maintain an optimized payload (~68KB for the main page).
