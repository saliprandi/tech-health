## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Invalidez de directiva frame-ancestors en metadatos CSP HTML
**Vulnerability:** Especificar `frame-ancestors` en etiquetas HTML `<meta http-equiv="Content-Security-Policy">` es ignorado completamente por navegadores según la especificación W3C CSP Level 2/3.
**Learning:** Intentar configurar protección contra clickjacking (`frame-ancestors`) en etiquetas `<meta>` genera falsa sensación de seguridad (teatro de seguridad) sin brindar protección real.
**Prevention:** Omitir `frame-ancestors` de meta etiquetas HTML y configurarlo únicamente a través de encabezados HTTP de respuesta del servidor (como `Content-Security-Policy` o `X-Frame-Options`).
