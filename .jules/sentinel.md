## 2025-05-15 - [Initial Scan]
**Vulnerability:** Potential XSS in modal content injection and lack of input validation on contact form.
**Learning:** Using innerHTML with template literals for dynamic content (even from local config) is a risky pattern that can lead to XSS if the data source becomes dynamic.
**Prevention:** Always escape dynamic content or use safer DOM APIs like textContent when injecting data into the DOM.
