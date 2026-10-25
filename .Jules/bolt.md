## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Avoid Micro-Optimizing Pre-Indexing on Small Fixed Lists

**Learning:** Caching DOM node references and pre-lowercasing text content for small fixed DOM lists (such as the ~10 static FAQ items) is considered a micro-optimization that adds code complexity without providing perceptible real-world user performance gains.

**Action:** Do not implement pre-indexing or cached data structures for small static DOM collections (< 20 elements); focus instead on major network/rendering bottlenecks or large data sets.
