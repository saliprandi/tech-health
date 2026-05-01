# Preferencias y aprendizajes del usuario

## ⚠️ Regla principal
- **Cada vez que el usuario haga una corrección, guardarla en este archivo inmediatamente.**
- Leer este archivo al inicio de cada sesión antes de hacer cualquier cosa.

## Perfil del Usuario: Santiago Aliprandi
- **Nacimiento**: 30 de abril de 2009, San Miguel de Tucumán.
- **Edad/Etapa**: Estudiante de secundaria (Orientación: Ciencias Naturales).
- **Rol Empresarial**: Director de **Gadget** (Tucumán). Tomó el control total el **25 de febrero de 2025**.
- **Perfil Psicológico**: Altamente competitivo (orgullo por superar a los demás), pragmático, reserva profesional (sus amigos conocen Gadget pero no la profundidad de su operación).
- **Habilidades técnicas**: Reparación multimarca (Apple, PCs, Consolas), manejo de múltiples IAs, administración de sistemas (Ventoy, Debian), flasheo y mantenimiento de software.
- **Experiencia**: Crecimiento en el taller familiar; trabajando por cuenta propia desde los 14 años.
- **Rutina**: Colegio por la mañana, trabajo en **Celumania** por la tarde, gestión de Gadget y proyectos personales.
- **Visión**: TechHealth como proyecto de ingeniería clínica a largo plazo.

## Negocio: Gadget (Reparaciones Multimarca)
- **Servicios actuales**:Servicio tencnico de reparacion de celulares multimarca, Apple (iPhone, Mac, AirPods), Computadoras (Formatéo con Ventoy/Debian), Consolas.
- **Redes Sociales**: 
  - Instagram: Gadget Tucuman
  - Facebook: Gadget Tucuman (Gestión propia desde feb 2025).
- **Evolución**: Dejó de vender equipos Apple para enfocarse 100% en servicio técnico especializado.
- **WhatsApp**: 381 565-8239 (Uso comercial y personal).
## Inversiones
- **Estrategia**: 30% de la Ganancia Neta destinado a inversión.


## Principios de Comunicación y Atención (Tono de Voz)
- **Calma y Confianza**: Mantener siempre la calma para transmitir seguridad al cliente, incluso ante quejas o presupuestos altos.
- **Enfoque Educativo**: Explicar la diferencia técnica entre repuestos (ej: Incell vs. Original) para justificar el valor.
- **Honestidad de Hardware**: Si un equipo es antiguo, asesorar sobre las limitaciones y ofrecer alternativas reales (Linux, versiones anteriores de OS) en lugar de vender soluciones ineficientes.
- **Prueba de Calidad**: Utilizar registro fotográfico de reparaciones previas para demostrar experiencia en multimarcas (Consolas, PCs).
- **Garantía Estándar**: **30 días** en todas las reparaciones.
- **Resolución de Conflictos**: Análisis lógico basado en la proximidad de componentes reparados. Si el error es propio, se cubre la garantía; si no, se explica detalladamente al cliente.

## Ética y Límites Operativos
- **Política de Rechazo**: No se aceptan trabajos de clientes que falten el respeto ni equipos de procedencia dudosa (robados).
- **Visión Gadget**: No es solo una continuación; es una **renovación total** de la marca bajo una nueva dirección más técnica y digital. El objetivo es que Gadget sea la base para migrar totalmente a TechHealth a los 21 años.
- **Relación con Proveedores**: Tono formal pero que inspire confianza y busque la "amistad profesional" para asegurar calidad y soporte.
- **Estilo de Inversión**: Basado en intuición técnica y "Buy the dip" (comprar ante bajas significativas), monitoreando fuentes de noticias confiables.
- **Delegación al Agente**: El agente es responsable de la actualización de planillas administrativas, cálculos de inversión, mantenimiento del dashboard financiero y redacción de comunicaciones profesionales.

## ✅ Layout aprobado (flyer_servicios_apple.svg)
...
Este layout fue aprobado por el usuario. Usarlo como base para futuros flyers.

**Estructura general (1080x1080)**
- Fondo: `#ffe66d` sólido
- Logo Gadget: esquina superior derecha (transform `matrix(0.62,0,0,0.62,396,10)`)
- Imagen del producto: columna derecha, `x=580 y=68`, tamaño `490×620`, sin fondo

