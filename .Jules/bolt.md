# Bolt's Journal - Critical Learnings

## 2026-03-30 - Non-render-blocking Google Fonts loading
**Learning:** Google Fonts loaded with standard `<link rel="stylesheet">` block First Contentful Paint (FCP) while waiting for CSS download. Changing to `<link rel="preload" as="style">` and `<link rel="stylesheet" media="print" onload="this.onload=null;this.media='all'">` eliminates render blocking on layout entry points.
**Action:** Use asynchronous font loading in all Astro layout head definitions while preserving fallback `<noscript>` tags.
