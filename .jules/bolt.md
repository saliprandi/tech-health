## 2025-05-12 - [Asset and Font Optimization]
**Learning:** Google Fonts loading was requesting 7 weights for Plus Jakarta Sans and 4 for Inter, but the app only used 2 and 3 respectively. Removing unused weights and italics reduced font CSS size and unnecessary font file requests.
**Action:** Always audit font weights in Layout.astro against actual usage in the codebase before shipping.

## 2025-05-12 - [CLS Prevention for Logo]
**Learning:** The main logo used h-[56px] w-auto but lacked explicit width/height attributes, causing layout shifts during initial load.
**Action:** Always provide explicit width and height on key branding elements in the navigation bar.
