## 2026-03-30 - Formulario de consulta asíncrono y visibilidad de foco en fondo oscuro
**Learning:** Los formularios de consulta asíncronos sobre fondos oscuros (`bg-navy`) requieren anillos de enfoque con alto contraste (ej. `focus-visible:ring-blue-light`) e indicadores de estado dinámicos (`role="alert"` / `aria-live="assertive"` para errores, `role="status"` / `aria-live="polite"` para resultados, y `aria-busy` durante la consulta) para garantizar accesibilidad WCAG y feedback en tiempo real a lectores de pantalla.
**Action:** Aplicar siempre anillos de foco luminosos en contenedores oscuros y equipar contenedores de error/resultado con atributos ARIA en componentes de búsqueda o consulta de tickets.

## 2026-03-30 - Anti-patrón de accesibilidad: tabindex="0" en elementos pasivos
**Learning:** Agregar `tabindex="0"` o indicadores de foco interactivos a elementos estáticos o pasivos sin acciones (como tarjetas puramente informativas) degrada la experiencia de navegación por teclado al crear paradas sin interacción ("dead-end focus stops").
**Action:** Evitar `tabindex="0"` en elementos que no responden a eventos de teclado (click, enter, space) o no abren modales/enlaces. Para dar feedback visual en formularios/módulos de consulta, asociar atributos ARIA (`aria-busy`, regiones `aria-live`) e indicadores de carga directamente al botón de envío.

## 2026-03-30 - Gestión de foco accesible en revelación asíncrona de resultados
**Learning:** Cuando una búsqueda asíncrona despliega un panel de resultados debajo del formulario (ej. estado de ticket), mantener el foco atrapado en el botón de envío desorienta a usuarios de teclado y lectores de pantalla.
**Action:** Transferir explícitamente el foco al primer elemento interactivo del panel de resultados (como el botón de copiar ticket o enlace) al cargar la respuesta, asegurando posicionamiento inmediato y anuncio fluido.

## 2026-03-30 - Paridad micro-interactiva entre hover y focus-visible en botones principales
**Learning:** Asignar transformaciones visuales (como `translateY(-2px)` y `box-shadow` de elevación) únicamente a `:hover` en componentes `.btn-primary` priva a los usuarios de navegación por teclado de la misma retroalimentación táctil y dinámica que experimentan los usuarios de ratón.
**Action:** Garantizar siempre paridad funcional asignando reglas idénticas a `.btn-primary:hover` y `.btn-primary:focus-visible` en las clases utility del sistema de diseño CSS.

## 2026-03-30 - Micro-UX de selectores y contadores accesibles en formularios
**Learning:** En controles `<select>` personalizados, envolver la entrada con Tailwind named groups (`group/select`) y aplicar `group-focus-within/select:rotate-180` al ícono de flecha provee una respuesta táctil/visual instantánea tanto con ratón como con navegación por teclado. Asimismo, los contadores de texto dinámicos en `<textarea>` deben incorporar `aria-live="polite"` y cambiar a un tono de advertencia legible (`text-amber-400 font-semibold`) al superar el 90% de la capacidad.
**Action:** Utilizar named groups para animaciones de foco en íconos embebidos en inputs/selects y equipar contadores de caracteres con regiones `aria-live="polite"` para garantizar feedback visual y por voz.

## 2026-03-30 - Fallback de redirección transparente para bloqueadores de ventanas emergentes en envíos de formulario
**Learning:** En manejadores de envíos de formularios que abren enlaces externos (ej. WhatsApp) tras procesar eventos de cliente, `window.open(url, '_blank', 'noopener,noreferrer')` puede ser bloqueado en navegadores estrictos o webviews móviles. Evaluar la referencia resultante (`const openedWin = window.open(...)`) y aplicar `if (!openedWin) window.location.href = url` garantiza la navegación sin parpadeos de pestañas en blanco ni interrupciones silenciosas de UX.
**Action:** Usar asignación condicional `if (!openedWin) window.location.href = url` al abrir enlaces en manejadores de formularios para asegurar redundancia ante bloqueadores de popups.

