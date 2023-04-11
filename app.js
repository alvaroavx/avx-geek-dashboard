const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
const { obtenerEstadoDeSitios } = require('./sitios');

// Aquí debes agregar las rutas de tu aplicación
app.get('/', async (req, res) => {
    const estadoSitios = await obtenerEstadoDeSitios();
    res.render('home', { estadoSitios });
});
  
app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000.');
});