## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Pre-indexing DOM References and Search Text for Client-Side List Filtering

**Learning:** In client-side list search filters (such as `src/components/FAQ.astro`), performing DOM queries (`querySelector('.faq-trigger')`, `querySelector('.faq-answer-container')`) and reading `item.textContent` to lowercase inside `input` event handlers triggers layout reflows and redundant CPU operations on every search keystroke. Pre-indexing DOM sub-element references and lowercased text into an array on initialization makes keystroke filtering $O(N)$ with zero DOM queries or string parsing overhead.

**Action:** Always pre-index list item DOM references and normalized searchable text during initialization when implementing interactive client-side search filters.
