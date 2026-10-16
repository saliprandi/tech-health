## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Pre-indexing DOM Sub-elements and Lowercased Text in Search Filters

**Learning:** On interactive client-side search/filter components, querying sub-elements (`querySelector`) and reading/lowercasing `textContent` inside every `input` event callback triggers unnecessary layout/DOM reads and string allocations. Pre-indexing element references and lowercased searchable strings into a memory cache during component initialization avoids repeated DOM overhead on every keystroke.

**Action:** Pre-index DOM element references and text content into a cached array upon initialization when building client-side list search or filtering features.
