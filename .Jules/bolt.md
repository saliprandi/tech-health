## 2026-03-30 - O(1) State Tracking for Accordion UI
**Learning:** In interactive client-side components with single-active accordion patterns (such as FAQ triggers), tracking a reference to the active element (`activeItem`) in component closure scope avoids running O(N) DOM query loops over all items on every user click event.
**Action:** Always maintain active element references in client-side component scripts when managing single-active UI states.
