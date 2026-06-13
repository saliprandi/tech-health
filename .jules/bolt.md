Importante!!! Quiero todos los pr en español
## 2025-06-01 - Evitar commitear lockfiles y logs de runtime
**Aprendizaje:** En este entorno sandbox, ejecutar `pnpm install` o `pnpm add` genera/actualiza `pnpm-lock.yaml`. Commitear un lockfile grande o logs de runtime como `preview.log` es señalado como mala práctica y viola la limpieza del proyecto. Además, agregar dependencias sin instrucción explícita es una violación de límites.
**Acción:** Siempre verificar el estado de git o remover manualmente artefactos temporales y lockfiles antes del envío. Solo modificar `package.json` cuando se indique específicamente.

## 2025-06-13 - Optimización de elementos vinculados al scroll
**Learning:** El uso de listeners de scroll sin optimizar puede causar "Layout Thrashing" si se consultan propiedades como `scrollHeight` repetidamente. Implementar `requestAnimationFrame` y cachear dimensiones del layout en el evento `resize` reduce significativamente la carga del hilo principal.
**Action:** Usar `requestAnimationFrame` para actualizaciones de DOM en scroll y mover lecturas de layout pesadas a handlers de `resize` o inicialización.
