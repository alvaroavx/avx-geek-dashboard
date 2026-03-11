const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
const { sitios, construirEstadoInicial, obtenerEstadoDeSitio } = require('./sitios');

function construirResumen(estadoSitios) {
    const sitiosOk = estadoSitios.filter((sitio) => sitio.estado === 'OK');
    const sitiosNok = estadoSitios.filter((sitio) => sitio.estado === 'NOK');
    const tiempos = sitiosOk
        .map((sitio) => sitio.tiempoRespuestaMs)
        .filter((tiempo) => Number.isFinite(tiempo));
    const promedio = tiempos.length
        ? Math.round(tiempos.reduce((total, tiempo) => total + tiempo, 0) / tiempos.length)
        : null;
    const sitioMasRapido = [...sitiosOk]
        .filter((sitio) => Number.isFinite(sitio.tiempoRespuestaMs))
        .sort((a, b) => a.tiempoRespuestaMs - b.tiempoRespuestaMs)[0] || null;
    const sitioMasLento = [...sitiosOk]
        .filter((sitio) => Number.isFinite(sitio.tiempoRespuestaMs))
        .sort((a, b) => b.tiempoRespuestaMs - a.tiempoRespuestaMs)[0] || null;

    return {
        total: estadoSitios.length,
        ok: sitiosOk.length,
        nok: sitiosNok.length,
        promedioRespuestaMs: promedio,
        disponibilidadPct: estadoSitios.length ? Math.round((sitiosOk.length / estadoSitios.length) * 100) : 0,
        sitioMasRapido,
        sitioMasLento,
        ultimaRevision: new Date().toISOString()
    };
}

// Aquí debes agregar las rutas de tu aplicación
app.get('/', (req, res) => {
    const estadoSitios = sitios.map((sitio) => construirEstadoInicial(sitio));
    const resumen = construirResumen(estadoSitios);
    res.render('home', { estadoSitios, resumen });
});

app.get('/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendEvent = (event, payload) => {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    sendEvent('connected', { ok: true });

    await Promise.allSettled(
        sitios.map(async (sitio) => {
            const resultado = await obtenerEstadoDeSitio(sitio);
            sendEvent('site-update', resultado);
        })
    );

    sendEvent('complete', { finishedAt: new Date().toISOString() });
    res.end();
});
  
app.listen(PORT, () => {
    console.log(`La aplicacion esta escuchando en el puerto ${PORT}.`);
});
