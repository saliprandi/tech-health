## 2025-05-15 - [Security Hardening & Dependency Patching]
**Vulnerability:** Moderate vulnerability in `yaml` package (GHSA-48c2-rrv3-qjmp) and redundant Content Security Policy headers.
**Learning:** Transitive dependencies like `yaml` can introduce vulnerabilities even if not used directly in the source code. Additionally, multiple CSP meta tags can lead to policy conflicts or bypasses if not carefully managed.
**Prevention:** Use `pnpm.overrides` to pin secure versions of transitive dependencies and maintain a single source of truth for security headers in the root layout.
