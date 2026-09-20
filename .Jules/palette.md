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

## 2026-03-30 - Paridad de validación y accesibilidad en formularios de búsqueda secundarios
**Learning:** Los campos de búsqueda rápida integrados en secciones secundarias (como la consulta de ticket en `src/components/Proceso.astro`) deben mantener paridad de validación y accesibilidad con la página principal de consulta (`src/pages/estado.astro`).
**Action:** Equipar siempre las entradas de búsqueda rápida secundarias con restricciones de longitud (`maxlength="30"`) y regiones de texto descriptivo accesibles (`aria-describedby`) para orientar a lectores de pantalla y mitigar payloads desproporcionados.