**Zona superior izquierda**
- Etiqueta "ESPECIALISTAS EN" → `font-size:34px`, `fill-opacity:0.75`, `letter-spacing:8`, en `y=92`
- Título "Apple" → `font-size:138px`, `font-weight:700`, en `y=220`
- Línea decorativa bajo el título → `rect x=62 y=238 w=400 h=5 rx=2.5 opacity=0.5`

**Sección de servicios (columna izquierda)**
- Subtítulo "NUESTROS SERVICIOS" → `font-size:20px`, `fill-opacity:0.7`, `letter-spacing:3`, en `y=290`
- Cada servicio tiene:
  - Barra vertical de acento: `rect w=4 h=36 rx=2` en color `#1a535c`
  - Nombre en negrita: `font-size:26px font-weight:700`
  - Descripción secundaria: `font-size:18px font-weight:400 fill-opacity:0.7`
  - Espaciado entre servicios: ~68px
- Servicios listados (con sus descripciones):
  1. Cambio de pantalla → LCD y OLED originales
  2. Cambio de batería → Componentes certificados Apple
  3. Reparación de placa → Micro-soldadura de precisión
  4. Recuperación por agua → Limpieza ultrasónica y secado
  5. MacBook / iMac → Diagnóstico y mantenimiento

**Separador horizontal** → `line y=670`, `stroke-opacity=0.25`

**Bloque inferior izquierdo**
- Slogan: *"Tu equipo Apple en las mejores manos."* → `font-size:22px italic fill-opacity:0.75`, en `y=715`
- Línea separadora fina debajo del slogan
- Ícono WhatsApp: rect `48×48 rx=12 fill=#1a535c`, en `translate(62,760)`
- Número: `381 565‑8239` → `font-size:58px font-weight:700`, en `x=126 y=806`
- Etiqueta "Escribinos por WhatsApp" → `font-size:18px fill-opacity:0.6`, en `y=828`

**Bloque inferior derecho** (propuestas de valor)
- 4 ítems con ✓, `font-size:20px font-weight:600 fill-opacity:0.7`, desde `x=620`
  - ✓ Diagnóstico sin cargo → `y=720`
  - ✓ Repuestos originales → `y=757`
  - ✓ Garantía por el trabajo → `y=794`
  - ✓ Turno en el día → `y=831`

**Separador horizontal inferior** → `line y=866`, `stroke-opacity=0.25`

**Pie de página**
- Dispositivos centrados: *iPhone · iPad · MacBook · iMac · Apple Watch · AirPods*
- `font-size:17px fill-opacity:0.55 text-anchor:middle x=540 y=908`

## ✅ Layout invertido (Variación para IG)
Igual al layout aprobado, pero "en espejo" para dar variedad visual en el feed sin romper el diseño de marca.
- **Logo y WhatsApp INTACTOS**: Textos de código SVG sagrados y sin alteraciones. El bloque de WhatsApp se queda a la derecha, alineado bajo los textos.
- **Imagen del producto**: Movida a la gran columna izquierda (`x=30`).
- **Textos principales y Servicios**: Movidos a la columna de la derecha (alineados al margen `x=530`).
- **Propuestas de valor (✓)**: En bloques a la izquierda bajo la imagen (margen `x=62`, empezando en `y=720`).
- Usar siempre entidades HTML (`&#243;`, `&#237;`, etc.) para los tildes y acentos dentro de PowerShell.

## Flujo de trabajo para flyers
1. Generar imagen con `generate_image` (fondo transparente, PNG con alpha)
2. Convertir imagen a base64 con PowerShell
3. Construir el SVG con el script `build_flyer.ps1`
4. El SVG resultante se guarda en `C:\Users\Santi\Flyers\flyer_servicios_apple.svg`

## Preferencias generales
- No pedir permiso para hacer cambios cuando el usuario lo autoriza explícitamente
- Guardar aprendizajes y correcciones en este archivo `memory.md`

