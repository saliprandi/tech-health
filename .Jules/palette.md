## 2025-06-01 - [ScrollSpy and ARIA current]
**Learning:** Implementing ScrollSpy not only provides visual feedback but is also an opportunity to improve accessibility by using `aria-current="location"` on the active link. Using `IntersectionObserver` with a `rootMargin` that favors the top-middle of the viewport ensures the "active" section feels natural to the user's focus.
**Action:** Always combine visual "active" states with semantic ARIA attributes to ensure the UX improvement benefits all users, including those using assistive technologies.
