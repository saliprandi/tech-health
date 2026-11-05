## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-30 - Directivas CSP y políticas no soportadas en etiquetas meta HTML
**Vulnerability:** Definir `frame-ancestors` o `Permissions-Policy` en etiquetas `<meta http-equiv>` genera una falsa sensación de protección contra Clickjacking o acceso a APIs de dispositivo, ya que los navegadores modernos las descartan completamente cuando no se envían como cabeceras HTTP reales.
**Learning:** Las especificaciones W3C de CSP Level 3 y Permissions Policy restringen ciertas directivas exclusivamente a cabeceras HTTP de respuesta del servidor.
**Prevention:** Utilizar en `<meta http-equiv="Content-Security-Policy">` únicamente directivas soportadas en HTML (`base-uri 'none'`, `upgrade-insecure-requests`, etc.) y evitar `<meta http-equiv="Permissions-Policy">`.
