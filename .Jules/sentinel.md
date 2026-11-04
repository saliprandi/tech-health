## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-11-02 - Directivas CSP y Permissions-Policy en etiquetas meta HTML
**Vulnerability:** Declarar `frame-ancestors` o `Permissions-Policy` dentro de `<meta http-equiv="...">` crea una falsa sensación de seguridad contra clickjacking y control de permisos, ya que los navegadores modernos ignoran estas directivas en meta tags HTML.
**Learning:** Las especificaciones W3C de Content Security Policy y Feature/Permissions Policy establecen explícitamente que `frame-ancestors` y Permissions-Policy solo tienen efecto cuando se envían en cabeceras HTTP de respuesta nativas. En etiquetas `<meta http-equiv="Content-Security-Policy">`, las directivas válidas de hardening son `base-uri 'none'`, `object-src 'none'` y `upgrade-insecure-requests`.
**Prevention:** No incluir directivas no soportadas en meta tags y forzar HTTPS mediante `upgrade-insecure-requests;` en todos los layouts que utilicen meta CSP.
