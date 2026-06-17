Importante!!! Quiero todos los pr en español
## 2025-05-15 - Restricción 'numeric' de Intl.DateTimeFormat
**Aprendizaje:** Usar `weekday: 'numeric'` en `Intl.DateTimeFormat` no está soportado en muchos entornos y causa un `RangeError`.
**Acción:** Usar `weekday: 'short'` o `'long'` y comparar valores de texto (ej., 'Mon', 'Tue') para una confiabilidad cross-browser en scripts del lado del cliente.

## 2025-05-15 - Micro-UX feedback y aislamiento de scripts
**Aprendizaje:** Proporcionar feedback inmediato en botones (ej., "Redirigiendo...") mejora la UX, pero errores en la lógica de pre-ejecución (como parsing de fechas) pueden bloquear listeners de eventos posteriores.
**Acción:** Envolver lógica independiente en try-catch o asegurar que la inicialización temprana sea robusta para evitar romper funcionalidades core como envíos de formularios.
## 2025-05-15 - [UX: Feedback de interacción con animaciones]
**Aprendizaje:** Agregar animaciones sutiles (como 'heartbeat' para íconos médicos) en group-hover proporciona un feedback agradable que refuerza la identidad de marca (ingeniería médica) sin ser intrusivo.
**Acción:** Definir keyframes personalizados en `tailwind.config.mjs` y usar `group-hover` en contenedores padre para disparar animaciones en íconos SVG hijos.
## 2025-05-15 - [Modales accesibles en Astro]
**Aprendizaje:** Transicionar una lista estática a un modal interactivo requiere una gestión cuidadosa del foco y roles ARIA. Usar `invisible` junto con `opacity-0` es crucial para asegurar que el contenido del modal oculto esté realmente "ausente" para lectores de pantalla y navegación por teclado durante las transiciones.
**Acción:** Siempre usar `role="dialog"`, `aria-modal="true"`, e implementar trampas de foco o restauración de foco para cualquier implementación de modal. Asegurar que los disparadores interactivos tengan `role="button"` y listeners de teclado.
## 2025-05-15 - Patrón de modal accesible
**Aprendizaje:** Implementar gestión de foco (almacenar `lastFocusedElement` y restaurarlo) es crítico para una experiencia de teclado fluida al usar modales que se poblan dinámicamente. Agregar `role="button"` y `tabindex="0"` a tarjetas `div` es una mejora micro-UX efectiva para accesibilidad cuando no es factible refactorizar completamente a `<button>`.
**Acción:** Siempre implementar trampas de foco y restauración al agregar modales o dropdowns.
## 2025-06-01 - [ScrollSpy y ARIA current]
**Aprendizaje:** Implementar ScrollSpy no solo proporciona feedback visual sino que también es una oportunidad para mejorar la accesibilidad usando `aria-current="location"` en el link activo. Usar `IntersectionObserver` con un `rootMargin` que favorece la parte superior-media del viewport asegura que la sección "activa" se sienta natural para el foco del usuario.
**Acción:** Siempre combinar estados visuales "activos" con atributos ARIA semánticos para asegurar que la mejora de UX beneficie a todos los usuarios, incluyendo quienes usan tecnologías asistivas.
## 2025-05-15 - Modales de servicio accesibles
**Aprendizaje:** Elementos interactivos implementados como divs (como tarjetas) deben tener role="button", tabindex="0", y listeners de teclado (Enter/Space) para ser accesibles. Los modales requieren roles de diálogo, gestión de foco (enfocar el botón de cerrar al abrir y restaurar el foco al cerrar), y soporte para la tecla Escape.
**Acción:** Siempre implementar gestión de foco y roles ARIA al crear interacciones de modal personalizadas.
## 2025-06-01 - [Accesibilidad de tarjetas de servicio interactivas]
**Aprendizaje:** En componentes Astro, usar elementos `div` estáticos para funcionalidades interactivas como abrir modales crea barreras de accesibilidad para usuarios de teclado y lectores de pantalla. Simplemente agregar `role="button"` y `tabindex="0"` no es suficiente; se deben agregar listeners de teclado explícitos para 'Enter' y 'Space', y la gestión de foco (mover el foco al modal y volver) es crucial para una UX completa.
**Acción:** Asegurar siempre que cualquier elemento interactivo personalizado tenga roles ARIA apropiados, soporte de teclado y gestión de foco desde el inicio.

## 2026-06-02 - [UX: Validación de formularios y feedback]
**Aprendizaje:** Convertir secciones interactivas no semánticas a elementos HTML formales `<form>` proporciona validación nativa y mejor accesibilidad móvil. Proporcionar feedback visual inmediato (ej., 'Redirigiendo...') durante redirecciones externas con un `aria-live` descriptivo mejora la previsibilidad y evita acciones duplicadas.
**Acción:** Siempre usar formularios semánticos e implementar estados de carga con anuncios ARIA para acciones externas.

## 2025-06-27 - [A11y: Reparación estructural y consistencia de foco]
**Aprendizaje:** La corrupción estructural (bloques duplicados) no solo rompe el build sino que degrada la UX al crear elementos interactivos con IDs duplicados. Consolidar la lógica en una única función de inicialización compatible con View Transitions es vital para mantener la estabilidad. Sincronizar `group-hover` con `group-focus-visible` garantiza paridad de feedback para usuarios de ratón y teclado.
**Acción:** Priorizar la integridad estructural antes de añadir micro-mejoras y asegurar que cada hover tenga su equivalente en focus-visible.
