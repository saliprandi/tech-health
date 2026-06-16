Importante!!! Quiero todos los pr en español
## 2025-06-01 - Evitar commitear lockfiles y logs de runtime
**Aprendizaje:** En este entorno sandbox, ejecutar `pnpm install` o `pnpm add` genera/actualiza `pnpm-lock.yaml`. Commitear un lockfile grande o logs de runtime como `preview.log` es señalado como mala práctica y viola la limpieza del proyecto. Además, agregar dependencias sin instrucción explícita es una violación de límites.
**Acción:** Siempre verificar el estado de git o remover manualmente artefactos temporales y lockfiles antes del envío. Solo modificar `package.json` cuando se indique específicamente.

## 2026-06-14 - Optimización de renderizado y empaquetado Astro
**Aprendizaje:** El uso de `is:inline` en componentes Astro impide que Vite optimice y minifique los scripts, además de obligar al navegador a descargar el JS en cada carga sin aprovechar el empaquetado. `content-visibility: auto` es extremadamente efectivo para reducir el tiempo de pintado inicial en páginas de una sola sección larga (SPA-like).
**Acción:** Preferir siempre el paso de datos mediante atributos `data-*` para permitir scripts empaquetados. Aplicar `content-visibility: auto` con `contain-intrinsic-size` en todas las secciones debajo del fold.

## 2026-06-15 - Optimización de lógica de scroll y consolidación de eventos
**Aprendizaje:** El uso de `IntersectionObserver` para navegación puede volverse costoso si se itera sobre todos los enlaces en cada callback ($O(N)$). Mantener un `currentActiveLink` y usar un `Map` para lookups directos reduce la carga a $O(1)$. Además, consolidar manejadores de eventos (como en `WaFloat.astro`) reduce el número de bindings y mejora la eficiencia de memoria.
**Acción:** Implementar siempre lookups en Map y tracking de estado previo para evitar manipulaciones de DOM innecesarias en callbacks de alta frecuencia. Consolidar eventos compartidos (hover/focus) en handlers únicos.
