# Guía para agentes IA

Última revisión documental: 2026-09-10.

Antes de modificar, lee `README.md`, `AGENTS.md`, [arquitectura](02-architecture.md), [API](07-api.md), [seguridad](09-security.md) y [deuda](17-technical-debt.md). Verifica código y prueba consumidores antes de cambiar el contrato SSE.

| Necesidad | Ubicación |
|---|---|
| Rutas HTTP / SSE | `app.js` |
| Destinos y sonda | `sitios.js` |
| Vista y cliente SSE | `views/home.ejs` |
| CSS | `public/css/`, `tailwind.config.js` |
| CI | `.github/workflows/expressjs.yml` |

No agregues entrada de URL sin controles SSRF, no expongas cookies/headers, no mantengas TLS inseguro como solución permanente y no declares que el dashboard tiene persistencia, alertas o auth: no se encontraron.
