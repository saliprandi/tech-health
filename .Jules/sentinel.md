## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-04-03 - Directivas CSP y cabeceras de seguridad no soportadas en meta tags HTML
**Vulnerability:** Definir `frame-ancestors` dentro de `<meta http-equiv="Content-Security-Policy">` o usar `<meta http-equiv="Permissions-Policy">` genera "security theater" al no ser ejecutadas por el navegador.
**Learning:** Las especificaciones W3C de CSP (Nivel 2/3) y Permissions Policy establecen que los navegadores deben ignorar explícitamente `frame-ancestors` y Permissions-Policy cuando se entregan mediante etiquetas `<meta>`. Esto creaba una falsa sensación de protección contra ataques de clickjacking.
**Prevention:** Para HTML estático vía `<meta http-equiv="Content-Security-Policy">`, utilizar directivas soportadas de hardening como `base-uri 'none'` y `upgrade-insecure-requests;`. Reservar `frame-ancestors` y Permissions-Policy exclusivamente para cabeceras HTTP emitidas a nivel de servidor o CDN.
