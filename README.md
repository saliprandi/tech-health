# TechHealth — Medical Engineering

Sitio web institucional de **TechHealth**, empresa tucumana de ingeniería clínica especializada en mantenimiento preventivo y correctivo, diagnóstico y reparación de equipos médicos de alta complejidad.

Construido con [Astro](https://astro.build/) (SSG) + Tailwind CSS. Deploy en GitHub Pages → [techhealth.com.ar](https://techhealth.com.ar).

## Estructura

```text
/
├── public/              # assets estáticos (logo, favicon, og-image, sitemap, CNAME)
├── src/
│   ├── components/      # secciones de la landing (Hero, Servicios, Contacto, etc.)
│   ├── data/config.ts   # configuración central: empresa, contacto, equipo, servicios, FAQs
│   ├── layouts/         # Layout.astro (head, SEO, CSP, JSON-LD)
│   ├── pages/index.astro
│   └── styles/global.css
├── tests/              # tests E2E/UX/A11y con Playwright
├── scripts/            # generación de favicon
└── astro.config.mjs
```

Todo el contenido editable vive en `src/data/config.ts`.

## Comandos

> Usar `pnpm` exclusivamente (nunca `npm` ni `yarn`).

| Comando              | Acción                                            |
| :------------------- | :------------------------------------------------ |
| `pnpm install`       | Instala dependencias                              |
| `pnpm dev`           | Servidor de desarrollo en `localhost:4321`         |
| `pnpm build`         | Build de producción a `./dist/`                   |
| `pnpm preview`       | Previsualiza el build localmente                  |
| `pnpm astro check`   | Verificación de tipos de Astro                    |

## Verificación

Antes de finalizar una tarea, ejecutar:

```sh
pnpm astro check && pnpm build
```

## Desarrollo con agentes

El repositorio define personas de agente en `AGENTS.md` (instrucciones en `.jules/`):
`new`, `palette`, `sentinel` y `bolt`. Consultar `AGENTS.md` y `ADR.md` para detalles.
