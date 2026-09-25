# Bolt's Journal - Critical Performance Learnings

## 2026-09-25 - Asynchronous Non-Render-Blocking Google Fonts Loading
**Learning:** Google Fonts loaded with standard `<link rel="stylesheet">` tags block CSSOM construction and delay page initial render (FCP and LCP) while waiting for network requests to Google Fonts servers.
**Action:** Use `<link rel="preload" as="style" href="...">`, `<link rel="stylesheet" media="print" onload="this.setAttribute('media', 'all')" href="...">`, and a `<noscript>` fallback tag in HTML/Astro layout files to allow fonts to download asynchronously without blocking the critical rendering path.
