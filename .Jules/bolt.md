## 2026-03-31 - FAQ Accordion State Encapsulation
**Learning:** In Astro component scripts, declaring state tracking variables inside the `init` function (e.g. `initFAQ`) encapsulates state per component instance and across page transitions (`astro:after-swap`), preventing shared state leaks while enabling $O(1)$ accordion closing without $O(N)$ DOM queries.
**Action:** Always place component instance state inside the setup/init function rather than script module scope.
