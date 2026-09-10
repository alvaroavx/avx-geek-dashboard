# Seguridad

Última revisión documental: 2026-09-10. Alcance: revisión estática, sin pruebas de red.

| ID | Nivel | Riesgo y evidencia | Recomendación |
|---|---|---|---|
| SEC-01 | Alto | `sitios.js` crea `https.Agent({ rejectUnauthorized: false })`; acepta certificados inválidos. | Eliminar bypass y corregir la cadena TLS de los destinos. |
| SEC-02 | Medio | `/` y `/stream` no tienen auth ni rate limit en `app.js`. | Restringir acceso de red y añadir autenticación/límites antes de exponerlo. |
| SEC-03 | Medio | La sonda transmite `set-cookie`, `server` y errores al navegador. | No recolectar/mostrar cookies; redactor headers y errores. |
| SEC-04 | Medio | Redirecciones seguidas hasta cinco veces; destinos fijos hoy limitan SSRF, pero cambiar a URLs de entrada abriría riesgo. | Mantener allowlist, validar redirects y bloquear rangos privados si evoluciona. |
| SEC-05 | Bajo | Chart.js y fuente se cargan por CDN sin CSP versionada. | Definir CSP e integridad/hosting local según política. |
