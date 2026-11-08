## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-03 - Pre-caching Text and DOM Lookups in Interactive Filter Lists

**Learning:** In client-side list filtering components (like FAQ search), querying `item.textContent` and performing child `item.querySelector()` queries on every keystroke causes repeated DOM tree traversals, string lowercase allocations, and forced layout checks. Pre-caching lowercased text content, visible status, and child element references (`trigger`, `container`, `icon`) during component initialization avoids repeated DOM reads during rapid user typing.

**Action:** When building interactive search filters over DOM elements, pre-cache lowercased search text and child element pointers upon setup so filtering operations run entirely over in-memory cached entries with $O(1)$ child access.
