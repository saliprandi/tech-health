## 2025-05-22 - [Broken Astro build due to corrupted component]
**Vulnerability:** XSS (missing sanitization), Tabnabbing (missing rel attributes), and Outdated dependencies with known CVEs.
**Learning:** The `Servicios.astro` component was severely corrupted with multiple duplicated logic blocks, which not only caused build failures but also introduced security gaps where attributes were missing in some copies but present in others.
**Prevention:** Always verify `pnpm build` after any modification to Astro components. Use automated tests (`playwright`) to verify security attributes on dynamic elements that are injected via `innerHTML`.
# Sentinel Journal - TechHealth

## 2025-05-13 - Mejora de seguridad: Content Security Policy y Referrer Policy
**Vulnerabilidad:** Headers de seguridad faltantes (CSP, Referrer-Policy).
**Aprendizaje:** Incluso los sitios estáticos se benefician de CSP para prevenir XSS potencial si alguna vez se agregan scripts de terceros o si ocurre inyección de datos.
**Prevención:** Siempre incluir headers de seguridad básicos en el layout principal.

## 2025-03-08 - Corrección de corrupción estructural y fijación de dependencias
**Vulnerabilidad:** Corrupción de código masiva en componentes Astro y vulnerabilidades XSS conocidas en versiones antiguas de `astro` (`define:vars`).
**Aprendizaje:** La corrupción sintáctica en archivos `.astro` (tags sin cerrar, duplicación de scripts) no solo rompe el build sino que puede facilitar la inyección de código al evadir protecciones del compilador. Fijar la versión de `astro` a una versión parcheada (`6.4.4`) es crucial para la seguridad contra XSS.
**Prevención:** Utilizar siempre `pnpm astro check` para validar la integridad estructural y preferir versiones fijas de dependencias críticas de seguridad.
