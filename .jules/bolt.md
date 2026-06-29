# Bolt's Journal

## 2024-06-29 - [Optimización de ciclos de vida en cliente]
**Learning:** El uso de `setInterval` para actualizaciones periódicas de UI (como badges de estado) puede consumir recursos innecesarios cuando el componente no es visible.
**Action:** Implementar `IntersectionObserver` para pausar intervalos cuando los elementos están fuera del viewport, reduciendo el uso de CPU en segundo plano.
