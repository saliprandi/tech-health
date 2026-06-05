# Architecture Decision Records (ADR)

> Append-only. Nunca borrar ni reescribir un ADR. Para revertir, agregar uno nuevo con `Status: Accepted, supersedes ADR-NNN`.

---

## ADR-001: Layout de 2 columnas para la sección de Contacto

- **Status:** Accepted
- **Date:** 2026-06-04

### Contexto

La sección de contacto (`Contacto.astro`) contenía información de contacto (WhatsApp, dirección del laboratorio, horario de atención) y un formulario de consulta ("Envíenos su consulta") mezclados en una sola columna o distribución desorganizada. El archivo `Contacto.astro` había sufrido acumulación de código duplicado debido a ediciones repetidas sin limpieza: elementos HTML repetidos, scripts duplicados, tags sin cerrar, y múltiples versiones de los mismos campos de formulario. Esto generaba un componente imposible de mantener y con riesgo de comportamiento errático en el cliente.

### Decisión

1. **Dividir la sección en 2 columnas** usando `grid grid-cols-1 lg:grid-cols-2`:
   - **Columna izquierda:** Información de contacto (WhatsApp/Teléfono, Laboratorio, Horario de atención, Correo electrónico condicional).
   - **Columna derecha:** Formulario "Envíenos su consulta".
2. **Reescribir el componente desde cero**, eliminando todo el código duplicado y corrupto. Se mantuvo el comportamiento funcional existente (badge de horario, contador de caracteres, envío por WhatsApp).
3. **Conservar los estilos y clases Tailwind existentes** para no romper el diseño visual del sitio.

### Consecuencias

- **Positivas:**
  - Componente limpio, mantenible y sin código muerto.
  - Layout responsivo claro: 1 columna en mobile, 2 columnas en desktop.
  - Separación semántica entre información estática (izquierda) y acción interactiva (derecha).
- **Negativas/Riesgos:**
  - Se perdió el historial de ediciones incrementales del archivo (aunque Git preserva el histórico previo).
  - Es necesario verificar que los iconos del sprite (`#icon-phone`, `#icon-map-pin`, `#icon-clock`, `#icon-mail`, `#icon-chevron-down`) sigan existiendo en `Icons.astro` o el sprite correspondiente.

