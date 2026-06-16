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
**Aprendizaje:** Convertir secciones interactivas no semánticas a elementos HTML formales `<form>` proporciona validación nativa y mejor accesibilidad móvil. Proporcionar feedback visual inmediato (ej., 'Redirigiendo...') durante redirecciones externas reduce la incertidumbre del usuario y previene acciones duplicadas.
**Acción:** Siempre usar formularios semánticos para entradas de usuario e implementar estados de carga/transición claros para acciones async o externas.
## 2025-02-15 - [UX: Feedback inmediato en redirección]
**Aprendizaje:** Proporcionar feedback visual inmediato (cambiar el texto del botón a 'Redirigiendo...' y deshabilitarlo) durante una redirección externa (como WhatsApp) confirma la acción del usuario y previene envíos duplicados, haciendo que la interacción se sienta más rápida y confiable.
**Acción:** Siempre implementar estados de carga/redirección para botones que disparan navegación asíncrona o externa.
## 2026-06-02 - Accesibilidad de navegación consciente de estado
**Aprendizaje:** Los toggles de navegación móvil deben proporcionar feedback claro del estado vía atributos ARIA y soportar el cierre universal por teclado (tecla Escape) para asegurar una UX de alta calidad e inclusiva.
**Acción:** Siempre implementar `aria-expanded`, actualizaciones dinámicas de `aria-label`, y listeners de tecla "Escape" para menús de navegación móvil. Asegurar que el foco vuelva al toggle cuando se cierra vía teclado.
## 2025-06-05 - [Accesibilidad de menú móvil]
**Aprendizaje:** Los toggles de menú móvil deben usar `aria-expanded` y `aria-controls` para comunicar el estado a lectores de pantalla. Actualizar dinámicamente el `aria-label` basado en el estado (ej., "Abrir menú" vs "Cerrar menú") proporciona un contexto más claro para la acción actual.
**Acción:** Siempre implementar atributos de estado ARIA y etiquetas dinámicas para toggles de navegación móvil para mejorar la UX no visual.

## 2025-06-05 - [UX: Estado de horario comercial en tiempo real]
**Aprendizaje:** Proporcionar información inmediata y visible sobre la disponibilidad del negocio (ej., "Abierto ahora" vs "Cerrado") reduce la carga cognitiva del usuario y maneja las expectativas de tiempos de respuesta antes de que interactúen con un formulario de contacto.
**Acción:** Usar lógica del lado del cliente para calcular la hora local relativa a la zona horaria del negocio y proporcionar un badge de estado de alto contraste y codificado por color cerca de los métodos de contacto.
## 2026-06-03 - [UX: Feedback de disponibilidad en tiempo real]
**Aprendizaje:** El badge de 'Estado de Horario Comercial' es un patrón micro-UX altamente efectivo para sitios basados en servicios. Proporciona certeza inmediata al usuario sobre la disponibilidad del laboratorio sin requerir que interpreten un horario. Usar un script del lado del cliente con offsets UTC asegura precisión a través de diferentes zonas horarias de usuarios manteniendo el contexto local de Tucumán.
**Acción:** Implementar badges de estado dinámicos para cualquier componente que muestre horarios comerciales para reducir la carga cognitiva del usuario y mejorar el engagement.

## 2026-06-05 - [A11y: Contexto de links y aria-label]
**Aprendizaje:** Usar `aria-label` en un link que contiene tanto información estática (como una dirección) como una acción (como "Abrir en Mapas") anulará completamente el texto interno. Para asegurar que los usuarios de lectores de pantalla lineales no pierdan contexto, el `aria-label` debe incluir tanto la información como la acción prevista.
**Acción:** Al usar `aria-label` para clarificar acciones de links, siempre concatenar contenido de texto interno relevante para mantener el contexto para tecnologías asistivas.

## 2026-06-07 - [UX: Bloqueo de scroll y gestión de foco en navegación móvil]
**Aprendizaje:** Implementar el bloqueo de desplazamiento del fondo (`overflow: hidden`) cuando el menú móvil está abierto previene la desorientación del usuario. Además, guardar el `lastFocusedElement` y restaurarlo al cerrar el menú asegura que los usuarios de teclado mantengan su contexto de navegación, evitando que el foco se pierda al final del documento.
**Acción:** Siempre implementar bloqueo de scroll y restauración de foco al desarrollar componentes de navegación móvil o modales interactivos.

