## 2026-03-31 - FAQ Accordion Reference Caching
**Learning:** In interactive accordion components, iterating over all DOM elements on every toggle event to query child elements (`querySelector`) and check state creates unnecessary O(N) DOM queries and layout thrashing.
**Action:** Track currently active accordion references (`activeTrigger`, `activeContainer`, `activeIcon`) in closure scope during initialization to enable O(1) direct state updates when toggling items.
