## 2026-03-31 - Cache Active Accordion References in Component Closure Scope
**Learning:** In Astro component scripts, tracking currently expanded accordion elements (`activeTrigger`, `activeContainer`, `activeIcon`) inside `initFAQ()` function closure scope eliminates O(N) DOM query iterations across all items on toggle events while ensuring state encapsulation across page transitions.
**Action:** Always prefer caching active element references in closure scope for interactive accordion and menu components instead of querying the DOM for all items on every user click.
