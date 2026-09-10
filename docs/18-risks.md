# Riesgos

Última revisión documental: 2026-09-10.

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| RISK-001 | Dashboard público filtra metadatos de destinos. | Media | Alto | Auth, redacción y control de red. |
| RISK-002 | Sondas paralelas consumen conexiones por cada cliente SSE. | Media | Medio | Cache central, límites y scheduler si crece. |
| RISK-003 | CI no detecta regresiones. | Alta | Medio | Corregir workflow y añadir pruebas. |
| RISK-004 | Infraestructura, TLS propio y alertas no documentadas. | Media | Medio | Runbook versionado o referenciado. |
