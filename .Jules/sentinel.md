## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación de origen en redirecciones CTA mediante window.open
**Vulnerability:** Invocar `window.open(href)` recuperando `href` dinámicamente desde el DOM sin validar el prefijo del origen permite redirecciones no autorizadas o ejecución de esquemas de URL arbitrarios (ej. `javascript:`) si los atributos DOM son modificados.
**Learning:** Incluso si los enlaces iniciales son estáticos en Astro, los manejadores de eventos client-side leen los atributos del DOM en tiempo de ejecución.
**Prevention:** Validar siempre `href.startsWith('https://wa.me/')` u orígenes de confianza antes de llamar a `window.open()`.
