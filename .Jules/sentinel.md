## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación por lista blanca de identificadores en respuestas asíncronas de webhook
**Vulnerability:** Asumir que las propiedades devueltas por webhooks externos (ej. `ticket_number` generado por n8n) son valores confiables antes de inyectarlas en el DOM o en parámetros de búsqueda de URL permite la manipulación de estados y potenciales inyecciones si el webhook o endpoint intermediario es comprometido o devuelve tipos inesperados.
**Learning:** Las respuestas de servicios externos asíncronos deben tratarse como entradas no confiables del usuario, validando estrictamente su tipo de dato, longitud y formato esperado mediante expresiones regulares seguras.
**Prevention:** Validar siempre que `typeof val === 'string'` y verificarlo contra una expresión regular restrictiva de lista blanca (ej. `/^[A-Z0-9\-_]{1,30}$/i`) antes de mutar el DOM o generar enlaces dinámicos.
