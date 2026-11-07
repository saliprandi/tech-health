## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.

## 2026-03-31 - Validación de datos devueltos por webhooks externos y redirección segura
**Vulnerability:** Procesar identificadores recibidos desde webhooks de terceros sin validación de tipo ni formato permite inyectar datos no confiables en enlaces y DOM; además, redirigir mediante `window.open` sin parámetros de seguridad expone a tabnabbing y fuga de cabeceras Referer.
**Learning:** Las respuestas de servicios o webhooks asíncronos externos deben considerarse datos no confiables (untrusted input) y validarse contra listas blancas de formato antes de asignarse a URLs o renderizarse en el DOM.
**Prevention:** Validar siempre con expresiones regulares estrictas los identificadores devueltos por webhooks y utilizar `noopener,noreferrer` junto con verificación de dominio/protocolo en aperturas programáticas de enlaces.
