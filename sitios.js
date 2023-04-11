const axios = require('axios');
const https = require('https');

const sitios = [
    { nombre: 'UNIACC', url: 'https://repositoriobiblioteca.uniacc.cl/' },
    { nombre: 'Banco Central', url: 'https://repositoriodigital.bcentral.cl/' }/*,
    { nombre: 'UFT', url: 'https://repositorio.uft.cl/' },
    { nombre: 'UV', url: 'http://repositoriobibliotecas.uv.cl/' },
    { nombre: 'CORFO', url: 'http://repositoriodigital.corfo.cl/' },
    { nombre: 'CCHC', url: 'https://directorio.cchc.cl/' },
    { nombre: 'UAHC Bibliografias', url: 'https://bibliografias.academia.cl/' },
    { nombre: 'UAHC Biblioteca Digital', url: 'http://bibliotecadigital.academia.cl/' },
    { nombre: 'UCSH', url: 'http://repositorio.ucsh.cl/' },
    { nombre: 'UDD', url: 'https://repositorio.udd.cl/' },
    { nombre: 'UDLA', url: 'https://repositorio.udla.cl/' },
    { nombre: 'UVM', url: 'http://repositorio.uvm.cl/' },
    { nombre: 'UAC', url: 'http://repositorio.uac.cl/' },
    { nombre: 'Valle Central', url: 'http://repositorio.vallecentral.cl/' }*/
  ];

async function obtenerEstadoDeSitios() {
  const resultados = await Promise.all(sitios.map(async (sitio) => {
      try {
          const tiempoInicio = Date.now();
          const response = await axios.get(sitio.url, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
          const tiempoFin = Date.now();
          const tiempoRespuesta = tiempoFin - tiempoInicio;
          return {
              nombre: `${sitio.nombre}`,
              url: `${sitio.url}`,
              estado: `OK`,
              tiempoRespuesta: `${tiempoRespuesta} ms`,
              statusText: `${response.status}`,
              server: `${response.headers['server']}`,
              cookies: `${response.headers['set-cookie']}`
          };
      } catch (error) {
          return {
              nombre: `${sitio.nombre}`,
              url: `${sitio.url}`,
              estado: `NOK`,
              statusText: `${error}`,
          };
      }
  }));
  return resultados;
}

async function obtenerEstadoDeSitiosSecuencial() {
    const resultados = [];
  
    for (const sitio of sitios) {
      try {
        const tiempoInicio = Date.now();
        const response = await axios.get(sitio.url);
        const tiempoFin = Date.now();
        const tiempoRespuesta = tiempoFin - tiempoInicio;
        resultados.push({ 
            nombre: sitio.nombre, 
            url: sitio.url,
            estado: `OK`, 
            tiempoRespuesta: `${tiempoRespuesta} ms`, 
            statusText: `${response.status}`,
            server: `${response.headers['server']}`,
            cookies: `${response.headers['set-cookie']}`
        } );
      } catch (error) {
        resultados.push({ 
            nombre: sitio.nombre, 
            url: sitio.url,
            estado: `ERROR (${error})` 
        });
      }
    }
  
    return resultados;
}

async function obtenerEstadoDeSitiosOld() {    
      
      const resultados = [];
    
      for (const sitio of sitios) {
        try {
          await axios.get(sitio.url);
          resultados.push({ nombre: sitio.nombre, reponse: response, estado: 'arriba' });
        } catch (error) {
          resultados.push({ nombre: sitio.nombre, reponse: response, estado: 'abajo' });
        }
      }
    
      return resultados;
}

module.exports = { obtenerEstadoDeSitios };
