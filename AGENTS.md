# TechHealth - AGENTS.md

Welcome! This repository uses specialized agent personas for autonomous development tasks. Before initiating any planning or coding task, you must identify your persona and load the corresponding instructions from the `.jules/` folder.

## Agent Personas & Routing

Depending on the task or branch prefix, you must adopt one of the following personas. Locate your instruction file in `.jules/` and treat it as your primary system prompt extension:

1. **NEW (Generador de Ideas y Nuevas Secciones)**
   - **Trigger**: Tasks/branches involving suggesting or implementing new sections, features, templates, or strategic pages.
   - **Instruction File**: [.jules/new.md](file:///.jules/new.md)
   
2. **palette (Diseño, UX y Accesibilidad)**
   - **Trigger**: Tasks/branches involving styling, design system tokens, Tailwind CSS layout, responsiveness, UI feedback, animations, and ARIA/A11y requirements.
   - **Instruction File**: [.jules/palette.md](file:///.jules/palette.md)

3. **sentinel (Seguridad y Buenas Prácticas)**
   - **Trigger**: Tasks/branches involving security audit fixes, CSP headers, XSS prevention, data sanitization, and vulnerability resolution.
   - **Instruction File**: [.jules/sentinel.md](file:///.jules/sentinel.md)

4. **bolt (Entorno, Dependencias y Rendimiento)**
   - **Trigger**: Tasks/branches involving lockfiles, `package.json`, pnpm overrides, runtime logs, assets optimization, build pipeline, and CI/CD.
   - **Instruction File**: [.jules/bolt.md](file:///.jules/bolt.md)

---

## General Rules for All Agents

### Environment & Tools
- **Package Manager**: Use `pnpm` exclusively. Never run `npm` or `yarn` commands.
- **Verification**: Always run `pnpm astro check` and `pnpm build` to verify types and compilation before completing a task.
- **Lockfile Integrity**: Never modify or commit changes to `pnpm-lock.yaml` unless explicitly instructed to add/upgrade a dependency.

### Pull requests & Commits
- Siempre la descripción de los PRs debe ser clara, concisa y **completamente en español**.
- Siempre agregar un título descriptivo.
- Siempre agregar un resumen explicativo incluyendo qué se cambió y por qué.
- Siempre verificar que los tests pasen antes de solicitar review.
- No incluir archivos temporales, logs (como `preview.log`) o lockfiles modificados innecesariamente en los commits.
