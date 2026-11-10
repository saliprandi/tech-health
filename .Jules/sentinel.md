## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación estricta de identificadores de webhook y paso de noopener en window.open
**Vulnerability:** Procesar identificadores externos devueltos por webhooks (ej. `ticket_number`) sin validación de tipo ni formato con whitelist, o invocar `window.open` con fallbacks que asumen que el valor de retorno nulo indica bloqueo de popup cuando se pasa `'noopener'`.
**Learning:** Los datos provenientes de webhooks externos deben considerarse no confiables antes de inyectarse en el DOM o en parámetros de URL. Además, según la especificación W3C, `window.open` con `'noopener'` intencionalmente retorna `null`; evaluar `if (!openedWin) window.location.href = url` causa una navegación no deseada que destruye el estado de confirmación del formulario en la ventana actual.
**Prevention:** Validar siempre `ticket_number` con una expresión regular estricta `/^[A-Z0-9\-_]{1,30}$/i` y utilizar `window.open(url, '_blank', 'noopener,noreferrer')` directamente para evitar tabnabbing sin destruir el estado de la página.
