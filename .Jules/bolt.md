## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-30 - Client-Side Interactive Filter DOM Caching

**Learning:** Interactive client-side search/filter inputs in Astro components cause unnecessary string allocations and DOM tree traversals if `textContent` and `querySelector` are evaluated repeatedly on every input event. Pre-caching lowercased text and child DOM references (`trigger`, `container`, `icon`) during component initialization avoids repeated DOM tree traversals and child element queries.

**Action:** Structure interactive search/filter scripts to construct a cached DOM reference and text array during setup, and query against pre-computed properties during filter operations.
