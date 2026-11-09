## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación de identificadores devueltos por webhooks externos
**Vulnerability:** Confiar implícitamente en identificadores generados externamente (`ticket_number`) al inyectarlos en la UI o parámetros dinámicos de URL.
**Learning:** Los webhooks externos de terceros o túneles de desarrollo pueden retornar payloads manipulados o malformados; si no se validan contra expresiones regulares restrictivas, pueden introducir parámetros o código inesperado en la interfaz y enlaces de navegación.
**Prevention:** Validar siempre el tipo y formato de identificadores devueltos por webhooks con una whitelist regex estricta (`/^[A-Z0-9\-_]{1,30}$/i`) y truncar longitud antes de mutar el DOM o la navegación.
