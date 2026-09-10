# AGENTS.md

## Propósito

Dashboard Express server-rendered que consulta una lista fija de sitios y transmite resultados por SSE. Lee `README.md`, `docs/README.md`, `docs/02-architecture.md` y `docs/09-security.md` antes de cambiarlo.

## Mapa

- `app.js`: bootstrap Express, rutas `/` y `/stream`, resumen.
- `sitios.js`: inventario de destinos y sondas HTTP(S).
- `views/home.ejs`: HTML, lógica cliente SSE, filtros y gráficos.
- `public/`: assets y CSS generado.

## Invariantes y riesgos

- Los destinos se declaran en `sitios.js`; no aceptar URLs de request sin diseñar mitigación SSRF.
- `/stream` emite un resultado por destino y termina; no es monitor persistente.
- No exponer cookies, headers sensibles, secretos ni errores internos a la vista.
- No desactivar verificación TLS: actualmente está desactivada y es un riesgo que debe preservarse documentalmente hasta corregirse de forma coordinada.

## Validación

`npm test` falla deliberadamente porque no hay suite. Verifica sintaxis/build CSS y prueba `/` y `/stream` con destinos controlados antes de una modificación funcional.
