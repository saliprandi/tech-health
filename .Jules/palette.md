## 2025-05-15 - Intl.DateTimeFormat 'numeric' constraint
**Learning:** Using `weekday: 'numeric'` in `Intl.DateTimeFormat` is not supported in many environments and causes a `RangeError`.
**Action:** Use `weekday: 'short'` or `'long'` and compare string values (e.g., 'Mon', 'Tue') for cross-browser reliability in client-side scripts.

## 2025-05-15 - Micro-UX feedback and Script isolation
**Learning:** Providing immediate button feedback (e.g., "Redirigiendo...") improves UX but errors in pre-execution logic (like date parsing) can block subsequent event listeners.
**Action:** Wrap independent logic in try-catch or ensure early initialization is robust to prevent breaking core features like form submissions.
