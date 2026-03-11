# AVX Status Dashboard

Aplicacion web Node.js/Express para monitorear la disponibilidad de un conjunto acotado de sitios web y mostrar su estado en un dashboard renderizado en servidor.

## Que hace hoy

La aplicacion expone una sola pagina en `/` que:

1. toma una lista fija de sitios definida en `sitios.js`
2. hace requests HTTP(S) a cada sitio con `axios`
3. mide tiempo de respuesta y extrae algunos headers
4. arma un resumen de disponibilidad
5. renderiza el resultado en una vista EJS con un grafico de torta y un listado

No existe una API REST propia ni almacenamiento persistente. El dashboard se construye en cada request al home.

## Stack tecnico

- Backend: Node.js con Express 4
- Motor de vistas: EJS
- Cliente HTTP: Axios
- Visualizacion: Chart.js cargado desde CDN
- Estilos: Tailwind CSS cargado desde CDN en la vista
- Assets estaticos: `public/` expuesto con `express.static`

## Estructura de archivos

```text
.
|-- app.js
|-- sitios.js
|-- package.json
|-- tailwind.config.js
|-- public/
|   `-- css/
|       `-- styles.css
`-- views/
    `-- home.ejs
```

## Responsabilidad de cada archivo

### `app.js`

Es el punto de entrada del servidor.

- crea la aplicacion Express
- configura EJS como view engine
- expone `public/` como carpeta estatica
- importa `obtenerEstadoDeSitios` desde `sitios.js`
- define una sola ruta `GET /`
- escucha en `process.env.PORT` o usa `3000` por defecto

En terminos de arquitectura, este archivo hace a la vez de bootstrap del servidor y de controlador HTTP principal.

### `sitios.js`

Concentra la capa de datos y la logica de monitoreo.

- define el arreglo `sitios` con los objetivos a consultar
- implementa `obtenerEstadoDeSitios()`, que es la funcion realmente usada por la app
- mantiene dos funciones antiguas/no usadas:
  - `obtenerEstadoDeSitiosSecuencial()`
  - `obtenerEstadoDeSitiosOld()`

La funcion activa ejecuta las consultas en paralelo con `Promise.all`, mide latencia con `Date.now()` y devuelve objetos con esta forma aproximada:

```js
{
  nombre: 'UNIACC',
  url: 'https://repositoriobiblioteca.uniacc.cl/',
  estado: 'OK' | 'NOK',
  tiempoRespuesta: '123 ms',
  statusText: '200' | 'Error: ...',
  server: 'nginx',
  cookies: '...'
}
```

### `views/home.ejs`

Es la unica vista del sistema. Renderiza:

- barra superior
- titulo del dashboard
- grafico de torta con cantidad de sitios `OK` y `NOK`
- listado de sitios con nombre, tiempo de respuesta, estado y header `server`

La vista mezcla HTML, clases de Tailwind y logica EJS para recorrer `estadoSitios`.

### `public/css/styles.css`

Contiene solo las directivas base de Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Actualmente este archivo no esta enlazado desde `home.ejs`, por lo que no participa en el render real. El estilo visible proviene del CDN de Tailwind incluido en la vista.

### `tailwind.config.js`

Existe una configuracion de Tailwind, pero no hay un pipeline de build conectado a ella.

Observaciones:

- `content` esta vacio
- `purge` apunta a `./public/css/style.css`, pero el archivo real es `public/css/styles.css`
- `package.json` no define scripts para compilar Tailwind

En la practica, Tailwind esta instalado como dependencia de desarrollo, pero el proyecto no lo usa en su flujo actual.

### `package.json`

Define dependencias y metadatos del proyecto.

Dependencias efectivamente usadas por el codigo:

- `express`
- `ejs`
- `axios`
- `https` via modulo nativo de Node requerido en `sitios.js`

Dependencias declaradas pero usadas solo en el frontend via CDN o no integradas en runtime:

- `chart.js`: el grafico se carga desde CDN, no desde el paquete instalado
- `tailwindcss`: instalado, pero no compilado ni referenciado como asset local

Observacion importante: el proyecto incluye `npm start` para arranque normal y `npm run dev` para desarrollo.

## Flujo de ejecucion

1. Se inicia el servidor ejecutando `npm start` o `node app.js`.
2. Un usuario entra a `http://localhost:3000/`.
3. La ruta `GET /` llama a `obtenerEstadoDeSitios()`.
4. `sitios.js` consulta en paralelo cada URL configurada.
5. Cada resultado se normaliza en un objeto simple con estado y metadatos.
6. `app.js` renderiza `views/home.ejs` pasando `estadoSitios`.
7. La vista genera HTML final y crea el grafico con Chart.js en el navegador.

## Vistas, controladores y modelos

El proyecto no implementa una separacion MVC formal.

### Vistas

- `views/home.ejs`: unica vista del sistema

### Controladores

No existe un directorio `controllers/`. La funcion de controlador esta embebida en `app.js` dentro de la ruta:

```js
app.get('/', async (req, res) => {
  const estadoSitios = await obtenerEstadoDeSitios();
  res.render('home', { estadoSitios });
});
```

