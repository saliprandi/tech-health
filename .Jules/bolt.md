## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-indexing DOM elements and lowercased searchable text in client filters

**Learning:** In client-side list filtering scripts (such as FAQ search inputs), running `querySelector` sub-queries, reading `textContent` DOM properties, and converting string cases on every input event keystroke introduces unnecessary layout reflows and Garbage Collection pressure. Pre-indexing DOM element references and pre-lowercasing searchable text content into a cached array during script initialization eliminates DOM sub-queries and repeated string allocations during keystrokes.

**Action:** When filtering interactive DOM list elements on client-side input events, pre-index DOM element references and lowercased search text into a cached dataset during setup.
