## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación estricta de identificadores de tickets de webhooks y aislamiento de ventanas externas
**Vulnerability:** Inyección directa de identificadores (`ticket_number`) devueltos por webhooks externos en el DOM y en parámetros de búsqueda de URL sin validación de tipo ni formato regex, combinado con aperturas `window.open` que utilizaban fallbacks de redirección de contexto.
**Learning:** Las respuestas de servicios o webhooks de terceros deben tratarse como entradas no confiables (untrusted input); si el webhook retorna caracteres de inyección o formatos inesperados, estos pueden propagarse al DOM o a parámetros de navegación. Además, `window.open` con `noopener,noreferrer` aísla de forma segura el contexto de navegación sin requerir manipulaciones manuales del objeto ventana retornado.
**Prevention:** Validar siempre `typeof val === 'string'` contra expresiones regulares estrictas de lista blanca (`/^[A-Z0-9\-_]{1,30}$/i`) antes de inyectar datos de webhooks en el DOM o URLs, y utilizar `window.open(url, '_blank', 'noopener,noreferrer')` directamente.
