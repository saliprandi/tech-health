# Preferencias y aprendizajes del usuario

## ⚠️ Regla principal
- **Cada vez que el usuario haga una corrección, guardarla en este archivo inmediatamente.**
- Leer este archivo al inicio de cada sesión antes de hacer cualquier cosa.

## Datos personales
- El apellido del usuario es Aliprandi.

## Negocio: Gadget (Reparaciones Apple)
- Número de WhatsApp: **381 565-8239**
- Paleta corporativa: Amarillo `#ffe66d` y Verde-azulado `#1a535c`
- Tipografía: **Myriad Pro** (Semi-Bold para títulos, Regular para cuerpo)
- Formato de flyers: **1080x1080 px** SVG editable para Inkscape
- Carpeta de flyers: `C:\Users\Santi\Flyers\`
- El script para construir el flyer está en: `C:\Users\Santi\Github\tech-health\build_flyer.ps1`

## Preferencias para flyers
- **SIEMPRE mantener fondo amarillo `#ffe66d` y texto teal `#1a535c`** — nunca cambiar estos colores base, incluso al proponer estilos alternativos
- **Tipografía siempre Myriad Pro / Montserrat** — no cambiar aunque el estilo varíe
- NO incluir la frase "presupuesto sin cargo" / "consulta sin cargo"
- **EL LOGO Y EL SÍMBOLO DE WHATSAPP SON SAGRADOS Y NO DEBEN MODIFICARSE NUNCA**. Reutilizar siempre la ruta/vectores exactos del diseño original.
- Las imágenes de productos (iPhone, etc.) deben tener **fondo transparente**, integradas sobre el fondo amarillo
- El diseño debe respetar la identidad visual de los flyers existentes (fondo, tipografia y logo están bien — no cambiarlos)
- Agregar **respiración visual**: espaciado generoso entre elementos para no generar fatiga al leer
- Cada servicio puede tener nombre en negrita + descripción secundaria más pequeña
- Incluir propuestas de valor: ✓ Diagnóstico sin cargo / ✓ Repuestos originales / ✓ Garantía / ✓ Turno en el día
- Pie de página con dispositivos: iPhone · iPad · MacBook · iMac · Apple Watch · AirPods

## ✅ Layout aprobado (flyer_servicios_apple.svg)
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
