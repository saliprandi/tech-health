## 2026-03-31 - Directivas ignoradas en CSP meta y validación de esquema en redirección externa
**Vulnerability:** La inclusión de directivas como `frame-ancestors` o etiquetas `<meta http-equiv="Permissions-Policy">` en meta etiquetas HTML es ignorada por especificaciones W3C y navegadores modernos, generando falsa sensación de seguridad. Asimismo, ejecutar `window.open` con atributos `href` de botones CTA sin validar su prefijo/esquema permite posibles redirecciones inseguras o manipulación de protocolo.
**Learning:** Las meta etiquetas CSP HTML no soportan `frame-ancestors` ni `Permissions-Policy`. Adicionalmente, el manejo de eventos click en CTAs que invocan `window.open` debe validar explícitamente el origen antes de interceptar la navegación y aplicar estados de UI.
**Prevention:** Utilizar únicamente directivas soportadas en CSP meta (`base-uri 'none'; upgrade-insecure-requests;`) y verificar `href` mediante regex de dominios permitidos (`/^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i`) antes de abrir ventanas emergentes.

## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.
