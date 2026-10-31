## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-caching DOM Elements and Normalized Text in Client-side Filter Search

**Learning:** In client-side list filtering routines (such as FAQ or product search), querying `.textContent` and executing child `querySelector` calls on every keystroke forces repeated layout recalculations, string allocations, and DOM traversal. Pre-indexing elements and pre-lowercasing text into an in-memory data structure on initialization reduces keystroke handler execution overhead significantly and guarantees 60fps responsiveness during fast typing.

**Action:** Whenever implementing live search or filtering inputs, construct a pre-cached array of elements and normalized text upon initialization instead of querying the DOM repeatedly inside the `input` event listener.
