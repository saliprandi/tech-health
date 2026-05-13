## 2026-05-12 - Prevent XSS in dynamic DOM injection
**Vulnerability:** Cross-Site Scripting (XSS) via `innerHTML`.
**Learning:** Dynamic content injected into the DOM using `innerHTML` without prior sanitization can lead to XSS, especially if the data source (like a configuration file or API) is ever compromised or modified to include malicious scripts.
**Prevention:** Always sanitize dynamic content using a robust escaping function (replacing &, <, >, ", ') before injecting it into the DOM via `innerHTML`, or use safer alternatives like `textContent` when possible.
