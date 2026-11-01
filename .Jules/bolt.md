## 2026-03-31 - Preloading LCP Header Logo and Fetch Priority

**Learning:** Preloading the primary above-the-fold logo image (`/logo-name.svg`) via `<link rel="preload">` in the layout `<head>` and pairing it with `fetchpriority="high"` on the `<img>` element eliminates network discovery delays and improves Largest Contentful Paint (LCP) performance on subpages like `/estado`.

**Action:** Always include `<link rel="preload" as="image" fetchpriority="high">` in page layout head section for key above-the-fold brand images.

## 2026-04-01 - Micro-optimización en búsqueda de FAQ con dataset reducido

**Learning:** Pre-cachear `textContent` y referencias a nodos del DOM en la búsqueda interactiva de preguntas frecuentes cuando la cantidad de elementos es reducida ($N \approx 5-10$) no aporta un beneficio perceptible de rendimiento y puede desincronizar el filtrado si el contenido del DOM cambia.

**Action:** Evitar micro-optimizaciones en filtros o búsquedas sobre colecciones estáticas pequeñas; priorizar cuellos de botella con datasets grandes o tareas intensivas en la CPU/red.
