## 2026-03-31 - Validación de esquemas y pseudoprotoprotocolos en redirecciones CTA de cliente
**Vulnerability:** Invocaciones a `window.open(cta.getAttribute('href'))` en manejadores de eventos click de CTA sin validar el esquema/protocolo del atributo `href` permiten redirecciones inseguras o ejecución de scripts mediante pseudoprotocolos (`javascript:`, `data:`).
**Learning:** Aunque un elemento `<a>` tenga un valor seguro inicial en el HTML estático, la manipulación de atributos DOM en el cliente puede inyectar pseudoprotoprotocolos peligrosos que `window.open` ejecuta inmediatamente si no se valida previamente el esquema URL.
**Prevention:** Desinfectar y validar siempre los valores de `href` extraídos dinámicamente con expresiones regulares contra pseudoprotocolos peligrosos (`/^(javascript|data|vbscript):/i`) y verificar prefijos seguros (`https://wa.me/` o esquemas `http://`/`https://`) antes de invocar `window.open`.

## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.
