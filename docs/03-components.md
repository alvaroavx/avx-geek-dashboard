# Componentes

Última revisión documental: 2026-09-10.

| Componente | Ubicación | Responsabilidad | Riesgo |
|---|---|---|---|
| Servidor/rutas | `app.js` | Render inicial, SSE, resumen | Sin auth ni límites de clientes SSE. |
| Sondas | `sitios.js` | Lista fija, Axios, parseo HTML/headers | TLS desactivado; headers/cookies se recogen. |
| Vista | `views/home.ejs` | Render, SSE, filtros y Chart.js | Archivo concentra presentación y JS cliente. |
| Estáticos | `public/` | Imagen y Tailwind generado | CSS build depende de script local. |

Las funciones secuencial y `Old` de `sitios.js` no están llamadas desde `app.js`; la segunda contiene referencias no definidas y debe tratarse como código heredado, no como alternativa operativa.
