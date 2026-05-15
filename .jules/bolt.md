## 2025-05-12 - [Asset and Font Optimization]
**Learning:** Google Fonts loading was requesting 7 weights for Plus Jakarta Sans and 4 for Inter, but the app only used 2 and 3 respectively. Removing unused weights and italics reduced font CSS size and unnecessary font file requests.
**Action:** Always audit font weights in Layout.astro against actual usage in the codebase before shipping.

## 2025-05-12 - [CLS Prevention for Logo]
**Learning:** The main logo used h-[56px] w-auto but lacked explicit width/height attributes, causing layout shifts during initial load.
**Action:** Always provide explicit width and height on key branding elements in the navigation bar.

## 2025-05-14 - [DOM and Payload Optimization]
**Learning:** Passing large global configuration objects to client-side scripts via 'define:vars' in Astro can significantly bloat the HTML payload. Additionally, redundant DOM elements and duplicate attributes in loops increase DOM complexity.
**Action:** Always subset data objects before passing them to client-side scripts and audit templates for attribute/element redundancy.

## 2025-05-15 - [SVG Sprite for Payload Reduction]
**Learning:** High-frequency icons (like the ECG path repeated 12 times) significantly bloat the HTML payload. Using an SVG sprite system with `<symbol>` and `<use>` reduced the `index.html` size by ~7% (3.8KB) and simplified dynamic icon rendering in client-side scripts.
**Action:** Identify and consolidate repeated SVG paths into a central sprite component to minimize DOM size and network transfer.
