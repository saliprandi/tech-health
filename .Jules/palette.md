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

## 2026-03-30 - Enlace de retorno superior (Volver arriba) accesible en pie de página
**Learning:** En páginas de aterrizaje extensas, incorporar un enlace "Volver arriba" con ícono direccional SVG, micro-animación de elevación en `:hover`/`:focus-visible`, anillo de enfoque de alto contraste (`focus-visible:ring-2 focus-visible:ring-white/40`) y etiqueta ARIA descriptiva facilita la re-navegación fluida y accesible tanto para usuarios de teclado como de lectores de pantalla.
**Action:** Incluir siempre un enlace de retorno superior con micro-animación e indicación ARIA clara en el bloque de enlaces rápidos del pie de página.

## 2026-03-30 - Micro-UX de limpieza con Escape e indicación direccional en búsquedas de estado
**Learning:** En formularios de consulta asíncronos (como la búsqueda de estado de ticket), permitir la tecla `Escape` en la entrada de texto para limpiar rápidamente la consulta y cerrar mensajes de error/resultado, junto con un ícono direccional SVG en el botón de envío que responda a `:hover` y `:focus-visible`, mejora de manera significativa la accesibilidad por teclado y la fluidez interactiva.
**Action:** Equipar siempre las entradas de búsqueda con manejadores de tecla `Escape` para limpieza e incluir íconos vectoriales direccionales con transiciones en los botones principales.

## 2026-03-30 - Paridad de affordance direccional en botones de acción prioritaria (CTA de emergencia)
**Learning:** Incorporar un ícono vectorial de flecha/chevron direccional (`aria-hidden="true"`) con micro-animaciones coordinadas (`group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-all duration-300`) en botones de llamada a la acción prioritarios da una pista visual direccional clara que refuerza la intención de avance o redirección tanto para navegación con ratón como por teclado.
**Action:** Acompañar siempre los botones principales de llamada a la acción con un ícono direccional SVG y animaciones pareadas de desplazar a la derecha (`translate-x-1`) en estados `:hover` y `:focus-visible`.

## 2026-03-30 - Atajo de teclado Ctrl + Enter e indicación descriptiva accesible en áreas de texto
**Learning:** En formularios de contacto multilínea, admitir el envío directo mediante `Ctrl + Enter` (o `Cmd + Enter`) en `<textarea>` con `e.ctrlKey || e.metaKey` e invocar `form.requestSubmit()` mejora la productividad del usuario sin eludir las validaciones HTML5. Acompañar el campo con una pista visual sutil (`Ctrl + Enter para enviar`) asociada a la entrada mediante `aria-describedby` garantiza que la funcionalidad sea descubrible y anunciada por lectores de pantalla.
**Action:** Equipar las áreas de texto de formularios con escuchadores de `keydown` para `Ctrl + Enter` e interconectar pistas contextuales visibles mediante `aria-describedby`.

## 2026-03-30 - Micro-UX de elevación y resaltado focus-within en tarjetas informativas de diferenciales
**Learning:** Las tarjetas informativas con contenedor `<li>` o `<div>` que responden a gestos de deslizamiento con el ratón (`hover:-translate-y-1`) deben combinar transiciones suaves con soporte `focus-within:-translate-y-1` y anillos de enfoque (`focus-within:ring-2 focus-within:ring-blue focus-within:ring-offset-2`) para garantizar retroalimentación idéntica cuando contengan o reciban eventos de foco.
**Action:** Emparejar siempre utilidades `hover:-translate-y-1` con `focus-within:-translate-y-1` y anillos de enfoque de contraste adecuado en tarjetas informativas del sistema de diseño.

## 2026-03-30 - Recuperación de errores con enfoque y selección automática en campos de búsqueda
**Learning:** En formularios de consulta asíncrona o búsqueda de estado (ej. `estado.astro`), invocar `input.focus()` y `input.select()` tras detectar errores de validación o fallos en la consulta permite a usuarios de teclado, lectores de pantalla y pantallas táctiles corregir inmediatamente su entrada escribiendo de nuevo, sin requerir pulsaciones repetidas de retroceso o selección manual.
**Action:** Invocar siempre `input.focus()` and `input.select()` en los bloques de captura de errores de formularios de búsqueda para ofrecer una recuperación de errores fluida.

## 2026-03-30 - Desambiguación accesible de puntos de referencia de navegación (nav landmark aria-labels)
**Learning:** Cuando una aplicación web contiene múltiples elementos `<nav>` (por ejemplo, barra principal de navegación y navegación secundaria de estado o menú móvil), omitir los atributos `aria-label` hace que los lectores de pantalla anuncien simplemente "Navegación" repetidamente. Proveer etiquetas concisas e intencionales (`aria-label="Navegación principal"` y `aria-label="Navegación de consulta"`) permite a usuarios de tecnologías de asistencia identificar y saltar directamente al punto de referencia de navegación deseado.
**Action:** Equipar siempre todos los elementos `<nav>` con atributos `aria-label` descriptivos e individualizados en aplicaciones con múltiples barras o menús de navegación.

