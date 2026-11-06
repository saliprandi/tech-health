## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-11-06 - Pre-caching DOM References and Text in Client-Side Search Filters

**Learning:** In Astro client-side interactive search/filter components (such as FAQ or catalog filters), extracting `item.textContent` and executing `item.querySelector()` inside input change handlers causes repeated DOM tree traversals, string allocations, and lowercasing on every keystroke. Pre-caching lowercase text strings and child DOM element references into a structured array upon script initialization ensures $O(n)$ search comparisons with zero DOM querying overhead during active typing.

**Action:** Whenever implementing or optimizing client-side list filtering, cache static text and child DOM node references during initialization rather than querying the DOM tree on each keystroke.
