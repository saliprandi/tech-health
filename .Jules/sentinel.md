## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación de prefijo de origen en redirecciones con window.open
**Vulnerability:** Invocar `window.open(href, ...)` leyendo atributos `href` directamente del DOM sin validar la URL expone la aplicación a redirecciones no deseadas o ejecución de esquemas de URI arbitrarios (`javascript:`).
**Learning:** Aunque las URLs de los enlaces CTA se generen dinámicamente en plantillas Astro, modificaciones en el DOM o scripts de terceros pueden alterar el atributo `href` antes de hacer clic.
**Prevention:** Validar siempre que `href` comience con un prefijo de origen o protocolo de confianza (ej. `href.startsWith('https://wa.me/')`) antes de pasarlo a `window.open()`.
