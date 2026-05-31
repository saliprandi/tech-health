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

## 2025-05-26 - Content Security Policy and Permissions-Policy Hardening
**Vulnerability:** Defense-in-depth gaps in security headers (missing 'upgrade-insecure-requests' and overly permissive browser feature access).
**Learning:** For static Astro sites, meta-tag based security policies are the primary defense layer. Hardening these policies by explicitly disabling unused features (camera, microphone, etc.) and forcing HTTPS upgrades significantly reduces the attack surface for client-side attacks.
**Prevention:** Always include 'upgrade-insecure-requests' in CSP and implement a restrictive 'Permissions-Policy' by default in 'Layout.astro'.
## 2025-05-26 - Manifest Integrity and Audit Blocking
**Vulnerability:** Syntax errors in `package.json` prevented automated security audits (`pnpm audit`) from running, potentially hiding critical vulnerabilities.
**Learning:** Security tools often fail silently or are skipped when core configuration files are malformed. A broken build/audit pipeline is a security risk as it blindfolds the development team.
**Prevention:** Ensure `package.json` integrity is part of the CI/CD pipeline. Never ignore audit failures caused by environment or syntax issues.

## 2025-05-27 - Security Override Regression and CSP Hardening
**Vulnerability:** Duplicated `pnpm` blocks in `package.json` caused a regression where the `yaml` security override was ignored. Duplicated `<meta name="generator">` tags leaked framework version.
**Learning:** Multiple top-level keys of the same name in `package.json` are handled differently by different tools, but in this case, the second block completely masked the first, silently removing a security patch.
**Prevention:** Maintain a clean, consolidated manifest file. Use automated verification scripts to ensure security headers and meta tags are correctly applied.
## 2025-05-27 - CSP Hardening and Manifest Consolidation
**Vulnerability:** Duplicate manifest keys and non-functional security meta tags.
**Learning:** `Permissions-Policy` is non-functional in `<meta>` tags and must be set via HTTP headers. Duplicate `pnpm` keys in `package.json` can lead to overrides being ignored.
**Prevention:** Consolidate all dependency overrides into a single `pnpm` object. Use `upgrade-insecure-requests` in CSP to ensure all content is served over HTTPS.

## 2025-05-28 - CSP Consolidation and Reverse Tab-nabbing Protection
**Vulnerability:** Redundant CSP meta tags and insecure programmatic `window.open` calls.
**Learning:** Multiple CSP meta tags can cause browser confusion or inconsistent policy enforcement. Programmatic redirects via `window.open` without `noopener,noreferrer` expose users to reverse tab-nabbing, where a destination page can manipulate the original tab's location.
**Prevention:** Consolidate security policies into a single, comprehensive meta tag. Always include `noopener,noreferrer` in any `window.open` calls to external origins.

## 2026-05-29 - Code Corruption as a Security Blocker
**Vulnerability:** Severe code corruption and duplication across multiple components (Nav, Contacto, Servicios, Footer, Equipos) which blocked automated security audits (pnpm audit) and framework diagnostic tools (astro check).
**Learning:** Security auditing and automated patching cannot function when the codebase is in a state of syntactic or structural chaos. Deduplication and stabilization are not just "cleanup" tasks but prerequisites for a secure development lifecycle.
**Prevention:** Enforce strict build and check passing in CI/CD. Treat "broken audits" as a critical security failure. Use surgical refactoring to stabilize corrupted components before applying targeted security fixes.
