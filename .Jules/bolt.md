## 2026-03-29 - O(1) Active Accordion Tracking
**Learning:** In interactive accordion scripts (such as `FAQ.astro`), scanning all accordion items via `items.forEach` and running `querySelector` on every click creates unnecessary O(N) DOM query overhead during user interactions.
**Action:** Track active accordion DOM references (`activeTrigger`, `activeContainer`, `activeIcon`) inside the component initialization closure scope to collapse previously open items in O(1) time without DOM iteration.
