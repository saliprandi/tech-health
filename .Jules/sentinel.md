## 2025-05-15 - [XSS Prevention in Dynamic Modal Content]
**Vulnerability:** Cross-Site Scripting (XSS) via `innerHTML` injection of unsanitized configuration data.
**Learning:** Even when data comes from a "local" config file, if that data is rendered into the DOM using `innerHTML` in a client-side script, it poses an XSS risk if the configuration can be influenced by external factors or if it's considered untrusted input in a larger context.
**Prevention:** Always sanitize or escape dynamic content before injecting it into the DOM using `innerHTML`. Prefer `textContent` or `innerText` when possible, but if HTML structure is needed (e.g., for list items), sanitize the individual data points.

## 2025-05-16 - [Hardening CSP and Fixing Corrupted Security Implementations]
**Vulnerability:** Incomplete/Corrupted security fixes and missing CSP directives (`object-src`, `base-uri`).
**Learning:** Security fixes must be verified for syntactic correctness and completeness; a partially implemented or corrupted fix (e.g., duplicated functions or unclosed tags) can bypass intended protections and break builds. CSP should include directives to prevent `<object>`/`<embed>` injection and base-tag hijacking.
**Prevention:** Always run `pnpm build` and `pnpm astro check` after security changes. Consolidate security utilities (like `escapeHtml`) and ensure they are applied consistently across all dynamic injection points. Use `object-src 'none'` and `base-uri 'self'` in CSP by default.

# Sentinel Journal - TechHealth

## 2025-05-13 - Security Enhancement: Content Security Policy and Referrer Policy
**Vulnerability:** Missing security headers (CSP, Referrer-Policy).
**Learning:** Even static sites benefit from CSP to prevent potential XSS if third-party scripts are ever added or if data injection occurs.
**Prevention:** Always include basic security headers in the main layout.
