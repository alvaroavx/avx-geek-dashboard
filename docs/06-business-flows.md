# Flujos

Última revisión documental: 2026-09-10.

## Consulta de estado

Actor: operador. Trigger: carga `/`. Express crea estado inicial `NOK/Pendiente` para cada destino y renderiza la vista. El navegador abre `/stream`; el servidor consulta todos los sitios con `Promise.allSettled`, emite `site-update` por resultado y luego `complete`. Resultado: una fotografía por carga, sin retención histórica.

Errores de red retornan como `NOK`; timeout Axios: 15 segundos; redirects: hasta 5. Las actualizaciones no implican una alerta ni una persistencia.
