## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - DOM Reference & Text Pre-Caching in Interactive Filters

**Learning:** In client-side search/filter components with frequent keystroke events (like FAQ search), dynamically querying child elements via `querySelector` and reading `textContent` on every input stroke triggers repetitive DOM tree traversals, string allocations, and garbage collection pressure. Pre-caching lowercased text and child element references (`trigger`, `container`, `icon`) during component setup makes filtering run in pure in-memory $O(1)$ lookups per item.

**Action:** Whenever building or modifying live client-side filter lists, pre-cache child DOM node references and normalized search strings in an array during initialization instead of re-querying the DOM inside input listeners.
