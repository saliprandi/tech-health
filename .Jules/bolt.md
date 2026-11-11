## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Pre-caching Search Filter DOM Elements and Text Lowercasing

**Learning:** In interactive client-side filter and search components (such as FAQ search in `src/components/FAQ.astro`), performing DOM subtree traversals via `.textContent`, allocating new lowercased strings, and executing child `querySelector` operations on every keystroke causes unnecessary CPU consumption and garbage collection pressure. Pre-caching lowercased text and child element references during script initialization provides $O(1)$ lookups and eliminates repetitive DOM traversals.

**Action:** For client-side interactive search/filter components, initialize a structured array caching the element references and pre-computed normalized search text once upon mount.
