## 2025-05-15 - [Initial Scan]
**Vulnerability:** Potential XSS in modal content injection and lack of input validation on contact form.
**Learning:** Using innerHTML with template literals for dynamic content (even from local config) is a risky pattern that can lead to XSS if the data source becomes dynamic.
**Prevention:** Always escape dynamic content or use safer DOM APIs like textContent when injecting data into the DOM.
## 2026-05-12 - Prevent XSS in dynamic DOM injection
**Vulnerability:** Cross-Site Scripting (XSS) via `innerHTML`.
**Learning:** Dynamic content injected into the DOM using `innerHTML` without prior sanitization can lead to XSS, especially if the data source (like a configuration file or API) is ever compromised or modified to include malicious scripts.
**Prevention:** Always sanitize dynamic content using a robust escaping function (replacing &, <, >, ", ') before injecting it into the DOM via `innerHTML`, or use safer alternatives like `textContent` when possible.

## 2025-05-24 - [Astro XSS and Component Cleanup]
**Vulnerability:** XSS in `define:vars` directive (Astro < 6.1.6) and massive code duplication in `Servicios.astro` causing maintenance risks.
**Learning:** Core framework vulnerabilities can affect even simple static sites. Duplicate DOM IDs and logic make security auditing difficult and can lead to broken focus management or inconsistent sanitization.
**Prevention:** Keep core dependencies updated (Astro ^6.1.6+). Consolidate component logic and use centralized sanitization helpers for any dynamic DOM injection.
