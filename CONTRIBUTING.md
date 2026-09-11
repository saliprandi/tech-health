# Guia de contribucion

Gracias por tu interes en contribuir a TechHealth. Este proyecto usa un sistema de **agentes especializados** para el desarrollo autonomo.

## Antes de empezar

1. Leé [AGENTS.md](./AGENTS.md) para entender el sistema de personas (`new`, `palette`, `sentinel`, `bolt`).
2. Cada persona tiene instrucciones especificas en `.jules/` (archivos locales, no commiteados) — leelas antes de trabajar.
3. Revisá [ADR.md](./ADR.md) para entender las decisiones arquitectonicas tomadas.

## Reglas generales

- **Package manager**: Usar `pnpm` exclusivamente. Nunca `npm` ni `yarn`.
- **Lockfile**: No modificar `pnpm-lock.yaml` salvo que se agregue/actualice una dependencia explicitamente.
- **Verificacion**: Antes de finalizar, ejecutar `pnpm astro check && pnpm build`.
- **Commits**: Mensajes en español, con el prefijo de la persona correspondiente (`🎨 Palette`, `🛡️ Sentinel`, `⚡ Bolt`, `✨ New`).
- **PRs**: Descripcion en español, clara y concisa. Explicar que se cambio y por que.

## Flujo de trabajo

1. Crear una branch con el prefijo de la persona (`palette/...`, `sentinel/...`, `bolt/...`, `new/...`).
2. Hacer los cambios siguiendo las convenciones del proyecto.
3. Verificar con `pnpm astro check && pnpm build`.
4. Abrir un PR con descripcion en español.
5. Asegurarse de que el CI pase antes de solicitar review.

## Estructura del proyecto

Todo el contenido editable vive en `src/data/config.ts`. Los componentes estan en `src/components/`. Para mas detalle, ver el [README.md](./README.md).
