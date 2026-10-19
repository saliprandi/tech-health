## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-10-19 - Fixed Offset Arithmetic for Permanent UTC Offsets

**Learning:** When calculating wall-clock local time for regions operating on a permanent fixed offset without Daylight Saving Time (such as Argentina/Tucumán at UTC-3), using direct millisecond offset arithmetic (`now.getTime() + (now.getTimezoneOffset() * 60000) - (3 * 3600000)`) runs ~40x faster than `Intl.DateTimeFormat.prototype.formatToParts()`, avoiding object/array allocations and string parsing in recurring interval loops.

**Action:** Prefer direct fixed offset arithmetic over `Intl.DateTimeFormat.prototype.formatToParts()` when computing time for DST-free fixed offset timezones.