## 2026-03-30 - Sincronización dinámica de atributos ARIA label en botones de copia y acción
**Learning:** Cuando un botón de copia o acción comparte contenido (ej. `#copy-ticket-btn` y `#share-ticket-btn`), cambiar el texto visible a "¡Copiado!" o "¡Enlace copiado!" sin actualizar el atributo `aria-label` causa una discrepancia donde los lectores de pantalla continúan anunciando la instrucción original ("Copiar...").
**Action:** Capturar siempre el `aria-label` original al activar la acción, actualizar temporalmente el `aria-label` a la confirmación (ej. "Número de ticket copiado al portapapeles") y restaurar el `aria-label` original tras el timeout de retroalimentación.

## 2026-03-30 - Visibilidad de foco en enlaces de navegación fijos sobre fondo claro
**Learning:** Los enlaces de navegación en cabeceras fijas que omiten el contorno por defecto (`outline-none`) deben incorporar anillos de enfoque luminosos de alto contraste (`focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm`) para garantizar accesibilidad WCAG 2.1 AA durante la navegación por teclado.
**Action:** Aplicar siempre anillos de enfoque con contraste suficiente y desplazamiento de anillo (`ring-offset-2`) en enlaces de barra de navegación principal.

## 2026-03-30 - Navegación accesible por teclado WAI-ARIA en acordeones y etiquetado de listas
**Learning:** En componentes desplegables de preguntas frecuentes (FAQ accordion), permitir la navegación con teclas de dirección (`ArrowDown`, `ArrowUp`, `Home`, `End`) con rotación cíclica mejora drásticamente la accesibilidad para usuarios de teclado sin obligar a avanzar botón por botón con la tecla Tab. Asimismo, etiquetar contenedores de listas con `aria-label` en grillas informativas (ej. `Equipos.astro`) garantiza contexto de lectura a usuarios de lectores de pantalla.
**Action:** Implementar siempre manejadores de eventos de teclado `ArrowDown`, `ArrowUp`, `Home` y `End` en activadores de acordeón y proveer `aria-label` descriptivo en listas `<ul>` de elementos temáticos.

## 2026-03-30 - Estado de error dinámico aria-invalid e indicación direccional en enlaces
**Learning:** Sincronizar el atributo `aria-invalid="true"` en campos de entrada cuando ocurren errores de búsqueda en cliente (y limpiarlo dinámicamente al escribir o reiniciar) provee semántica WAI-ARIA inmediata a lectores de pantalla. Asimismo, equipar enlaces de navegación hacia atrás con íconos vectoriales direccionales y micro-animaciones de desplazamiento (`group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5`) mejora la orientación espacial y respuesta visual para todos los usuarios.
**Action:** Asignar `aria-invalid="true"` en capturas de error de formularios y sincronizar remoción en eventos `input`, acompañando enlaces de navegación con íconos vectoriales y micro-animaciones direccionales.

## 2026-03-30 - Indicador de carga animado y retroalimentación de estado accesible en formularios de consulta de tickets
**Learning:** En formularios de consulta asíncronos o de búsqueda de estado (`Proceso.astro`), sustituir solo el texto del botón de envío durante la búsqueda priva a los usuarios de retroalimentación visual clara. Incorporar un ícono vectorial animado (`animate-spin`), alternar la visibilidad de íconos vectoriales secundarios y acompañar el proceso con `aria-busy="true"`, región `aria-live="polite"` y estado `disabled` proporciona feedback visual y auditivo en tiempo real para todos los usuarios.
**Action:** Equipar siempre los botones de envío en formularios de búsqueda/consulta con un ícono de carga animado (`animate-spin`), conmutación de íconos secundarios y atributos ARIA `aria-busy` e indicadores para lectores de pantalla.

## 2026-03-30 - Micro-interacciones vectoriales mediante la clase group en enlaces secundarios del pie de página
**Learning:** En enlaces secundarios con íconos vectoriales SVG embebidos en el pie de página (ej. "Seguimiento de reparaciones"), la adición de la clase `group` en la etiqueta `<a>` junto con `group-hover:scale-110 group-focus-visible:scale-110 transition-transform` en el elemento `<svg>` provee una retroalimentación interactiva unificada tanto para puntero de ratón como para usuarios de navegación por teclado.
**Action:** Configurar siempre la clase `group` en enlaces secundarios con íconos para asegurar micro-escalado armónico durante interacciones `:hover` y `:focus-visible`.
