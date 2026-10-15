## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Pre-indexing Client-side Filter DOM References and Text

**Learning:** Pre-indexing DOM sub-element references (`trigger`, `container`, `icon`) and lowercased searchable text into a cached array during client-side script initialization avoids layout reflows, string allocations, and repeated DOM queries on every keystroke event during live search filtering.

**Action:** For client-side search/filter components, build a cached `faqData` data structure during initialization and iterate over cached objects in filter event handlers.
