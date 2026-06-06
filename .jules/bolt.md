Importante!!! Quiero todos los pr en español
## 2025-06-01 - Evitar commitear lockfiles y logs de runtime
**Aprendizaje:** En este entorno sandbox, ejecutar `pnpm install` o `pnpm add` genera/actualiza `pnpm-lock.yaml`. Commitear un lockfile grande o logs de runtime como `preview.log` es señalado como mala práctica y viola la limpieza del proyecto. Además, agregar dependencias sin instrucción explícita es una violación de límites.
**Acción:** Siempre verificar el estado de git o remover manualmente artefactos temporales y lockfiles antes del envío. Solo modificar `package.json` cuando se indique específicamente.
