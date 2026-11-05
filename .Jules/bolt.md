## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-caching DOM Elements and Normalized Text in Client-side Search Filters

**Learning:** In interactive client-side filter and search components like FAQ accordion search, reading `textContent` and executing `querySelector` inside keystroke event listeners causes repeated DOM layout traversals, unnecessary string allocations, and GC pressure during rapid user typing. Pre-caching lowercased text along with child element references in a lightweight array during component initialization makes filtering instantaneous with zero per-keystroke DOM querying.

**Action:** Cache searchable text and child element references at component mount for client-side search lists.
