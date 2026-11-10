## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - FAQ Search Client-Side DOM & Text Caching

**Learning:** In interactive client-side search components like `FAQ.astro`, accessing `item.textContent` and performing `querySelector` traversals inside the `input` event callback triggers repeated DOM tree traversals, string allocations, and garbage collection churn on every keystroke. Pre-caching lowercased text strings and DOM node references (`trigger`, `container`, `icon`) during component initialization eliminates layout queries and reduces search handler execution time.

**Action:** When filtering static DOM lists client-side, map elements to pre-computed search terms and element references upon mount instead of querying DOM attributes on each input event.
