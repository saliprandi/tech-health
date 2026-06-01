## 2025-06-01 - Avoid committing lockfiles and runtime logs
**Learning:** In this sandbox environment, running `pnpm install` or `pnpm add` generates/updates `pnpm-lock.yaml`. Committing a large lockfile or runtime logs like `preview.log` is flagged as poor practice and violates project cleanliness. Also, adding dependencies without explicit instruction is a boundary violation.
**Action:** Always verify git status or manually remove temporary artifacts and lockfiles before submission. Only modify `package.json` when specifically instructed.
