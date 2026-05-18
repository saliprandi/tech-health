## 2025-05-12 - [Asset and Font Optimization]
**Learning:** Google Fonts loading was requesting 7 weights for Plus Jakarta Sans and 4 for Inter, but the app only used 2 and 3 respectively. Removing unused weights and italics reduced font CSS size and unnecessary font file requests.
**Action:** Always audit font weights in Layout.astro against actual usage in the codebase before shipping.

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
