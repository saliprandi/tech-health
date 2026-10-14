## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-10-14 - Pre-indexing FAQ DOM References and Search Text

**Learning:** Pre-indexing DOM sub-element references (`trigger`, `container`, `icon`) and lowercased searchable text (`textContent`) into a cached data structure during script initialization avoids layout reflows, string conversions, and repetitive DOM query selector calls on every search input keystroke.

**Action:** When writing client-side search/filter logic over DOM elements, pre-cache element references and normalized search text during initialization.
