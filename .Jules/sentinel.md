## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-31 - Validación de datos en respuestas de webhook y aislamiento de contexto al abrir WhatsApp
**Vulnerability:** Confiar implícitamente en identificadores retornados por webhooks externos (ej. `ticket_number` para inyección en URLs y DOM) y fallback condicional `window.location.href = url` cuando `window.open(..., 'noopener')` retorna null por diseño.
**Learning:** Según la especificación W3C, `window.open(url, '_blank', 'noopener,noreferrer')` retorna `null` para aislar contextos; usar `if (!openedWin) window.location.href = url` provoca redirección forzada no deseada. Además, las respuestas de endpoints externos deben considerarse datos no confiables.
**Prevention:** Validar identificadores externos contra una expresión regular estricta (`/^[A-Z0-9\-_]{1,30}$/i`) antes de inyectarlos en DOM o atributos `href`, y ejecutar `window.open` con `'noopener,noreferrer'` sin evaluar `openedWin` para redirección destructiva en la misma ventana.
