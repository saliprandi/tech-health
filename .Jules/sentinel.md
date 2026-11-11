## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validacion de prefijo de origen en redirecciones dinamicas via window.open
**Vulnerability:** Invocar `window.open(href)` sobre URLs obtenidas dinámicamente de atributos DOM sin validar el prefijo del protocolo u origen expone a la aplicación a redirecciones abiertas o ejecución de esquemas de URL arbitrarios (`javascript:`).
**Learning:** Los scripts de componentes cliente que manejan clics en botones CTA leen `getAttribute('href')` en tiempo de ejecución. Si el atributo DOM es manipulado en el navegador, la invocación ciega de `window.open` redirige a destinos no confiables.
**Prevention:** Validar siempre que `href` comience con los prefijos de origen o esquemas permitidos (ej. `if (href && href.startsWith('https://wa.me/'))`) antes de pasar la URL a `window.open()`.
