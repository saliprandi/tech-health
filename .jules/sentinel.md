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

## 2026-06-09 - [Corrupción estructural y brechas de seguridad en componentes Astro]
**Vulnerability:** XSS (falta de sanitización), Tabnabbing (falta de atributos rel) y dependencias desactualizadas.
**Learning:** La duplicación de bloques de código en archivos .astro, producto de errores de fusión, genera inconsistencias donde las protecciones de seguridad se aplican en una parte del archivo pero no en la otra. Además, el uso de 'textContent' para resetear botones que contienen iconos en HTML puede romper la UI si no se maneja correctamente.
**Prevention:** Realizar refactorizaciones completas de componentes cuando se detecte duplicación masiva. Validar siempre la persistencia de atributos de seguridad en elementos dinámicos. Utilizar 'pnpm overrides' para mitigar vulnerabilidades en dependencias transitivas de herramientas de construcción como 'to-ico'.

## 2026-06-11 - [Mitigación de XSS mediante saneamiento sistemático y limpieza estructural]
**Vulnerability:** XSS potencial por inyección de contenido dinámico no saneado mediante `innerHTML`.
**Learning:** La corrupción estructural en componentes Astro facilita la evasión de medidas de seguridad si el saneamiento (como `escapeHtml`) no se aplica de manera uniforme en todos los bloques de código concurrentes. Refactorizar para consolidar la lógica interactiva es un prerrequisito para garantizar la integridad de la seguridad.
**Prevention:** Enmascarar todo contenido dinámico inyectado vía `innerHTML` con una función de escape robusta y asegurar que la inicialización de scripts maneje correctamente los eventos de navegación de Astro (`astro:after-swap`) para evitar duplicación de listeners.

## 2026-06-15 - [Refuerzo de seguridad: Validación de entradas y prevención de inyección en JSON-LD]
**Vulnerability:** Riesgo de XSS por inyección de scripts en bloques de datos estructurados (JSON-LD) y falta de validación en formularios.
**Learning:** El uso de `JSON.stringify` con `set:html` en Astro permite que caracteres como `<` rompan el contexto del script. Asimismo, la falta de límites de longitud en entradas facilita ataques de denegación de servicio local o desbordamientos visuales.
**Prevention:** Escapar siempre el carácter `<` en salidas JSON inyectadas en HTML y aplicar atributos `maxlength` y `pattern` en todos los inputs públicos.

## 2026-06-24 - [Sanitización de enlaces externos y corrección de corrupción estructural]
**Vulnerability:** Tabnabbing (falta de rel="noopener noreferrer"), inyección potencial por números malformados en URLs de WhatsApp y bypass de protecciones por corrupción de código.
**Learning:** La duplicación masiva de código en componentes Astro no solo genera errores de build, sino que puede desactivar protecciones críticas como honeypots y validaciones si el script resultante es inválido. La sanitización de entradas de configuración antes de su uso en URLs dinámicas es vital para la defensa en profundidad.
**Prevention:** Aplicar siempre `.replace(/\D/g, '')` a números de teléfono en enlaces y asegurar la integridad estructural del componente mediante `astro check` para garantizar que las medidas de seguridad del cliente se ejecuten correctamente.