## 2025-02-15 - [A11y: Feedback programático para acciones de portapapeles]
**Learning:** Las interacciones de "copiar al portapapeles" que solo proporcionan feedback visual (cambio de ícono o texto) son invisibles para usuarios de lectores de pantalla. Implementar una región `aria-live="polite"` oculta permite anunciar el éxito de la operación de forma no intrusiva.
**Action:** Siempre incluir un elemento con `aria-live="polite"` y la clase `sr-only` para anunciar estados de confirmación en acciones que no disparan cambios estructurales en el DOM o navegación.

## 2026-06-05 - [UX: Verbosidad de contador de caracteres]
**Aprendizaje:** Agregar `aria-live="polite"` a un contador de caracteres en vivo puede causar que los lectores de pantalla anuncien el conteo en cada pulsación de tecla, lo cual frecuentemente se percibe como "ruidoso" o distractor.
**Acción:** Para textareas estándar, preferir un contador de caracteres solo visual a menos que exista un requerimiento específico de accesibilidad para anuncios de conteo en tiempo real, o implementar lógica para anunciar solo en intervalos específicos (ej., cada 50 caracteres) o al acercarse al límite.
## 2025-06-06 - [UX: Contadores de caracteres en vivo]
**Aprendizaje:** Agregar un contador de caracteres en tiempo real a textareas con límites estrictos de longitud (como 500 caracteres) proporciona feedback crítico que previene la frustración del usuario durante el envío de formularios. Usar `aria-describedby` vincula el contador al input para lectores de pantalla, mientras que evitar `aria-live="polite"` en el contador mismo previene verbosidad excesiva durante cada pulsación de tecla.
**Acción:** Siempre implementar contadores de caracteres para inputs limitados, asegurando cambios visuales claros de estado (ej., cambios de color) a medida que se acerca el límite, y mantener accesibilidad vía asociaciones ARIA semánticas.
## 2026-06-04 - [UX: Accesibilidad de contador de caracteres en vivo]
**Aprendizaje:** Agregar un contador de caracteres en vivo a textareas mejora la gestión de entrada, pero debe ser accesible. Usar `aria-describedby` en el textarea y `aria-live="polite"` en el contador asegura que los usuarios de lectores de pantalla se mantengan informados de su capacidad restante.
**Acción:** Siempre emparejar contadores visuales con atributos ARIA para mantener un alto nivel de accesibilidad mientras se proporciona feedback agradable.

## 2025-06-15 - [UX: Animación de badge de ubicación y accesibilidad]
**Aprendizaje:** Las animaciones de pulso (como `animate-ping`) en badges de estado o ubicación proporcionan un toque de "vida" que indica actividad en tiempo real. Sin embargo, para no excluir a usuarios de lectores de pantalla, es vital acompañarlas de un `aria-label` descriptivo que comunique el contexto visual.
**Acción:** Siempre que se añadan micro-interacciones puramente visuales, asegurar que su propósito esté reflejado en el árbol de accesibilidad mediante etiquetas ARIA semánticas.

## 2026-06-07 - [A11y: Prevención de race conditions en focus traps]
**Aprendizaje:** Al inyectar contenido dinámico en modales, popular el array de elementos enfocables (`focusableElements`) dentro de un `setTimeout` puede causar race conditions si el usuario interactúa con el teclado antes de que se complete el delay.
**Acción:** Popular siempre el array de elementos enfocables inmediatamente después de la inyección de HTML en el DOM para asegurar que el focus trap sea robusto desde el primer milisegundo de visibilidad del modal.
## 2025-06-10 - [UX: Bloqueo de scroll y refinamiento de componentes]
**Aprendizaje:** Implementar bloqueo de scroll en el `body` (`overflow: hidden`) al abrir menús móviles o modales previene el "scroll secundario" que desorienta al usuario. Además, la limpieza de JSX malformado es vital para la accesibilidad, ya que etiquetas duplicadas rompen el árbol de accesibilidad (AOM).
**Acción:** Siempre sincronizar el estado de visibilidad de componentes superpuestos (modales, menús) con el overflow del body y validar que el JSX generado no contenga duplicaciones estructurales.
## 2025-06-08 - [UX: Consolidación de scripts y gestión de estado]
**Aprendizaje:** Al refactorizar componentes Astro con scripts complejos (como modales con trampas de foco), es vital consolidar listeners de eventos para evitar fugas de memoria y comportamientos erráticos. Sin embargo, la consolidación debe preservar meticulosamente las actualizaciones de estado globales (ej., `isModalOpen`) que rigen la lógica de accesibilidad por teclado.
**Acción:** Siempre verificar que las variables de estado críticas se actualicen correctamente en los nuevos flujos consolidados y usar herramientas de automatización (como Playwright) para validar que la accesibilidad (tecla Escape, trampas de foco) siga operativa tras la refactorización.

