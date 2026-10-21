## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Pre-indexing Static DOM References and Text Content for Search Filters

**Learning:** Pre-indexing DOM sub-element references (`trigger`, `container`, `icon`) and pre-lowercasing searchable text strings into a cached array during initialization avoids layout reflows, repeated DOM queries (`querySelector`), and string heap allocations on every search input keystroke.

**Action:** When implementing or optimizing client-side DOM search and filtering logic, cache element references and lowercased searchable text in an array structure during component initialization.
