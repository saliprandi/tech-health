## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-04-03 - Restricciones de especificación W3C en meta tags CSP y Permissions-Policy
**Vulnerability:** Incluir directivas como `frame-ancestors` en meta tags `<meta http-equiv="Content-Security-Policy">` o definir `<meta http-equiv="Permissions-Policy">` genera advertencias en consola y es ignorado por los navegadores modernos, creando una falsa sensación de protección contra ataques como clickjacking.
**Learning:** Las especificaciones W3C de CSP (Nivel 2 y 3) y Permissions-Policy establecen taxativamente que `frame-ancestors` y Permissions-Policy solo son válidos cuando se entregan mediante cabeceras de respuesta HTTP reales emitidas por el servidor web o CDN.
**Prevention:** Mantener en meta tags CSP únicamente directivas formalmente soportadas en HTML (`default-src`, `script-src`, `style-src`, `img-src`, `connect-src`, `base-uri`, `object-src`, `upgrade-insecure-requests`) y delegar `frame-ancestors` y `Permissions-Policy` exclusivamente a la configuración de headers HTTP del servidor o proxy inverso.
