## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-03-31 - Direct UTC Offset Arithmetic for Fixed Timezone Status Check

**Learning:** For regions operating on a permanent fixed timezone offset without Daylight Saving Time (such as Argentina / Tucumán at UTC-3), calculating local target time directly using fixed offset millisecond arithmetic (`new Date(now.getTime() - 3 * 3600000)`) inside recurring intervals avoids `Intl.DateTimeFormat.prototype.formatToParts()` array allocations, string parsing, and loop iterations on every tick.

**Action:** Use direct UTC offset arithmetic (`getUTCDay()`, `getUTCHours()`, `getUTCMinutes()`) for status indicators in fixed-offset timezones rather than `Intl.DateTimeFormat.prototype.formatToParts()`.
