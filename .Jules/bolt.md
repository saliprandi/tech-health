## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - FAQ Search Filter DOM Pre-Indexing

**Learning:** In client-side list filtering scripts (such as FAQ search in `src/components/FAQ.astro`), pre-indexing DOM sub-element references (`trigger`, `container`, `icon`) and lowercased searchable text (`textContent`) into a cached data array during initialization avoids layout reflows, repeated string conversions, and sub-queries (`querySelector`) on every input keystroke.

**Action:** Cache DOM query references and lowercased text content during script initialization for list search and filter logic instead of running `querySelector` and `.textContent.toLowerCase()` repeatedly inside input event handlers.
