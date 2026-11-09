## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Sanitización y validación estricta de identifiers devueltos por webhooks externos
**Vulnerability:** Aceptar identifiers o tokens devueltos por webhooks (como `ticket_number` en el webhook de solicitudes) e inyectarlos directamente en el DOM o en parámetros URL de navegación sin validación previa.
**Learning:** Respuestas comprometidas o maliciosas de servicios webhooks externos de terceros pueden contener payloads inyectados que se propagan a través de parámetros de consulta y elementos HTML interactivos.
**Prevention:** Tratar siempre las respuestas de webhooks como datos no confiables; verificar tipo estricto (`typeof === 'string'`) y contrastar contra una expresión regular de lista blanca restrictiva (`/^[A-Z0-9\-_]{1,30}$/i`) antes de usar el valor en la UI o navegación.
