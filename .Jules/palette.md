## 2026-03-30 - Formulario de consulta asíncrono y visibilidad de foco en fondo oscuro
**Learning:** Los formularios de consulta asíncronos sobre fondos oscuros (`bg-navy`) requieren anillos de enfoque con alto contraste (ej. `focus-visible:ring-blue-light`) e indicadores de estado dinámicos (`role="alert"` / `aria-live="assertive"` para errores, `role="status"` / `aria-live="polite"` para resultados, y `aria-busy` durante la consulta) para garantizar accesibilidad WCAG y feedback en tiempo real a lectores de pantalla.
**Action:** Aplicar siempre anillos de foco luminosos en contenedores oscuros y equipar contenedores de error/resultado con atributos ARIA en componentes de búsqueda o consulta de tickets.

## 2026-03-30 - Anti-patrón de accesibilidad: tabindex="0" en elementos pasivos
**Learning:** Agregar `tabindex="0"` o indicadores de foco interactivos a elementos estáticos o pasivos sin acciones (como tarjetas puramente informativas) degrada la experiencia de navegación por teclado al crear paradas sin interacción ("dead-end focus stops").
**Action:** Evitar `tabindex="0"` en elementos que no responden a eventos de teclado (click, enter, space) o no abren modales/enlaces. Para dar feedback visual en formularios/módulos de consulta, asociar atributos ARIA (`aria-busy`, regiones `aria-live`) e indicadores de carga directamente al botón de envío.

## 2026-03-30 - Descarte dinámico de errores y texto de ayuda en inputs de búsqueda
**Learning:** En formularios de consulta con formato específico (ej: formato de ticket `TH-AAAA-NNNN`), vincular un texto de ayuda mediante `aria-describedby` guía a usuarios de lectores de pantalla y visuales. Además, descartar mensajes de error estáticos de forma automática al detectar el evento `input` evita la persistencia de alertas obsoletas mientras el usuario corrige su búsqueda.
**Action:** Asociar siempre `aria-describedby` a inputs con formatos esperados y limpiar contenedores de error (`#estado-error`) inmediatamente en el handler de `input` y al reiniciar consultas.
