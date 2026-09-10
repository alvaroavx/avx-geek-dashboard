# Overview

Última revisión documental: 2026-09-10. Estado: reconstruido desde implementación.

| Campo | Estado |
|---|---|
| Tipo | Monolito Node.js/Express, renderizado servidor |
| Propósito | Presentar disponibilidad y latencia de una lista fija de sitios administrados |
| Usuarios | Operadores con acceso al dashboard; no hay auth implementada |
| Stack | Node 20 declarado, Express 4, EJS, Axios, Chart.js/Tailwind cliente |
| Datos | Configuración en memoria; sin persistencia |
| Interfaces | `GET /` y `GET /stream` (SSE) |

## En 5 minutos

`/` entrega tarjetas iniciales sin sondeo. El navegador abre `/stream`; el servidor consulta destinos de `sitios.js` en paralelo y envía actualizaciones SSE. `home.ejs` actualiza tarjetas y gráficos. El proceso no guarda historial, ni aplica autenticación ni realiza monitorización continua.
