# Desarrollo

Última revisión documental: 2026-09-10. Comandos declarados, no certificados en esta revisión.

Requiere Node 20 y npm según `package.json`.

```bash
npm install
npm run build:css
npm start
```

`npm test` no ejecuta pruebas: finaliza con error intencional. El workflow usa Node 16 y `npm run build`, inexistente; no representa CI funcional actual. Para probar SSE use destinos controlados o red permitida; no ejecute sondeos masivos sin autorización.