## 2025-02-15 - [A11y: Gestión de foco en navegación móvil]
**Aprendizaje:** Los menús de navegación móvil requieren una gestión de foco rigurosa para ser verdaderamente accesibles. Al abrir el menú, el foco debe moverse inmediatamente al primer elemento interactivo. Un "focus trap" debe activarse para evitar que el usuario tabule fuera del menú hacia el contenido principal oculto.
**Acción:** Implementar siempre trampas de foco (`focus trap`) y enfoque inicial automático en componentes de navegación móvil, asegurando que el cierre (vía tecla Escape o click fuera) restaure el foco al disparador original.

## 2026-06-15 - [UX: Ciclo de vida en Astro View Transitions]
**Aprendizaje:** El uso de View Transitions en Astro requiere un patrón de inicialización que devuelva una función de limpieza. Sin esta limpieza, los listeners de eventos y los intervalos se acumulan tras cada navegación, provocando comportamientos erráticos.
**Acción:** Implementar siempre un retorno de `cleanup()` en las funciones `init` y llamarlo antes de re-inicializar en el evento `astro:after-swap`.

## 2025-06-15 - [A11y: Gestión de foco y corrupción estructural]
**Aprendizaje:** La corrupción estructural (etiquetas duplicadas, scripts mal cerrados) rompe no solo el build sino también la accesibilidad del sitio. La consolidación de la lógica de modales y menús móviles es fundamental para que las trampas de foco funcionen de manera predecible.
**Acción:** Priorizar la integridad sintáctica de los componentes para asegurar que los atributos ARIA y la gestión del foco se apliquen correctamente.

## 2025-06-16 - [UX: Feedback interactivo en tarjetas de equipo]
**Aprendizaje:** Agregar estados de hover combinados (`scale`, `shadow` y `border-color`) en tarjetas de equipo usando el patrón `group` de Tailwind mejora significativamente la percepción de interactividad y modernidad del sitio sin comprometer el rendimiento.
**Acción:** Usar `group-hover` para coordinar múltiples transformaciones visuales en componentes complejos y asegurar que las transiciones sean suaves (`transition-all duration-300`).
## 2025-06-11 - [UX: Indicador de ubicación con feedback visual]
**Aprendizaje:** Usar un indicador de pulso (`animate-ping`) proporciona una señal visual sutil de "actividad" o "presencia local" que refuerza la confianza del usuario en servicios regionales.
**Acción:** Implementar estados de animación sutiles para badges de ubicación y acompañarlos de `aria-label` descriptivos para no perder accesibilidad en elementos puramente visuales.

## 2025-06-20 - [UX: Feedback visual en tarjetas de equipo]
**Aprendizaje:** Implementar estados de hover sutiles en tarjetas informativas (como el equipo en Nosotros.astro) mejora la percepción de calidad y "life" del sitio. Usar una combinación de elevación (shadow-card-hover), cambio de borde (border-blue/20) y escala en elementos internos (group-hover:scale-110) crea una respuesta visual cohesiva.
**Acción:** Aplicar patrones de feedback 'group' en componentes de tarjetas para guiar la atención del usuario y reforzar la interactividad sin sobrecargar la interfaz.
## 2025-06-20 - [A11y: Accesibilidad de tarjetas de servicio y modales]
**Aprendizaje:** En este repositorio, los componentes Astro presentaban una alta redundancia y corrupción estructural en sus scripts, lo que rompía tanto la accesibilidad como el build. La implementación de un focus trap robusto y la restauración del foco al cerrar modales es vital cuando se usan View Transitions, ya que el estado del DOM puede volverse inconsistente si no se maneja una limpieza adecuada de event listeners.
**Acción:** Al refactorizar componentes interactivos, priorizar la consolidación de la lógica de inicialización en una única función que devuelva un cleanup, y asegurar que el soporte de teclado (Enter/Space) esté integrado desde el inicio en elementos con roles interactivos.

