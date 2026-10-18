## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-indexing DOM Sub-elements and Lowercased Text in Client-side Search Filters

**Learning:** In client-side list filtering scripts (such as FAQ search filter in `src/components/FAQ.astro`), querying `item.textContent` and `item.querySelector(...)` on every keystroke inside the `input` event handler causes layout reflows, repeated string conversions, and DOM sub-queries. Pre-indexing DOM element references and lowercased searchable text into a cached array during component initialization (`initFAQ()`) makes search input filtering significantly faster and allocation-free on keystrokes.

**Action:** When building client-side search or filter inputs over static DOM lists, pre-index DOM element references (`trigger`, `container`, `icon`) and lowercased `textContent` into a cached data structure during script initialization.
