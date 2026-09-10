# Deuda técnica

Última revisión documental: 2026-09-10.

| ID | Área | Problema | Evidencia | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|---|---|
| TD-001 | Seguridad | Verificación TLS desactivada. | `sitios.js` | Alto | S | P0 |
| TD-002 | CI | Workflow usa Node 16 y script `build` ausente. | `.github/workflows/expressjs.yml`, `package.json` | Alto | S | P1 |
| TD-003 | Testing | No hay suite; script falla intencionalmente. | `package.json` | Medio | M | P1 |
| TD-004 | Diseño | Vista EJS contiene gran cantidad de JS cliente. | `views/home.ejs` | Medio | M | P2 |
| TD-005 | Código | Sondas heredadas no usadas y una con variables indefinidas. | `sitios.js` | Bajo | XS | P3 |

Hotspot: `sitios.js` concentra inventario, transporte, TLS, parseo y proyección de datos. Cualquier cambio debe revisar privacidad de headers, timeout, redirects y consumidores SSE.