### Modelos

No hay modelos de dominio ni ORM.

El "modelo" real hoy es un arreglo en memoria (`sitios`) y los objetos de respuesta construidos dinamicamente por `obtenerEstadoDeSitios()`.

## APIs y comunicaciones externas

La aplicacion no expone endpoints JSON ni integra una API de terceros formal. Lo que hace es consumir directamente sitios web por HTTP/HTTPS para comprobar disponibilidad.

### Endpoint propio

- `GET /`: renderiza HTML con el estado de los sitios

### Servicios externos consultados

Los sitios activos hoy son:

- `https://repositoriobiblioteca.uniacc.cl/`
- `https://repositoriodigital.bcentral.cl/`

En `sitios.js` hay varios sitios adicionales comentados, lo que muestra que la lista se mantiene manualmente en codigo.

## Donde agregar nuevos sitios

Los nuevos sitios que quieras trackear se agregan en el arreglo `sitios` del archivo `sitios.js`.

Archivo a editar:

- `sitios.js`

Bloque actual:

```js
const sitios = [
  { nombre: 'UNIACC', url: 'https://repositoriobiblioteca.uniacc.cl/' },
  { nombre: 'Banco Central', url: 'https://repositoriodigital.bcentral.cl/' }
];
```

Ejemplo agregando un nuevo sitio:

```js
const sitios = [
  { nombre: 'UNIACC', url: 'https://repositoriobiblioteca.uniacc.cl/' },
  { nombre: 'Banco Central', url: 'https://repositoriodigital.bcentral.cl/' },
  { nombre: 'Nuevo Sitio', url: 'https://ejemplo.cl/' }
];
```

Que debes respetar:

- `nombre` es el texto que se mostrara en el dashboard.
- `url` debe ser la URL completa del sitio.
- cada entrada debe ir separada por comas.
- si agregas o cambias sitios, reinicia la app si la levantaste con `npm start`.

Notas utiles:

- el monitoreo ocurre cada vez que alguien entra a `/`.
- si un sitio falla por certificado, timeout o caida, aparecera como `NOK`.

### Headers aprovechados

Cuando una consulta resulta exitosa, la app intenta mostrar:

- codigo HTTP (`response.status`)
- header `server`
- header `set-cookie`

## Decisiones tecnicas visibles

### Renderizado del lado del servidor

La interfaz se genera en el backend con EJS. No hay SPA, React ni API intermedia.

### Monitoreo bajo demanda

Las verificaciones se ejecutan cuando alguien abre `/`. No existe scheduler, cache, cola ni almacenamiento historico.

### Consultas concurrentes

Se usa `Promise.all` para revisar todos los sitios en paralelo, lo que reduce el tiempo total de espera respecto a una version secuencial.

### Tolerancia TLS relajada

Las requests usan:

```js
new https.Agent({ rejectUnauthorized: false })
```

Eso desactiva la validacion estricta de certificados TLS. Es una decision pragmatica para evitar fallas por certificados invalidos, pero reduce seguridad y puede ocultar problemas reales de configuracion HTTPS.

### Configuracion hardcodeada

- lista de sitios fija en `sitios.js`
- puerto configurable via `PORT`, con default `3000`
- sin configuracion por entorno mas alla del puerto

## Limitaciones actuales

- solo existe una ruta
- no hay API JSON
- no hay base de datos
- no hay autenticacion, autorizacion ni sesiones reales
- no hay manejo centralizado de errores
- no hay timeout explicito en Axios
- no hay pruebas automatizadas
- no hay logs estructurados
- el footer muestra `2023` hardcodeado
- la vista asume que ciertos campos existen incluso cuando una consulta falla
- hay funciones legacy en `sitios.js` que no participan en el flujo actual
- hay dependencias/configuracion de Tailwind y Chart.js que no coinciden del todo con su uso real

## Observaciones de mantenimiento

- El README anterior no coincidia con el codigo real: mencionaba archivos y scripts que no existen hoy.
- `views/home.ejs` usa Tailwind desde CDN, mientras `public/css/styles.css` y `tailwind.config.js` sugieren un pipeline local incompleto.
- `chart.js` esta instalado en `package.json`, pero el navegador lo descarga desde CDN.
- El paquete `https` figura en dependencias aunque Node ya provee ese modulo de forma nativa.

## Como ejecutar el proyecto

Version recomendada de Node:

```bash
nvm use
```

Si no usas `nvm`, instala Node `20.x`.

Instalar dependencias:

```bash
npm ci
```

Levantar el servidor:

```bash
npm start
```

Modo desarrollo con recarga por cambios:

```bash
npm run dev
```

Puerto opcional:

```bash
PORT=3001 npm start
```

Luego abrir:

```text
http://localhost:3000/
```

## Resumen ejecutivo

AVX Status Dashboard es un monitor web muy simple, orientado a mostrar disponibilidad de sitios mediante renderizado server-side. La arquitectura actual es pequena y directa: Express como servidor, `sitios.js` como capa de consulta/datos, y `home.ejs` como unica interfaz. No hay controladores o modelos separados; esas responsabilidades estan resueltas con funciones y estructuras en memoria.
