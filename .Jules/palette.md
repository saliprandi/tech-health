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
