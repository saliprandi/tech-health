## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Validación defensiva de esquemas URI en redirecciones de botones CTA
**Vulnerability:** Redirección mediante `window.location.href` o `window.open()` utilizando atributos `href` de elementos del DOM sin sanear pseudoprotocolos inseguros (`javascript:`, `data:`, `vbscript:`).
**Learning:** Al interceptar eventos de clic en botones CTA con `e.preventDefault()`, validar solamente dominios HTTP no contempla rutas relativas (`/`) ni anclas (`#`), mientras que descuidar la verificación de esquemas ejecutables introduce riesgos de DOM XSS.
**Prevention:** Descartar explícitamente URIs que comiencen con pseudoprotocolos peligrosos (`/^(javascript|data|vbscript):/i`) antes de efectuar redirecciones de cliente.
