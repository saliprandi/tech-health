## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-31 - Validación estricta y saneamiento de identificadores retornados por webhooks
**Vulnerability:** Inyectar propiedades devueltas por servicios de terceros/webhooks (ej. `ticket_number`) directamente en el DOM o en parámetros de URLs (`/estado?ticket=...`) sin validación previa asumiendo que el backend siempre responde con datos válidos.
**Learning:** Aunque un endpoint esté bajo control operativo o intermediado por n8n/Cloudflare, respuestas interceptadas, modificadas o malformadas que contengan caracteres no previstos o cargas maliciosas pueden propagarse al DOM o alterar flujos de navegación si no se verifican en el cliente.
**Prevention:** Tratar siempre las respuestas de webhooks como entrada no confiable: validar tipo de dato explícito (`typeof === 'string'`) y contrastar con una whitelist regex estricta (`/^[A-Z0-9\-_]{1,30}$/i`) antes de mutar el DOM o construir hipervínculos.