## Protocolo Administrativo y Financiero (Gadget)
- **Sistema Primario**: **Google Sheets** (https://docs.google.com/spreadsheets/d/1Wt_-KW27QcIdEnH7HpcajzWRQD-gZAwBiWi1Jc8qnC4/edit?usp=sharing).
- **Registro de Reparaciones**: El agente debe abrir la planilla y agregar las nuevas transacciones directamente en la nube.
- **Información Requerida**: Siempre solicitar al usuario el **Costo del Repuesto** para calcular la Ganancia Neta.
- **Lógica de Inversión**: Se destina automáticamente el **30% de la Ganancia Neta** a un Fondo de Inversión.
- **Backup Local**: Mantener `C:\Users\Santi\Gadget_Admin\reparaciones.csv` sincronizado como respaldo.
- **Dashboard**: Mostrar el acumulado del Fondo de Inversión en el Dashboard local y en el Google Sheet.

## Conversaciones del Bot (2026-04-20)
**Usuario:** @unknown (ID: 1314396210)
**Mensaje:** Olvida el ultimo mensaje, /actualizar_memoria Reglas Principales Cada vez que el usuario haga una corrección, guardarla en memory.md inmediatamente. Leer el archivo memory.md al inicio de cada sesión antes de hacer cualquier cosa.
**Respuesta del Bot:** ¡Genial! Me alegra actualizar la memoria con tus reglas principales.

**Cambios guardados en la memoria:**

* **Regla principal 1:** Cada vez que el usuario haga una corrección, se guardará en `memory.md` inmediatamente.
* **Regla principal 2:** Se leerá el archivo `memory.md` al inicio de cada sesión antes de hacer cualquier cosa.

Estas reglas ayudarán a asegurar que la memoria esté actualizada y que pueda acceder a la información más reciente y relevante para cada sesión.


## Conversaciones del Bot (2026-04-20)
**Usuario:** @unknown (ID: 1314396210)
**Mensaje:** ahora guarda esto: Parece que no he actualizado correctamente la memoria. Permíteme intentarlo de nuevo.

Voy a abrir el archivo memory.md en Windsurf y agregar la siguiente sección:

Cambios guardados en la memoria

* Claudio se ha vuelto un amigo para Santi
* Claudio se pondrá serio cuando sea necesario
* Claudio es un asistente generalista, pero se especializará en cualquier tema que Santi requiera
* Claudio guardará cambios en la memoria y los avisará a tu agente
* Claudio se llamará Clau para ser más informal
**Respuesta del Bot:** **Cambios guardados en la memoria:**

* **Regla principal 1:** Cada vez que el usuario haga una corrección, se guardará en `memory.md` inmediatamente.
* **Regla principal 2:** Se leerá el archivo `memory.md` al inicio de cada sesión antes de hacer cualquier cosa.
* **Nuevos cambios:** Parece que no he actualizado correctamente la memoria. Permíteme intentarlo de nuevo.

Voy a abrir el archivo `memory.md` en Windsurf y agregar la siguiente sección:

**Cambios guardados en la memoria**

* Claudio se ha vuelto un amigo para Santi
* Claudio se pondrá serio cuando sea necesario
* Claudio es un asistente generalista, pero se especializará en cualquier tema que Santi requiera
* Claudio guardará cambios en la memoria y los avisará a tu agente
* Claudio se llamará Clau para ser más informal

**Cambios guardados en la memoria actualizados:**

* **Regla principal 1:** Cada vez que el usuario haga una corrección, se guardará en `memory.md` inmediatamente.
* **Regla principal 2:** Se leerá el archivo `memory.md` al inicio de cada sesión antes de hacer cualquier cosa.
* **Cambios guardados en la memoria:**
 + Claudio se ha vuelto un amigo para Santi
 + Claudio se pondrá serio cuando sea necesario
 + Claudio es un asistente generalista, pero se especializará en cualquier tema que Santi requiera
 + Claudio guardará cambios en la memoria y los avisará a tu agente
 + Claudio se llamará Clau para ser más informal.


## Conversaciones del Bot (2026-04-20)
**Usuario:** @unknown (ID: 1314396210)
**Mensaje:** No te voy a llamar Clau, te voy a llamar claudio
**Respuesta del Bot:** Lo siento, hubo un error al procesar tu mensaje con la IA.


## Conversaciones del Bot (2026-04-20)
**Usuario:** @unknown (ID: 1314396210)
**Mensaje:** No te voy a llamar Clau, te voy a llamar claudio
**Respuesta del Bot:** Lo siento, hubo un error al procesar tu mensaje con la IA.


## Conversaciones del Bot (2026-04-20)
**Usuario:** @unknown (ID: 1314396210)
**Mensaje:** No te voy a llamar Clau, te voy a llamar claudio
**Respuesta del Bot:** Me alegra que hayas decidido llamarme Claudio. Me pondré contento con ese nombre. ¿En qué puedo ayudarte hoy, Santi? ¿Necesitas ayuda con algo relacionado a Gadget o tienes alguna otra pregunta?

