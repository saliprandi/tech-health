## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-indexing Client-side Filter Elements

**Learning:** Pre-indexing DOM sub-elements (`querySelector`) and lowercased searchable text (`textContent.toLowerCase()`) into a cached data array during initialization eliminates DOM querying allocations and string transformations on every input keystroke during client-side search filtering.

**Action:** Pre-cache DOM element references and lowercased text in client-side search/filter scripts.
