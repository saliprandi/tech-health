## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación de protocolo y dominio en redirecciones programáticas con window.open
**Vulnerability:** En controladores de botones CTA externos (`Hero.astro` y `Nav.astro`), leer `href` del DOM y pasarlo directamente a `window.open` sin validar protocolo ni dominio abre riesgos de redirección arbitraria o ejecución de esquemas no seguros si el enlace es alterado en tiempo de ejecución.
**Learning:** Mantener la tupla de características `'noopener,noreferrer'` en `window.open(url, '_blank', 'noopener,noreferrer')` es el estándar estricto que previene el acceso al contexto de navegación y evita la fuga de cabeceras Referer, requiriendo además validación previa de whitelist para el destino.
**Prevention:** Validar siempre `href` con whitelist de dominios seguros (`/^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i`) antes de invocar `window.open` y conservar siempre `'noopener,noreferrer'`.
