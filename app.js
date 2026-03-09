const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
const { obtenerEstadoDeSitios } = require('./sitios');

// Aquí debes agregar las rutas de tu aplicación
app.get('/', async (req, res) => {
    const estadoSitios = await obtenerEstadoDeSitios();
    res.render('home', { estadoSitios });
});
  
app.listen(PORT, () => {
    console.log(`La aplicacion esta escuchando en el puerto ${PORT}.`);
});
