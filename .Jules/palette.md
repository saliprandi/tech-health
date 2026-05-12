## 2026-05-12 - Interactive Cards and Modal Accessibility Pattern
**Learning:** Found that interactive 'div' cards used to trigger modals lacked basic accessibility (keyboard support, ARIA roles). Also, the detail modal lacked focus management and trapping.
**Action:** Always add 'role="button"', 'tabindex="0"', and keyboard listeners (Enter/Space) to card-like buttons. Ensure modals follow a strict focus management pattern: focus close button on open, restore focus on close, and implement focus trapping logic.
