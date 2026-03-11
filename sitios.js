const axios = require('axios');
const https = require('https');

const sitios = [
  {
    nombre: 'AVX Informática',
    url: 'https://avx.cl/',
    categoria: 'Tecnología',
    descripcion: 'Servicios tecnológicos y soluciones digitales de AVX.'
  },
  {
    nombre: 'Espacio Elementos',
    url: 'https://espacioelementos.cl/',
    categoria: 'Cultura y deporte',
    descripcion: 'Espacio cultural y deportivo con propuesta corporativa y comunitaria.'
  },
  {
    nombre: 'WMD Consultores',
    url: 'https://wmd.cl/',
    categoria: 'Asesoría legal',
    descripcion: 'Consultora legal para personas y empresas en materias bancarias, comerciales y tributarias.'
  },
  {
    nombre: 'Fundación Queltehue',
    url: 'https://fundacionqueltehue.cl/',
    categoria: 'Fundación',
    descripcion: 'Sitio institucional de Fundación Queltehue.'
  }
];

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

function extraerMetaDescripcion(html = '') {
  const match =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);

  return match ? match[1].trim() : '';
}

function extraerTitulo(html = '') {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : '';
}

function construirEstadoInicial(sitio) {
  return {
    nombre: sitio.nombre,
    url: sitio.url,
    estado: 'NOK',
    tiempoRespuesta: 'Pendiente',
    tiempoRespuestaMs: null,
    statusText: 'Esperando chequeo',
    statusCode: null,
    server: 'Pendiente',
    cookies: 'Pendiente',
    titulo: sitio.nombre,
    descripcion: sitio.descripcion,
    categoria: sitio.categoria,
    contentType: 'Pendiente',
    finalUrl: sitio.url,
    host: new URL(sitio.url).host,
    protocolo: sitio.url.startsWith('https') ? 'HTTPS' : 'HTTP',
    checkedAt: null
  };
}

async function obtenerEstadoDeSitio(sitio) {
  try {
    const tiempoInicio = Date.now();
    const response = await axios.get(sitio.url, {
      httpsAgent,
      maxRedirects: 5,
      timeout: 15000,
      validateStatus: () => true
    });
    const tiempoFin = Date.now();
    const tiempoRespuestaMs = tiempoFin - tiempoInicio;
    const title = extraerTitulo(response.data);
    const description = extraerMetaDescripcion(response.data) || sitio.descripcion;
    const statusCode = response.status;
    const finalUrl = response.request?.res?.responseUrl || sitio.url;
    const host = new URL(finalUrl).host;
    const protocolo = finalUrl.startsWith('https') ? 'HTTPS' : 'HTTP';
    const estado = statusCode >= 200 && statusCode < 400 ? 'OK' : 'NOK';

    return {
      nombre: sitio.nombre,
      url: sitio.url,
      estado,
      tiempoRespuesta: `${tiempoRespuestaMs} ms`,
      tiempoRespuestaMs,
      statusText: `${statusCode}`,
      statusCode,
      server: response.headers.server || 'No informado',
      cookies: `${response.headers['set-cookie'] || 'No informado'}`,
      titulo: title || sitio.nombre,
      descripcion: description,
      categoria: sitio.categoria,
      contentType: response.headers['content-type'] || 'No informado',
      finalUrl,
      host,
      protocolo,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      nombre: sitio.nombre,
      url: sitio.url,
      estado: 'NOK',
      tiempoRespuesta: 'Sin respuesta',
      tiempoRespuestaMs: null,
      statusText: error.code || error.message || 'Error desconocido',
      statusCode: null,
      server: 'No disponible',
      cookies: 'No disponible',
      titulo: sitio.nombre,
      descripcion: sitio.descripcion,
      categoria: sitio.categoria,
      contentType: 'No disponible',
      finalUrl: sitio.url,
      host: new URL(sitio.url).host,
      protocolo: sitio.url.startsWith('https') ? 'HTTPS' : 'HTTP',
      checkedAt: new Date().toISOString()
    };
  }
}

async function obtenerEstadoDeSitios() {
  return Promise.all(sitios.map((sitio) => obtenerEstadoDeSitio(sitio)));
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

module.exports = {
  sitios,
  construirEstadoInicial,
  obtenerEstadoDeSitio,
  obtenerEstadoDeSitios
};
