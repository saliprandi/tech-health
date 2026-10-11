## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-10-11 - Pre-indexing Client-side Filter DOM References and Search Text

**Learning:** In client-side list filtering handlers attached to `input` events (such as FAQ search filtering), querying DOM sub-elements (`querySelector`) and reading element text content (`textContent.toLowerCase()`) inside the input loop causes DOM tree traversals, string allocations, and reflows on every single keystroke.

**Action:** Pre-index DOM element references (`trigger`, `container`, `icon`) and pre-calculate lowercased searchable text into a cached array during component initialization (`initFAQ`), making keystroke handlers perform pure array iterations over pre-computed strings and references.
