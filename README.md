
# Estado de los sitios
Esta es una aplicación web para monitorear el estado de diferentes sitios web. La aplicación utiliza Express.js para crear un servidor web y una plantilla EJS para mostrar la información de los sitios web monitoreados.

# ¿Cómo funciona?
La aplicación realiza solicitudes HTTP a diferentes sitios web y verifica su tiempo de respuesta, código de estado, servidor y estado actual. Luego, muestra la información recopilada en una tabla en la página principal de la aplicación.

# ¿Cómo utilizar?
Para ejecutar la aplicación, primero debe instalar las dependencias necesarias. Para hacer esto, abra una terminal en el directorio raíz de la aplicación y ejecute el siguiente comando:

```
npm install
```

Una vez que se hayan instalado las dependencias, puede ejecutar la aplicación con el siguiente comando:

```
npm start
```

Esto iniciará el servidor web en el puerto 3000. Para acceder a la aplicación, abra un navegador web y vaya a la dirección http://localhost:3000.

# ¿Cómo está construida la aplicación?
La aplicación utiliza Express.js, un framework de Node.js para crear servidores web y aplicaciones web. Utiliza una plantilla EJS para generar la página HTML que se muestra al usuario.

## Archivos importantes
app.js: este archivo contiene la configuración principal de la aplicación, incluyendo la creación del servidor web y la gestión de las rutas.
views/index.ejs: esta es la plantilla EJS que se utiliza para generar la página HTML que se muestra al usuario.
public/css/style.css: este archivo contiene los estilos CSS utilizados en la aplicación.

# ¿Cómo contribuir?
Si desea contribuir a la aplicación, puede clonar el repositorio y crear una rama con su cambio. Una vez que haya completado su cambio, puede crear una solicitud de extracción para que se revise y se fusionen sus cambios con la rama principal.

# ¿Cómo informar un problema?
Si encuentra algún problema con la aplicación, puede informarlo creando un problema en el repositorio. Asegúrese de proporcionar detalles suficientes para que el problema pueda ser reproducido y solucionado.



