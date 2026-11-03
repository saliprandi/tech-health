## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-caching Interactive Search Metadata & Subtrees

**Learning:** Client-side search and filtering inputs (such as `#faq-search-input` in `FAQ.astro`) that traverse child subtrees with `item.textContent?.toLowerCase()` and `querySelector` on each keystroke incur repeated layout reading and garbage collection pressure. Pre-indexing child references and lowercased query strings into an in-memory cache upon initialization eliminates DOM tree traversals and string allocations during live typing.

**Action:** Pre-cache searchable normalized text and child DOM handles once during script initialization for client-side search/filter components.
