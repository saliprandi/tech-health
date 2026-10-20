## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - FAQ Item Pre-indexing for Zero-Reflow Client Search
**Learning:** Querying `textContent`, converting strings to lowercase, and executing `querySelector` sub-queries on every keystroke inside list filter input event listeners causes layout reads and garbage collection overhead. Caching DOM element references, lowercased searchable text strings, and child trigger/container nodes into an array during component initialization (`initFAQ`) eliminates DOM sub-queries and string transformations during live keystroke filtering.
**Action:** Pre-index DOM element references and lowercased searchable text into a cached array during initialization for interactive client-side search and filtering scripts.
