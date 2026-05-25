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

## 2025-05-25 - Proactive Transitive Dependency Management and CSP Hardening
**Vulnerability:** Transitive dependency vulnerabilities (e.g., GHSA-77vg-94rm-hx3p in 'devalue') and potential for plugin-based or base-hijacking attacks.
**Learning:** In Astro projects, vulnerabilities often reside deep in the dependency tree (like in 'devalue' which is used by Astro). Using 'pnpm.overrides' is the most effective way to force a secure version without waiting for framework updates. Additionally, a baseline 'default-src self' CSP is often insufficient; explicit 'object-src none' and 'base-uri self' are critical for defense-in-depth.
**Prevention:** Regularly run 'pnpm audit' and use 'pnpm.overrides' to patch high-severity transitive vulnerabilities immediately. Always include 'object-src none' and 'base-uri self' in the Layout's CSP meta tag.

## 2025-05-26 - Manifest Integrity and Audit Blocking
**Vulnerability:** Syntax errors in `package.json` prevented automated security audits (`pnpm audit`) from running, potentially hiding critical vulnerabilities.
**Learning:** Security tools often fail silently or are skipped when core configuration files are malformed. A broken build/audit pipeline is a security risk as it blindfolds the development team.
**Prevention:** Ensure `package.json` integrity is part of the CI/CD pipeline. Never ignore audit failures caused by environment or syntax issues.

## 2025-05-27 - [Manifest Integrity and CSP Hardening]
**Vulnerability:** Duplicate manifest blocks and missing defense-in-depth headers.
**Learning:** Duplicate keys in package.json can lead to silent failures where security overrides are ignored by the package manager. CSP headers without form-action and frame-ancestors leave the application vulnerable to clickjacking and form-hijacking.
**Prevention:** Always consolidate package.json blocks and include comprehensive CSP directives beyond default-src.
