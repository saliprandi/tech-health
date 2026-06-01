## 2025-05-15 - [XSS Prevention in Dynamic Modal Content]
**Vulnerability:** Cross-Site Scripting (XSS) via `innerHTML` injection of unsanitized configuration data.
**Learning:** Even when data comes from a "local" config file, if that data is rendered into the DOM using `innerHTML` in a client-side script, it poses an XSS risk if the configuration can be influenced by external factors or if it's considered untrusted input in a larger context.
**Prevention:** Always sanitize or escape dynamic content before injecting it into the DOM using `innerHTML`. Prefer `textContent` or `innerText` when possible, but if HTML structure is needed (e.g., for list items), sanitize the individual data points.
# Sentinel Journal - TechHealth

## 2025-05-13 - Security Enhancement: Content Security Policy and Referrer Policy
**Vulnerability:** Missing security headers (CSP, Referrer-Policy).
**Learning:** Even static sites benefit from CSP to prevent potential XSS if third-party scripts are ever added or if data injection occurs.
**Prevention:** Always include basic security headers in the main layout.
