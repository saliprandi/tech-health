## 2026-03-30 - Botón de copia rápida de identificadores con feedback dinámico y anuncio ARIA
**Learning:** Al incluir botones de copia para identificadores o números de ticket, es indispensable combinar el feedback visual inmediato (`¡Copiado!` e ícono `#icon-check`) con una región `aria-live="polite"` dedicada, para garantizar que los usuarios con lectores de pantalla reciban confirmación auditiva de la acción sin interrumpir el flujo.
**Action:** Equipar los componentes de copia de texto/tickets con elementos `aria-live="polite"` que anuncien "Número de ticket [ID] copiado al portapapeles" y mantener la visibilidad de foco mediante `focus-visible:ring-2`.

## 2026-03-30 - Formulario de consulta asíncrono y visibilidad de foco en fondo oscuro
**Learning:** Los formularios de consulta asíncronos sobre fondos oscuros (`bg-navy`) requieren anillos de enfoque con alto contraste (ej. `focus-visible:ring-blue-light`) e indicadores de estado dinámicos (`role="alert"` / `aria-live="assertive"` para errores, `role="status"` / `aria-live="polite"` para resultados, y `aria-busy` durante la consulta) para garantizar accesibilidad WCAG y feedback en tiempo real a lectores de pantalla.
**Action:** Aplicar siempre anillos de foco luminosos en contenedores oscuros y equipar contenedores de error/resultado con atributos ARIA en componentes de búsqueda o consulta de tickets.
