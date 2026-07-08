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

## 2026-06-16 - Consolidación de componentes corruptos y optimización de constructores
**Aprendizaje:** Los archivos que sufren corrupciones estructurales (duplicación masiva de bloques) no solo rompen el build por redeclaración de variables, sino que degradan el performance por ejecución redundante de intervalos y listeners. Además, instanciar objetos costosos como `Intl.DateTimeFormat` dentro de funciones de inicialización que se ejecutan en cada `astro:after-swap` genera overhead innecesario.
**Acción:** Realizar limpiezas quirúrgicas para consolidar la lógica en una sola instancia funcional. Mover la instanciación de objetos de configuración (formatters, observers) fuera de las funciones de ciclo de vida para aprovechar el cacheo del motor de JS.

## 2026-06-17 - Optimización de formateo de fecha y reparación estructural
**Aprendizaje:** La instanciación de `Intl.DateTimeFormat` dentro de funciones repetitivas o ciclos de inicialización genera un overhead innecesario. Extraer el formateador a un scope superior y optimizar la extracción de partes (evitando múltiples llamadas a `.find()`) mejora la eficiencia de ejecución en actualizaciones frecuentes (como badges de estado). Además, la eliminación de código duplicado masivo reduce el tamaño del bundle y el tiempo de parsing del DOM.
**Acción:** Cachear siempre constructores de objetos costosos fuera de los paths de ejecución de alta frecuencia y utilizar iteraciones de un solo paso para la extracción de datos de arrays de partes.

## 2026-06-18 - Optimización de ciclos de CPU mediante IntersectionObserver y Cacheo de Estado
**Aprendizaje:** Los timers persistentes en componentes (como el badge de horario) consumen ciclos de CPU y batería incluso si no están visibles. El uso de IntersectionObserver para 'pausar' estos intervalos es crucial para la eficiencia energética y de procesamiento. Además, comparar el nuevo estado calculado con el anterior antes de manipular el DOM evita layout recalculations innecesarias.
**Acción:** Implementar siempre un guard de estado (`lastBadgeState`) y vincular tareas periódicas de fondo al viewport mediante IntersectionObserver para minimizar el impacto en el main thread.
