const express = require('express');
const axios = require('axios');
const errorHandler = require('express-error-handler');
const app = express();

const { obtenerEstadoDeSitios } = require('./sitios');

// Configurar el motor de plantillas
app.set('view engine', 'ejs');
// Agregar middleware para mostrar errores
app.use(errorHandler());
// Definir carpeta public como estatica
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu aplicación de monitoreo!');
});

app.get('/sitios', async (req, res) => {
    // Obtiene los estados de todos los sitios
    const estadoSitios = await obtenerEstadoDeSitios();

    // Renderizar la vista de estado de los sitios y pasar los datos del estado
    res.render('sitios', { estadoSitios });
  });


app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000.');
});