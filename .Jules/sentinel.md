## 2026-03-31 - Safe window.open popup features and WhatsApp domain validation
**Vulnerability:** Invoking `window.open(url, '_blank')` without `'noopener,noreferrer'` features in dynamic form submission handlers leaks `window.opener` references, exposing users to reverse tabnabbing and target redirection vulnerabilities.
**Learning:** `openedWin.opener = null` set post-invocation is insufficient compared to passing explicit `'noopener,noreferrer'` feature strings in `window.open()` while enforcing strict domain regex whitelist (`/^https:\/\/wa\.me\//i`) prior to navigation.
**Prevention:** Always validate target URL protocol and domain with regex whitelists prior to redirection and pass `'noopener,noreferrer'` directly in `window.open()` feature parameters.

## 2026-03-30 - Manejo defensivo de respuestas de webhook y deserialización dataset
**Vulnerability:** Invocar `res.json()` directamente sobre respuestas fetch HTTP no exitosas (o `JSON.parse()` sobre atributos HTML dataset) expone el código de cliente a errores de sintaxis/excepciones no capturadas.
**Learning:** En webhooks asíncronos y datos incrustados en datasets, las respuestas no-200 o modificadas pueden retornar contenido no-JSON que causa fallos catastróficos en el hilo JS principal.
**Prevention:** Verificar siempre `res.ok` antes de parsear JSON en peticiones fetch y envolver deserializaciones de datasets HTML en bloques `try...catch` con fallbacks seguros.
