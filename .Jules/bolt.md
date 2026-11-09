## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-11-09 - Client-side Search Pre-caching in Interactive Components

**Learning:** Re-traversing DOM trees (`item.textContent`), allocating lowercase strings, and running `querySelector` lookups inside keypress/input event handlers produces main thread layout thrashing and garbage collection churn on interactive components like `FAQ.astro`.

**Action:** Pre-cache DOM element references and pre-computed lowercase text strings into structured data arrays during component initialization to guarantee $O(1)$ property access on user keystrokes.
