Importante!!! Quiero todos los pr en español
## 2025-05-15 - [Prevención de XSS en contenido dinámico de modales]
**Vulnerabilidad:** Cross-Site Scripting (XSS) vía inyección `innerHTML` de datos de configuración no sanitizados.
**Aprendizaje:** Incluso cuando los datos provienen de un archivo de config "local", si esos datos se renderizan en el DOM usando `innerHTML` en un script del lado del cliente, representa un riesgo XSS si la configuración puede ser influenciada por factores externos o si se considera entrada no confiable en un contexto más amplio.
**Prevención:** Siempre sanitizar o escapar contenido dinámico antes de inyectarlo en el DOM usando `innerHTML`. Preferir `textContent` o `innerText` cuando sea posible, pero si se necesita estructura HTML (ej., para items de lista), sanitizar los puntos de datos individuales.

## 2025-05-16 - [Endurecimiento de CSP y corrección de implementaciones de seguridad corruptas]
**Vulnerabilidad:** Correcciones de seguridad incompletas/corruptas y directivas CSP faltantes (`object-src`, `base-uri`).
**Aprendizaje:** Las correcciones de seguridad deben ser verificadas por corrección sintáctica y completitud; una fix parcialmente implementada o corrupta (ej., funciones duplicadas o tags sin cerrar) puede evadir protecciones previstas y romper builds. CSP debe incluir directivas para prevenir inyección de `<object>`/`<embed>` y secuestro de base-tag.
**Prevención:** Siempre ejecutar `pnpm build` y `pnpm astro check` después de cambios de seguridad. Consolidar utilidades de seguridad (como `escapeHtml`) y asegurar que se apliquen consistentemente a través de todos los puntos de inyección dinámica. Usar `object-src 'none'` y `base-uri 'self'` en CSP por defecto.

## 2025-06-03 - [Integridad del entorno y prevención de tab-nabbing]
**Vulnerabilidad:** Lockfile roto debido a claves duplicadas y `noopener,noreferrer` faltante en links externos de WhatsApp.
**Aprendizaje:** La integridad del entorno (lockfiles) es la base del tooling de seguridad; si está roto, `pnpm audit` no puede ejecutarse, dejando al proyecto ciego ante vulnerabilidades de dependencias. Redirecciones externas sin atributos `rel` apropiados permiten potencial reverse tab-nabbing. La duplicación/corrupción masiva de código puede enmascarar vulnerabilidades de seguridad y romper análisis estático.
**Prevención:** Mantener un `package.json` limpio para prevenir corrupción de lockfile. Siempre aplicar `rel="noopener noreferrer"` a todos los links `target="_blank"`. Ejecutar regularmente `pnpm astro check` para identificar y resolver duplicación de componentes o errores de sintaxis.

# Sentinel Journal - TechHealth

## 2025-05-13 - Mejora de seguridad: Content Security Policy y Referrer Policy
**Vulnerabilidad:** Headers de seguridad faltantes (CSP, Referrer-Policy).
**Aprendizaje:** Incluso los sitios estáticos se benefician de CSP para prevenir XSS potencial si alguna vez se agregan scripts de terceros o si ocurre inyección de datos.
**Prevención:** Siempre incluir headers de seguridad básicos en el layout principal.
