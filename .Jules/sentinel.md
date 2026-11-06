## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Directivas CSP y políticas ignoradas en etiquetas meta HTML
**Vulnerability:** Especificar directivas como `frame-ancestors` o etiquetas `Permissions-Policy` dentro de `<meta http-equiv>` genera una falsa sensación de seguridad, ya que los navegadores modernos las descartan completamente según el estándar W3C.
**Learning:** `frame-ancestors` y `Permissions-Policy` solo son procesadas por navegadores cuando se envían a través de cabeceras de respuesta HTTP reales del servidor, disparando advertencias en consola si se colocan en el HTML estático.
**Prevention:** Para CSP en meta tags estáticos, usar directivas cliente válidas (`base-uri 'none'`, `upgrade-insecure-requests;`, `object-src 'none'`) y no incluir `frame-ancestors` ni meta `Permissions-Policy`.