## 2026-03-30 - Semántica de lista explicita y resaltado por foco en grillas multimarca
**Learning:** En grillas o listas de marcas donde Safari y VoiceOver eliminan la semántica de lista debido a utilidades CSS como `list-none`, incluir explícitamente `role="list"` restaura la estructura de lista accesible. Además, equipar los elementos contenedores `<li>` con micro-UX de fondo (`hover:bg-slate-50/80 focus-within:bg-slate-50/80`) y escalado pareado (`group-hover:scale-105 group-focus-within:scale-105`) garantiza que la respuesta táctil/visual sea coherente tanto con puntero como en navegación por foco sin introducir paradas muertas de teclado (`tabindex="0"` innecesarios).
**Action:** Asignar `role="list"` en listas con `list-none` y parear siempre utilidades `hover:*` con `focus-within:*` o `group-focus-within:*` en contenedores de elementos de lista.

## 2026-03-30 - Filtro de búsqueda accesible con live region y atajo Escape en acordeones FAQ
**Learning:** Integrar un filtro de búsqueda interactivo en acordeones de preguntas frecuentes mejora la usabilidad. La implementación requiere asociar un elemento `<label class="sr-only">`, equipar la entrada con la tecla `Escape` para restablecer el texto, ofrecer un estado vacío accesible con botón de reinicio y sincronizar una región en vivo `aria-live="polite"` que anuncie en tiempo real la cantidad de preguntas coincidentes a lectores de pantalla.
**Action:** Equipar los filtros de búsqueda client-side con contadores en regiones `aria-live="polite"`, atajo `Escape` para borrar y botones de reinicio en estados vacíos.

## 2026-03-30 - Estilo de error visual de alto contraste para aria-invalid y paridad de anuncios al limpiar entradas
**Learning:** Cuando un campo de entrada recibe dinámicamente `aria-invalid="true"`, omitir clases visuales explícitas de error deja la entrada sin resaltado visible sobre fondos oscuros (`bg-navy`). Incorporar utilidades Tailwind `aria-invalid:border-red-400/80 aria-invalid:ring-1 aria-invalid:ring-red-400` garantiza feedback visual de alto contraste en sincronía con lectores de pantalla. Asimismo, accionar el botón de limpieza de un campo debe anunciar el estado "Campo limpiado" a través de regiones en vivo `aria-live="polite"`, asegurando paridad con atajos como la tecla `Escape`.
**Action:** Aplicar utilidades `aria-invalid:*` en entradas de formulario sobre fondo oscuro y sincronizar anuncios en regiones `aria-live` tanto en eventos de teclado como en clics de limpieza de entrada.

## 2026-03-30 - Micro-animación de rotación y feedback táctil activo en botones de cierre de diálogos modales
**Learning:** Equipar botones de cierre en cuadros de diálogo modales con micro-animaciones pareadas de rotación de 90 grados (`hover:rotate-90 focus-visible:rotate-90`) y escalado activo (`active:scale-95 transition-all duration-300`) proporciona una respuesta táctil e interactiva inmediata que refuerza la acción de cierre tanto para navegación con ratón como por teclado.
**Action:** Aplicar utilidades Tailwind de rotación (`rotate-90`) e interacción activa (`active:scale-95`) en botones icono de cierre manteniendo paridad entre `:hover` y `:focus-visible`.

## 2026-03-30 - Asociación accesible aria-describedby y gestión de estado ocupado en botones flotantes
**Learning:** Los botones flotantes de acción (FAB) con tooltip flotante (como `#wa-float-btn`) se benefician de la asociación semántica explícita mediante `aria-describedby` apuntando al contenedor del tooltip. Además, alternar dinámicamente `aria-busy="true"` y `aria-disabled="true"` durante la redirección (y limpiarlos al restaurar el estado) mantiene a las tecnologías de asistencia correctamente informadas del progreso.
**Action:** Enlazar siempre tooltips contextuales a botones flotantes mediante `aria-describedby` y alternar atributos ARIA `aria-busy` y `aria-disabled` durante estados de redirección asíncronos.

## 2026-03-30 - Anuncio accesible en regiones aria-live y feedback táctil en reinicio de búsquedas
**Learning:** Al reiniciar o vaciar la consulta de un formulario de búsqueda de ticket (mediante un botón de acción secundaria como "Consultar otro ticket"), combinar la adición de utilidades de animación táctil por pulsación (`active:scale-95 transition-all`) y tooltips nativos `title` con la actualización de la región `aria-live="polite"` (`announcement.textContent = 'Formulario reiniciado para una nueva consulta'`) garantiza que los usuarios con lector de pantalla reciban confirmación auditiva inmediata de que los resultados previos fueron removidos y el formulario está listo para un nuevo ingreso.
**Action:** Equipar siempre los botones de reinicio y consulta secundaria con tooltips `title`, utilidades `active:scale-95` y actualizaciones descriptivas a regiones `aria-live`.

## 2026-03-30 - Fallback de redirección transparente para bloqueadores de ventanas emergentes en botones CTA
**Learning:** Según la especificación W3C, invocar `window.open(url, '_blank', 'noopener,noreferrer')` devuelve `null`, imposibilitando la detección de bloqueadores de ventanas emergentes en navegadores estrictos o webviews móviles. Evaluar la referencia resultante mediante `const openedWin = window.open(url, '_blank')`, desvincular `openedWin.opener = null` y aplicar un fallback transparente `if (!openedWin) window.location.href = url` previene que los usuarios queden atascados en estados de redirección deshabilitados cuando las emergentes están bloqueadas.
**Action:** Abrir ventanas emergentes capturando la referencia de ventana y aplicando `if (!openedWin) window.location.href = url` para garantizar redirección continua ante bloqueadores de popups.
