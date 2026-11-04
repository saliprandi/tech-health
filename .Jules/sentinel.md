## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-10-14 - Directivas CSP y políticas de seguridad no admitidas en etiquetas meta HTML
**Vulnerability:** Incluir directivas como `frame-ancestors` en etiquetas `<meta http-equiv="Content-Security-Policy">` o usar `<meta http-equiv="Permissions-Policy">` genera una falsa sensación de protección, ya que son ignoradas por navegadores modernos según el estándar W3C CSP nivel 2/3.
**Learning:** Las directivas de enmarcado (`frame-ancestors`) y las políticas de permisos solo son válidas cuando se entregan mediante cabeceras de respuesta HTTP reales del servidor/edge; en etiquetas meta HTML producen advertencias de consola y no mitigan ataques de clickjacking.
**Prevention:** Configurar directivas válidas para meta tags (`base-uri 'none'`, `upgrade-insecure-requests;`) en el HTML estático y reservar `frame-ancestors` y `Permissions-Policy` exclusivamente para la configuración de cabeceras de servidor/CDN.