## 2025-06-21 - [UX: Feedback de portapapeles accesible]
**Aprendizaje:** El feedback visual de "¡Copiado!" es excelente para usuarios videntes, pero es invisible para usuarios de lectores de pantalla. Implementar una región `aria-live="polite"` (clase `sr-only`) que se actualice dinámicamente permite que la confirmación de la acción sea inclusiva sin alterar el diseño visual.
**Acción:** Siempre acompañar interacciones de "copiar al portapapeles" con un anuncio `aria-live` dedicado para asegurar que el éxito de la operación sea comunicado a todos los usuarios.

## 2026-06-03 - [UX: Persistencia de feedback en estados de redirección]
**Aprendizaje:** Al implementar feedback de "Redirigiendo..." en tooltips interactivos (como el botón flotante de WhatsApp), los eventos de `blur` o `mouseleave` pueden ocultar el tooltip prematuramente, dejando al usuario sin confirmación visual de su acción.
**Acción:** Utilizar una variable de estado (ej. `isRedirecting`) para bloquear la lógica de ocultación del tooltip mientras el proceso de redirección o su timer de feedback estén activos, asegurando que el mensaje de éxito sea visible independientemente de la posición del cursor o el foco.
## 2026-06-14 - [UX: Aislamiento de interacciones y selección de texto]
**Learning:** Al implementar tarjetas clicables que contienen elementos interactivos hijos (ej. botón de copiar), usar un link absoluto con `inset-0` es efectivo pero puede bloquear la selección de texto si se aplica `pointer-events-none` de forma indiscriminada. El patrón refinado consiste en envolver el texto crítico en sus propios tags semánticos (como un `<a>` para títulos) para preservar la capacidad del navegador de permitir la selección y el clic, mientras el link de fondo cubre las áreas "vacías".
**Action:** Evitar `pointer-events-none` en contenedores de texto dentro de tarjetas interactivas. Usar una combinación de links internos para texto y links absolutos de fondo para el área de la tarjeta, asegurando que los botones de utilidad tengan el `z-index` más alto para operar independientemente.

## 2025-06-25 - [UX: Consistencia en acciones de portapapeles]
**Learning:** Proporcionar una experiencia de "copiar al portapapeles" consistente para todos los datos de contacto clave (dirección, teléfono) refuerza la utilidad del sitio. Usar un helper de inicialización que gestione el feedback visual y los anuncios aria-live asegura que la mejora sea accesible y fácil de mantener.
**Action:** Implementar siempre funciones de utilidad para acciones repetitivas de UI que requieran coordinación de estados (iconos, texto, accesibilidad) para garantizar coherencia en todo el sitio.

## 2025-06-26 - [UX: Paridad de foco para micro-interacciones]
**Aprendizaje:** Sincronizar las animaciones de `group-hover` (como `scale` y `animate-heartbeat`) con `group-focus-visible` asegura que los usuarios de teclado tengan una experiencia tan rica y responsiva como los usuarios de ratón.
**Acción:** Siempre implementar `group-focus-visible` junto con `group-hover` en componentes interactivos para mantener la paridad de feedback visual.

## 2025-06-26 - [A11y: Corrupción estructural y aislamiento de interacciones]
**Aprendizaje:** La anidación incorrecta de elementos interactivos (ej. `<a>` dentro de `<a>`) rompe el árbol de accesibilidad y el comportamiento esperado del navegador. Limpiar el HTML redundante es el primer paso para una UX sólida.
**Acción:** Auditar periódicamente la estructura de los componentes Astro para asegurar que no haya duplicaciones de IDs o anidaciones prohibidas.

## 2025-06-26 - [UX: Feedback de portapapeles con escala]
**Aprendizaje:** Agregar una transición de escala (`scale-110`) al feedback de "¡Copiado!" proporciona una confirmación visual más dinámica y satisfactoria que solo cambiar el texto.
**Acción:** Usar transformaciones sutiles para reforzar estados de confirmación en acciones rápidas del usuario.
