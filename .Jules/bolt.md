## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - FAQ Search Filtering DOM Pre-Caching

**Learning:** Live search filter inputs attached to list items cause unnecessary DOM tree traversals (`textContent`), string allocations, and `querySelector` calls on every input keystroke if querying DOM nodes directly inside the event handler. Pre-caching lowercased text strings and child DOM element references (`trigger`, `container`, `icon`) in an array upon script initialization reduces live filtering complexity from $O(N \cdot \text{DOM\_depth})$ DOM reads to $O(N)$ string lookups over cached JS objects.

**Action:** For client-side filterable list components with static or semi-static DOM nodes, pre-cache lowercased text strings and child DOM element references into a structured array during script initialization.
