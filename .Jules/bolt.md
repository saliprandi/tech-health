## 2025-05-18 - Non-render-blocking Google Fonts loading
**Learning:** Loading Google Fonts with synchronous `<link rel="stylesheet">` blocks critical path rendering while waiting for network responses. Using `<link rel="preload" as="style">` alongside `<link rel="stylesheet" media="print" onload="this.setAttribute('media', 'all')">` and `<noscript>` fallback prevents render blocking without triggering Astro build or TypeScript diagnostics errors.
**Action:** Use asynchronous font loading in HTML / Astro layout templates when serving external Web Fonts.
