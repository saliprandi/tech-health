## 2026-09-30 - O(1) Accordion Active Item Tracking in Client Scripts

**Learning:** In client-side Astro script components managing single-expand accordions, iterating over all DOM items (`items.forEach`) on every click event triggers $3 \times (N-1)$ redundant DOM query calls (`querySelector`). Tracking `activeTrigger`, `activeContainer`, and `activeIcon` references in the component initialization scope allows $O(1)$ constant time lookup and atomic state closing without scanning or querying the DOM.

**Action:** Maintain active element references in client script closures for accordion and modal interfaces instead of querying all sibling DOM nodes on interaction events.
