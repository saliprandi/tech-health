## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Pre-caching DOM References and Text Content in Client Search Filters

**Learning:** In interactive client-side search/filter components (like `FAQ.astro`), querying the DOM (`querySelector`) and reading text content (`textContent.toLowerCase()`) inside input event handlers causes redundant layout reads, string allocations, and DOM traversals on every keystroke. Pre-caching element references and pre-lowercased text strings in a single array upon component initialization optimizes filter execution to an O(1) array traversal.

**Action:** Pre-cache DOM element references and processed string values upon script initialization for all client-side search or filter inputs.
