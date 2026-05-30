## 2025-05-15 - Initial Security Scan
**Vulnerability:** Build-breaking code corruption and redundant CSP headers.
**Learning:** Severe merge corruption can lead to duplicated script blocks and HTML, which not only breaks the build but can also lead to inconsistent security policy application (like multiple CSP headers).
**Prevention:** Use stricter merge strategies and always run `pnpm build` or `pnpm astro check` before committing.
