# Interfaces

Última revisión documental: 2026-09-10.

| Método | Ruta | Auth | Salida | Handler |
|---|---|---|---|---|
| GET | `/` | No observada | HTML EJS con estado pendiente | `app.js` |
| GET | `/stream` | No observada | `text/event-stream`: `connected`, `site-update`, `complete` | `app.js` |

`site-update` serializa el objeto de sonda: estado, latencia, status, servidor, cookies, título, URL final y fecha. No existe contrato OpenAPI ni códigos de negocio. Exponer cookies o mensajes de error del destino al navegador es una superficie de información sensible.
