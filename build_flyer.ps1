# Script para construir el flyer SVG con imagen embebida y layout invertido (variación visual)
$imagePath = 'C:\Users\Santi\Github\tech-health\public\controller.png'
$outputPath = 'C:\Users\Santi\Flyers\flyer_consolas.svg'

$imageBytes = [System.IO.File]::ReadAllBytes($imagePath)
$base64 = [System.Convert]::ToBase64String($imageBytes)

$svg = @"
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1080"
   height="1080"
   viewBox="0 0 1080 1080"
   version="1.1"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg">

  <rect style="fill:#ffe66d;fill-opacity:1" width="1080" height="1080" x="0" y="0" />

  <!-- ======== LOGO GADGET (Se mantiene INTACTO en top right) ======== -->
  <g transform="matrix(0.62,0,0,0.62,396,10)">
    <g transform="matrix(0.345,0,0,0.345,908.68,-44.85)">
      <rect style="fill:#ffe66d;fill-opacity:1" width="512" height="512" x="-73.7" y="187.83" />
      <path style="fill:#1a535c;fill-opacity:1"
        d="m 155.39065,631.26507 c -19.63739,-3.0061 -36.6601,-8.19566 -53.9776,-16.45565
           C 78.085601,603.68285 62.464101,592.40534 44.842491,573.96988
           19.729731,547.6973 4.0684111,517.73326 -3.834079,480.83939
           c -2.50261,-11.68382 -2.70151,-14.35818 -2.72232,-36.60473
           -0.0259,-27.73629 1.35568,-37.0262 8.9298701,-60.04344
           9.8510399,-29.93638 25.4253999,-54.5463 48.7018599,-76.95656
           26.54776,-25.55982 56.508759,-41.30168 93.687889,-49.22472
           11.75709,-2.50549 14.37889,-2.69712 37.14983,-2.71523
           22.86394,-0.0182 25.33473,0.16 37,2.66835
           30.05646,6.46294 54.22488,17.40993 77.75278,35.21781
           5.36097,4.05764 11.76054,9.44943 14.22125,11.98177
           l 4.47403,4.60426 -18.89417,18.91382 -18.89416,18.91382
           -6.07987,-5.51915 c -15.16757,-13.76876 -36.69782,-25.03945 -57.60136,-30.15325
           -46.88502,-11.46987 -96.08225,3.08245 -129.978499,38.44707
           -18.61652,19.42297 -30.39555,42.40255 -35.55583,69.36545
           -2.61687,13.67337 -2.42342,36.1128 0.42836,49.68841
           5.55987,26.4672 17.05409,48.67407 34.90018,67.42726
           19.889019,20.89996 43.584709,33.95579 72.623239,40.01388
           12.90561,2.69241 34.8195,2.92955 48.32761,0.52298
           41.14468,-7.33023 75.3904,-32.51302 94.667,-69.61393
           4.82178,-9.28029 11.06795,-25.72943 13.02028,-34.2886
           l 0.62727,-2.75 h -65.51905 -65.51906 v -27 -27
           h 94.6172 94.6172 l -0.51176,26.25
           c -0.45203,23.18654 -0.81154,27.65425 -3.08057,38.28264
           -10.68557,50.05234 -39.53224,92.64448 -81.78853,120.76084
           -18.35922,12.21581 -43.10744,22.41304 -66.3209,27.3268
           -10.22836,2.16512 -15.25653,2.60284 -33.53264,2.91916
           -14.99285,0.2595 -24.2307,-0.0459 -30.5224,-1.00903 z" />
    </g>
    <text xml:space="preserve"
      style="font-weight:600;font-size:26.5px;font-family:'Myriad Pro',sans-serif;opacity:0.7;fill:#1a535c"
      x="922" y="210">
      <tspan x="922" y="210">GADGET</tspan>
    </text>
  </g>

  <!-- IMAGEN CONSOLA -->
  <image
    width="520"
    height="640"
    preserveAspectRatio="xMidYMid meet"
    x="30"
    y="40"
    style="mix-blend-mode: multiply;"
    xlink:href="data:image/png;base64,$base64" />

  <!-- ENCABEZADO Y TÍTULO (Derecha) -->
  <text xml:space="preserve" style="font-style:normal;font-weight:400;font-size:34px;font-family:'Myriad Pro',sans-serif;letter-spacing:8;fill:#1a535c;fill-opacity:0.75" x="530" y="92">
    <tspan x="530" y="92">ESPECIALISTAS EN</tspan>
  </text>
  <text xml:space="preserve" style="font-style:normal;font-weight:700;font-size:120px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="525" y="210">
    <tspan x="525" y="210">Consolas</tspan>
  </text>
  <rect x="530" y="238" width="400" height="5" rx="2.5" fill="#1a535c" opacity="0.5" />

  <!-- SERVICIOS -->
  <text xml:space="preserve" style="font-weight:600;font-size:20px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7;letter-spacing:3" x="530" y="290">
    <tspan x="530" y="290">NUESTROS SERVICIOS</tspan>
  </text>

  <rect x="530" y="315" width="4" height="36" rx="2" fill="#1a535c" />
  <text xml:space="preserve" style="font-weight:700;font-size:26px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="548" y="337">
    <tspan x="548" y="337">Reparaci&#243;n de joystick</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:400;font-size:18px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7" x="548" y="358">
    <tspan x="548" y="358">Drift, botones y gatillos</tspan>
  </text>

  <rect x="530" y="383" width="4" height="36" rx="2" fill="#1a535c" />
  <text xml:space="preserve" style="font-weight:700;font-size:26px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="548" y="405">
    <tspan x="548" y="405">Lectora y HDD</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:400;font-size:18px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7" x="548" y="426">
    <tspan x="548" y="426">PlayStation &#183; Xbox &#183; Nintendo</tspan>
  </text>

  <rect x="530" y="451" width="4" height="36" rx="2" fill="#1a535c" />
  <text xml:space="preserve" style="font-weight:700;font-size:26px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="548" y="473">
    <tspan x="548" y="473">Limpieza y pasta t&#233;rmica</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:400;font-size:18px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7" x="548" y="494">
    <tspan x="548" y="494">Mantenimiento preventivo</tspan>
  </text>

  <rect x="530" y="519" width="4" height="36" rx="2" fill="#1a535c" />
  <text xml:space="preserve" style="font-weight:700;font-size:26px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="548" y="541">
    <tspan x="548" y="541">Reparaci&#243;n de placa</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:400;font-size:18px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7" x="548" y="562">
    <tspan x="548" y="562">Micro-soldadura de precisi&#243;n</tspan>
  </text>

  <rect x="530" y="587" width="4" height="36" rx="2" fill="#1a535c" />
  <text xml:space="preserve" style="font-weight:700;font-size:26px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="548" y="609">
    <tspan x="548" y="609">Puerto HDMI / Carga</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:400;font-size:18px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7" x="548" y="630">
    <tspan x="548" y="630">Resoluci&#243;n de sin imagen/carga</tspan>
  </text>

  <line x1="62" y1="670" x2="1018" y2="670" stroke="#1a535c" stroke-width="1.5" stroke-opacity="0.25" />

  <!-- PROPUESTAS DE VALOR (Izquierda) -->
  <text xml:space="preserve" style="font-weight:600;font-size:20px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7;letter-spacing:2" x="62" y="720">
    <tspan x="62" y="720">&#10003;  Diagn&#243;stico sin cargo</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:600;font-size:20px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7;letter-spacing:2" x="62" y="757">
    <tspan x="62" y="757">&#10003;  Repuestos originales</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:600;font-size:20px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7;letter-spacing:2" x="62" y="794">
    <tspan x="62" y="794">&#10003;  Garant&#237;a por el trabajo</tspan>
  </text>
  <text xml:space="preserve" style="font-weight:600;font-size:20px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.7;letter-spacing:2" x="62" y="831">
    <tspan x="62" y="831">&#10003;  Turno en el d&#237;a</tspan>
  </text>

  <!-- BLOQUE DERECHO INFERIOR: Contacto y WhatsApp (INTACTO) -->
  <text xml:space="preserve" style="font-weight:400;font-size:22px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.75;font-style:italic" x="530" y="715">
    <tspan x="530" y="715">Tu consola lista para seguir jugando.</tspan>
  </text>
  <rect x="530" y="730" width="180" height="3" rx="1.5" fill="#1a535c" opacity="0.4" />

  <g transform="translate(530, 760)">
    <rect width="48" height="48" rx="12" fill="#1a535c" />
    <text x="24" y="33" style="font-size:26px;text-anchor:middle;fill:#ffe66d;">&#128241;</text>
  </g>

  <text xml:space="preserve" style="font-weight:700;font-size:58px;font-family:'Myriad Pro',sans-serif;fill:#1a535c" x="594" y="806">
    <tspan x="594" y="806">381 565&#8209;8239</tspan>
  </text>

  <text xml:space="preserve" style="font-weight:400;font-size:18px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.6" x="594" y="828">
    <tspan x="594" y="828">Escribinos por WhatsApp</tspan>
  </text>

  <line x1="62" y1="866" x2="1018" y2="866" stroke="#1a535c" stroke-width="1.5" stroke-opacity="0.25" />

  <text xml:space="preserve" style="font-weight:400;font-size:17px;font-family:'Myriad Pro',sans-serif;fill:#1a535c;fill-opacity:0.55;text-anchor:middle" x="540" y="908">
    <tspan x="540" y="908">PlayStation &#183; Xbox &#183; Nintendo Switch &#183; PC Gaming</tspan>
  </text>

</svg>
"@

[System.IO.File]::WriteAllText($outputPath, $svg, [System.Text.Encoding]::UTF8)
Write-Host "✅ Flyer corregido guardado."
