> [!NOTE]
> Paso a paso de todo el temario `Frontend PRO`. 
> Todo el proceso se desarrolla en este repositorio.
> 
> Instructor :  Javier  
> ciudad : Madrid  
> web : https://javiermiguel.com   
> jamg44@gmail.com   
> twitter : @JavierMiguelG  
> Guía https://github.com/KeepCodingWeb15/backend-nodejs-mongodb/commits/main/  

# Arrancamos

Partimos de una pequeña aplicacion que ya teníamos en https://github.com/alexjust-data/FullStack_FrontendPro y hemos iniciado el primer commit

```sh
➜  nodeapp git:(main) git tag 

1_Initial_Commit
```

**Arrancamos MongoDB**

Ya lo tienes instalado (si quieres repasar veta aquí https://github.com/alexjust-data/FullStack_Node_mongoDB)

```sh
$ cd /Applications/mongodb-macos-x86_64-7.0.1

# arranca la base de datos
$ ./bin/mongod --dbpath ./data/db
```

Con esto ya tiene mongoDb en marcha

**Arrancamos Aplicación**

Me he instalado `npm install --save-dev cross-env` que es una herramienta utilizada en proyectos Node.js para establecer variables de entorno de manera que funcione en múltiples sistemas operativos, como Unix y Windows.

```sh
cd FullStack_FrontendPro/nodeapp
npm run dev

> nodeapp@0.0.0 dev
> cross-env DEBUG=nodeapp:* nodemon ./bin/www

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node ./bin/www`
  nodeapp:server Listening on port 3000 +0ms
Conectado a MongoDB en cursonode
```

Con esto ya debería estar funcionando tu aplicación


## HTTPS en mi entorno local

Para desarrollar sólo en nuestra máquina local. Cuando sea real utilizarás un certificado oficial con herraminentas de despliegue.

* manual : https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/
* shell : https://github.com/dakshshah96/local-cert-generator
* mkcert : https://github.com/FiloSottile/mkcert

**También podemos usar:**  
https://ngrok.com/

Cuando arrancas la app en el puerto 3000 por ejemplo, crea un proxy en sus servidores y todas las peticiones que haces a engrock la redirigje a tu puerto 3000 y el servidor que despliga en los servidores de ngroik ya está usando http. Es muy sencillo.

```sh
#https://dashboard.ngrok.com/ Authentication / Your Authtoken
ngrok authtoken <token>
ngrok http 3000
ngrok http -auth="username:password" 3000
http://localhost:4040/status
```

**Incluso otra más sencilla que yo uso:**  
https://github.com/localtunnel/localtunnel

npx localtunnel -p 3000 
npx localtunnel -p 3000 --subdomain jamg44 

```sh
# arranca la base de datos
./bin/mongodb --dppath ./data
# ejecutaslocaltunnel
npx localtunnel --port 3000
# esta es tu url
your url is hhtps://easy-melons....
```

**Comparados**

- ngrok: http/https/tcp tunnels  --> para qué sirven? Un tunel es para si quieres hacer un tunnel a un servicio que no utilice el protocolo http, por ejemplo bbsss mongoDb, postgrest, mysql.
- 
- Localtunnel: solo http/https, pero tiene custom domains  


## Debugging

**Consola**

```js
//mensaje con marcador para un string, salida en stdout stream
console.log("Hello %s", "World");
//mensaje con marcador para un int, salida en stdout stream
console.log("Number of items: %d", 5);
//mensaje con salida en stdout stream
console.info("Hello Info");
//mensaje con salida en stderr stream
console.error("Hello on Stdout");
//mensaje con salida en stderr stream
console.warn("Hello Warn");
```

```js
//empieza a contar tiempo
console.time("100mil_elementos");

for(var i=0;i<100000000;i++) 
{
    let a = 1;
    a = a * i; 
}

//para de contar
console.timeEnd("100mil_elementos"); // 100mil_elementos: 462ms
```


```js
//Escribe a stderr 'Trace :', seguido de nuestro mensaje
console.trace("Traza");

Trace: Traza
    at test (/Users/javi/traza.js:21:13)
    at Object.<anonymous> (/Users/javi/traza.js:25:1)
    at Module._compile (module.js:434:26)
    at Object.Module._extensions..js (module.js:452:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Function.Module.runMain (module.js:475:10)
    at startup (node.js:117:18)
    at node.js:951:3
```

Si ponemos la instrucción debugger; en una linea podremos parar la ejecución ahí. Arrancamos con argumento debug:

```sh
$ node debug prueba.js

    < Debugger listening on port 5858 debug> . ok
    break in prueba.js:1
    >   1 "use strict";
        2
        3 let neo = { name: 'Thomas', age: 33, surname: 'Andreson'}; debug>
```

Algunos comandos en debugger en consola:

```sh
cont, c - Continue execution next, n - Step next
step, s - Step in
out, o - Step out
pause - Pause running code
repl - Entra en modo evaluación (Ctrl+c para salir) help - Muestra comandos
restart - Re-inicia aplicación
kill - Mata la aplicación
scripts - Muestra scripts cargados
```

## --inspect y Chrome

Browser y en nodeJs arrancar la aplicacion con este comando

```sh
# chrome://inspect
➜  nodeapp git:(main) ✗ node --inspect-brk ./bin/www

Debugger listening on ws://127.0.0.1:9229/d54a4555-92cd-408a-9f59-5f7f83741f43
For help, see: https://nodejs.org/en/docs/inspector
```

`index.js ` esto es el fichero que quieres que ejecute, su tu aplicación arranca en `./bin/wwww` pues pon esto y arrancaras el debugger y verás que te muestra una guía.

Vete al browser y pone esto `chrome://inspect` verás que te permite hacer un link en `inspect` a las `DevTools` de tu codigo y está en la primera linea para esperando ¿porqué? porque en el arranque `node --inspect-brk index.js ` le pusiste `-brk`.  

![](nodeapp/public/assets/img/1readme.png)

Escojes la carpeta de la app

![](nodeapp/public/assets/img/2readme.png)

Y a apartir de ahí te vas a los archivos que quieras y colocas los `breakpoints`. Recargas la página `localhost:3000` y se irá parando en los puntos

En **VSC**

Con VSC tienes los mismo en el `play con bicho` que te pide crear un archivo `launch.json` para `node.js` que lo crea en la raiz y le añades `"cwd": "${workspaceFolder}/nodeapp",` la carpeta de trabajo y el programa a ejecutar ` "program": "./bin/www"`

```json
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "cwd": "${workspaceFolder}/nodeapp",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "./bin/www"
        }
    ]
}
```

Teniendo apagado el programa, le das al `Launch Progran` para arrancar desde terminal verás que conecta con mongoDB y se para en el breakpoint que le pusiste.


## Cluster

Cuando desarrolles no hace falta, te irá bien en diferentes escenario cuando despliegues la aplicación.

Poner tu aplicación en modo cluster se refiere a la técnica de iniciar múltiples instancias de tu aplicación Node.js para que corran en paralelo. Esto se hace normalmente para aprovechar al máximo los sistemas de múltiples núcleos/CPUs, ya que Node.js es un entorno de ejecución de un solo hilo por defecto. Al usar el modo cluster, puedes crear un proceso principal (master) que lanza varios procesos hijos (workers), cada uno corriendo su propia instancia de tu aplicación.

* Uso Eficiente de Recursos : permite que tu aplicación cree un proceso por núcleo
* Mejora del Rendimiento y Confiabilidad : Con varios procesos corriendo en paralelo, las tareas se pueden distribuir entre ellos. 
* Tolerancia a Fallos : En un cluster, si un worker se cae (debido a errores no capturados, por ejemplo), puede ser reemplazado por un nuevo worker sin afectar la disponibilidad de la aplicación. 
* Esclalabilidad : El modo cluster facilita la escalabilidad de tu aplicación. A medida que la carga en tu aplicación crece, puedes aumentar el número de workers en el cluster para manejar la carga adicional, suponiendo que la infraestructura subyacente tenga los recursos necesarios disponibles.


> [!IMPORTANT]
> seguimos con el código


Me hago una copia del fichero `./bin/www` y le llamo `./bin/cluster` y le añado estas lineas

https://nodejs.org/api/cluster.html


```js
/**
 * Module dependencies.
 */

// var app = require('../app');
// var debug = require('debug')('nodeapp:server');
// var http = require('http');
const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary) {
  // arrancar los workers
  console.log('Arrancando el primario')

  const numCores = os.cpus().length

  for (let i = 0; i < numCores; i++) {
    cluster.fork();
  }

  cluster.on('listening', (worker, address) => {
    console.log(`Worker ${worker.id} arrancado con PID ${worker.process.pid} `)
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.id} con PID ${worker.process.pid} se ha parado con codigo ${code} y signal ${signal}`)
    console.log('Arranco otro worker');
    cluster.fork();
  })

  // si soy primary no hago nada más
} else {
  // soy un worker, por tanto me pongo a atender peticiones

```

El proceso principal es el proceso original que inicia la aplicación y es responsable de iniciar los procesos trabajadores (workers).

```sh
# arranco el fichero cluster
➜  nodeapp git:(main) ✗ node ./bin/cluster

Arrancando el primario
Worker 4 arrancado con PID 12379 
Worker 3 arrancado con PID 12378 
Worker 1 arrancado con PID 12376 
Worker 2 arrancado con PID 12377 
Worker 8 arrancado con PID 12383 
Worker 6 arrancado con PID 12381 
Worker 7 arrancado con PID 12382 
Worker 5 arrancado con PID 12380 
```

si abres `monitor de actividad` verás 


Los eventos que emite los escucharemos así:

```js
  // al arrancar un worker...
cluster.on('online', function(worker) { console.log('Worker ' + worker.id +
      ' is online with pid ' + worker.process.pid);
  });


// al terminar un worker...
cluster.on('exit', function(worker, code, signal) { console.log('worker ' + worker.process.pid + ' died');
});
```

Cuando un worker muere emite el evento exit. En este momento podemos reaccionar y crear otro que le sustituya:

```js
  // al terminar un worker...
cluster.on('exit', function(worker, code, signal) { console.log('Worker ' + worker.process.pid +
    ' died with code: ' + code +
    ', and signal: ' + signal);
  console.log('Starting a new worker');
  cluster.fork();
});
```

El proceso master puede mandar mensajes a los workers.

```js
// master
// cluster.workers nos da una lista de los que tenemos
worker.send('hello from the master');
// worker
process.on('message', function(message) { console.log(message);
});
```

Los workers pueden mandar mensajes al master.

```js
// worker
process.send('hello from worker with id: ' + process.pid);
// master
worker.on('message', function(message) { console.log(message);
});
```

Con cluster aumentaremos notablemente el rendimiento de nuestro servidor, usando más recursos del sistema.

Cuando vayas hacer pruebas de carga de tu app, tendrás que pensar cuántas peticiones por segundo vas a recibir, entonces has de hacer un Bechmark una prubea de rendimiento de la aplicacion para sacar la tabla de cuantas workers necesitas para los `single Proces` que vas a cargar

Concurrente, cada vez en el tiempo atiendo una peticion

Es recomendable leer la documentación! https://nodejs.org/api/cluster.html



## Internacionalización y localización

Se hace normalmente en frontend no en el backend. Depende si tu web es una singlepageaplication () o si es una multipageaplication. Normalmente lo `contenidos`de la web no se traduce de esta forma, orque está en la base de datos y es variable. Eso lo encargas a quien crea el contenido, es dinémico y es el usuario quien tiene o se le deja la responsabilidad de traducir si quiere. CMS´s gestores de contenido que guardan las traducciones en la base de datos, esta es la internacionalizacion de contenidos. Pero eso no es lo que veremos ahora.

**Nuestra web, en varios idiomas**

El objetivo de la internacionalización y la localización es permitir a un único sitio web ofrecer sus contenidos en diferentes idiomas y formatos adaptados a su audiencia.

No sólo vale con traducir, también hay que formatear los contenidos en función de las preferencias del usuario.

* Formato de fecha España: dd/mm/yyyy 
* Formato de fecha USA: mm/dd/yyyy

**Definiciones**

* Internacionalización: preparar el software para que sea localizable (trabajo de desarrolladores).
* Localización: escribir la traducción y los formatos locales (trabajo de traductores)

**Cómo traducir en Node.js**

```sh
#Instalar i18n-node - 
npm install i18n

#Inicializar i18n con 
i18n.configure({ ... })

#Crear archivos de mensajes en carpeta locales 

#En nuestro código, usar la función i18n._ _()
```

https://github.com/mashpie/i18n-node


**Configuración**

```js
const i18n = require("i18n");

i18n.configure({
    directory: path.join(__dirname,'../locales'), defaultLocale: 'en',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
    objectNotation: true,
    register: global
});
```

> [!IMPORTANT]
> seguimos con el código

**Manos a la obra con nodeapp (vamos a internacionalizarla)**

```sh
npm install i18n --save
```

puedes ver todas las configuraciones que tiene en https://github.com/mashpie/i18n-node

vamos a carpeta y cremaos fichero `lib/i18nConfigure.js` aquí cagamos la librerios

```js
// cargar librería i18n
const i18n = require('i18n');
const path = require('node:path');

// configurar mi instancia de i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'), // creo carpeta locales
  defaultLocale: 'en', // idioma por defecto
  autoReload: true, // watch for changes in JSON files to reload locale on updates 
  syncFiles: true, // sync locale information across all files
  cookie: 'nodeapp-locale'
});

// para utilizar en scripts
i18n.setLocale('en');

// exportar
module.exports = i18n
```

Fíjate que tiene que ir creando la carpeta `lib/locales`.  Ahora cargamos este modulo en `app.js` y vamos a crear un midelwork que utilice el midelwork que nos da `i18n`

`app.js`
```js
const i18n = require('./lib/i18nConfigure');

...

/**
 * Rutas del website
 */
app.use(i18n.init);
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));
```

esto lo que hace es leer la cabecera antes de `/` y de `/users` y de ahí va a saber qué idioma tiene que utilizar para cada petición.

Vamos a utilizarlo ahora. Comenzamos por `views/index.ejs` ahí tenemos un 
`<p>Welcome to<%= title %></p>` que lo renderiza `route/index.js` con el 

```js
/* GET home page. */
router.get('/', function(req, res, next) {
    ...
      res.render('index'); //<--aquí renderizamos Wellcome>
});
```

Ahora este literal que yo quiero internacionalizar lo hago así `<p><%= __('Welcome to') %> <%= title %></p>` fíjate que la función con dos guiones bajos `__` está disponible porque hemos metido en `app` este init `app.use(i18n.init);` y lo que hace es buscar esto 'Wellcome to' en los ficheros de idiomas y lo creará cuando ejecutes. Si te vas a la carpeta `locales` verás que ha creado dos ficheros de idioma de ingles y español `en.json` , cuando recargas el browser le pedirá el idioma que tenga el usuario.

En cualquier vista lo podrías traducir, por ejemplo `views/cabecera` siempre con el mismo `<%=__(...)%>`


**Plurales**

Esta llibrería nos ayuda con los plurales `i18n.__n() `.

```js
<h2><%= __('i18n example for plurals') %></h2>
<p>Hay 0 <%= __n('Mouse', 0) %></p>
<p>Hay 1 <%= __n('Mouse', 1) %></p>
<p>Hay 2 <%= __n('Mouse', 2) %></p>
<p>Hay 3 <%= __n('Mouse', 3) %></p>
```

**lo usamos en los controladores**

POr ejemplo el HOLA del controlador `index.js` le añadimos el objeto de respuesta `res.__(....)`

```js
/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.texto = res.__('Hola');
//   res.locals.nombre = '<script>alert("inyección de código")</script>'

//   const ahora = new Date();
//   res.locals.esPar = (ahora.getSeconds() % 2) === 0;
//   res.locals.segundoActual = ahora.getSeconds();

//   res.locals.usuarios = [
//     { nombre: 'Smith', edad: 32 },
//     { nombre: 'Jones', edad: 27 }
//   ]

  res.render('index');
});
```


### Selector de idioma

Vamos a utilizar una **PLANTILLA** y así practicamos como se hace. Hay cientos de sitios con plantillas gratis y de pago.

* https://startbootstrap.com/themes
* me descargo esta plantilla : https://startbootstrap.com/theme/new-age

pongo el .zip dentro de la carpeta de la app. A la carpeta que se ha descomprimido le llamo plublic, si recargas la palicacion desde el browser ya puedes ver el template en la app.

Ya aparece porque en `app.js` va a mirar a ver si lo puede encontrar ahí en `plublic/index.html`

```js
// middlewares
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // parea el body en formato urlencoded
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
```

Voy a utilizar trocitos de la plantilla y lo voy a llamar `plublic/index_from_template.html`. 
* Voy a copiar una parte de la cabecera y lo voy a pegar en `views/cabecera.ejs`
* Voy a copiar el Footer y lo copio en una vista nueva que le voy a llmar `pie.ejs` y lo pego
* En mi vista index le meto el include `<% include cabecera.ejs %>` y el `<% include pie.ejs %>` y areglo cosas para que se vea bien con el template


Me creo el archivo `routes/api/features.js`

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('features'); // quiero que renderice esta vista que crearé ahora
});

module.exports = router;
```

Creo vista `views/features.ejs` y copio parte del template

```html
<% include cabecera.ejs %>
  <!-- Basic features section-->
  <section class="bg-light">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div class="col-12 col-lg-5">
                <h2 class="display-4 lh-1 mb-4"><%= __('Enter a new age of web design') %></h2>
                <p class="lead fw-normal text-muted mb-5 mb-lg-0">This section is perfect for featuring some information about your application, why it was built, the problem it solves, or anything else! There's plenty of space for text here, so don't worry about writing too much.</p>
            </div>
            <div class="col-sm-8 col-md-6">
                <div class="px-5 px-sm-0"><img class="img-fluid rounded-circle" src="https://source.unsplash.com/u8Jn2rzYIps/900x900" alt="..." /></div>
            </div>
        </div>
    </div>
</section>
<% include pie.ejs %>
```
Fíjate que puse `<h2 class="display-4 lh-1 mb-4"><%= __('Enter a new age of web design') %></h2>` para ver si genera los ficheros de idioma y que funcione.
Ahora lo meto en `app.js` para que utilice este controlador para cuendo haga una petición a '`/features`' cargue `./routes/users`

```js
/**
 * Rutas del website
 */
app.use(i18n.init);
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/features', require('./routes/features'));
```

para probarlo, en la cabecera voy a poner un link `href="/features" y href="/download"` en la linea y cambio el multiidioma `<%= __('Features') %>`

```html
<ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
    <li class="nav-item"><a class="nav-link me-lg-3" href="/features"><%= __('Features') %></a></li>
    <li class="nav-item"><a class="nav-link me-lg-3" href="/download"><%= __('Download') %></a></li>
</ul>
```

**Incluyendo `en` `es` de forma dinamica en cabecera --  i18n.getLocales()**

```js
// https://github.com/mashpie/i18n-node
// Returns a list with all configured locales.
i18n.getLocales() // --> ['en', 'de', 'en-GB']
```

le añado en la `cabecera.ejs` 

```js
<a class="navbar-brand fw-bold" href="/"><%= title %></a>

// añado el bucle para que devuelva los lenguajes de que hay en i18nConfigure.js
// si algún día añades otro lo hará de forma dinámica

<% getLocales().forEach(locale => { %>
    <a href=""><%= locale %></a>&nbsp;
<% }) %>
```


Vemos que tiene una prpiedad que trabaja con cookies

```js
  // sets a custom cookie name to parse locale settings from - defaults to NULL
  cookie: 'yourcookiename',
```

que si le decimos el nombre de una cookie el busca en esa cookie que idioma tiene que utilizar. Voy a configurar ``

```js
i18n.configure({
//   locales: ['en', 'es'],
//   directory: path.join(__dirname, '..', 'locales'),
//   defaultLocale: 'en',
//   autoReload: true,
//   syncFiles: true,
  cookie: 'nodeapp-locale'
});
```

así mirará si hay una cookie para ver que idioma utilizará y si no hay utilizarñá la cabecera normal. Aunque el browser diga que lo quiere en español, el usuario a puesto una cookie que lo quiere en ingles y persitirá. Y crearemos un método nuevo `/change-locale/<%= locale %>`

```js
<% getLocales().forEach(locale => { %>
    <a href="/change-locale/<%= locale %>"><%= locale %></a>&nbsp;
<% }) %>
```

ahora si te vas a `http://localhost:3000/change-locale/en` verás error porque no hay el metodo creado. En tonces creo `routes/change-locale.js`

```js
const express = require('express');
const router = express.Router();

// GET /change-locale/[locale]
router.get('/:locale', (req, res, next) => {

  const locale = req.params.locale;

  // poner una cookie con el nuevo idioma
  res.cookie('nodeapp-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días OPCION AÑADIDA, si el user no entra en 30 días se pierde la cokkie
  })

  // responder con una redirección a la misma página de la que venía
  res.redirect(req.get('referer'));
});

module.exports = router;
```

Podemos saber de donde venía porque si haces una inspección al browser, en `Headers, Referer: https:// localhost/3000` te lo indica.

Vamos a `app` 

```js
/**
 * Rutas del website
 */
// app.use(i18n.init);
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('/features', require('./routes/features'));
app.use('/change-locale', require('./routes/change-locale'));
```



## Controladores - Test unitario llamando solo a una funcion

Por ejmplo quiero testear esta función del `features.js`

```js
router.get('/', (req, res, next) => {
  res.render('features');
});
```

Creo carpeta y fichero `controllers/FeaturesController.js`

```js
class FeaturesController {
  index(req, res, next) {     // metodo index
    res.render('features');
  }
}

module.exports = FeaturesController;
```

Lo llamas en la aplicacion `app.js`

```js
// const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
// const swaggerMiddleware = require('./lib/swaggerMiddleware');
// const i18n = require('./lib/i18nConfigure');
const FeaturesController = require('./controllers/FeaturesController');


/**
 * Rutas del website
 */
const featuresController = new FeaturesController(); // crea instancia de esa clase

// app.use(i18n.init);
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('/features', require('./routes/features'));
app.get('/features', featuresController.index);
// app.get('/change-locale/:locale', langController.changeLocale);
```

Me creo OTRO test, Creo carpeta y fichero `controllers/LangController.js`

```js
class LangController {
  changeLocale(req, res, next) {
    const locale = req.params.locale;

    // poner una cookie con el nuevo idioma
    res.cookie('nodeapp-locale', locale, {
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días
    })

    // responder con una redirección a la misma página de la que venía
    res.redirect(req.get('referer'));
  }
}

module.exports = LangController;
```

`app.js`

```js
// const i18n = require('./lib/i18nConfigure');
// const FeaturesController = require('./controllers/FeaturesController');
const LangController = require('./controllers/LangController');

...

/**
 * Rutas del website
 */
const featuresController = new FeaturesController();
const langController = new LangController();

// app.use(i18n.init);
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// // app.use('/features', require('./routes/features'));
app.get('/features', featuresController.index);
app.get('/change-locale/:locale', langController.changeLocale);
```

Ahora en el testing ahora podremos importar esta clase y probarla como queremos sin depender de express y sin tener que hacer una petición a express o ver dónde está en esa ruta express.



## Tipos de autenticación HTTP (Sesión, API Key, Tokens (JWT))

**Autenticación HTTP**

El protocolo HTTP es un protocolo sin estado: cada petición del navegador a un servidor es independiente de las anteriores. Sin embargo en las aplicaciones web a veces necesitamos mantener el estado para poder relacionar peticiones.

* Ejemplo: Petición 1: el usuario añade un producto al carrito de compra Petición 2: el usuario va a pagar en el proceso de checkout

**Sesión**

![](nodeapp/public/assets/img/3readme.png)

La autenticación por sesión se basa en el uso de cookies.
  
Las cookies son bloques de información enviados en las cabeceras HTTP en las respuestas de los servidores a los navegadores.
  
Los navegadores almacenan estos bloques de información y los envían automáticamente a los servidores en las siguientes peticiones.

![](nodeapp/public/assets/img/4readme.png)


**Anatomía de una cookie**

Las cookies están compuestas por los siguientes elementos:

* **domain** : dominio del servidor que ha puesto la cookie
* **path** : ruta opcional de la página que ha puesto la cookie. Si existe, sólo se enviará la cookie de vuelta a esa ruta.
* **expires** : fecha de expiración de la cookie
* **secure** : flag opcional para indicar que la cookie sólo se enviará por protocolo HTTPS
* **httpOnly** : flag opcional que indica que solo la puede leer el servidor value: separados por ; pueden tener nombre.

```sh
Set-Cookie: name=darth; role=admin;
    domain=deathstar.com; path=/home; secure;
    expires=Tue, 29 Jan 1985 01:02:03 GMT+2
```

**Hash de contraseñas**

* **PBKDF2**: https://keepcoding.io/blog/que-es-pbkdf2/
* **bcrypt**: https://codahale.com/how-to-safely-store-a-password/ scrypt: https://github.com/Tarsnap/scrypt
* **argon2**: https://medium.com/@mpreziuso/password-hashing- pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e

**Como elegir?** (spoiler: PBKDF2 está antiguo, cualquiera de los otros tres es bueno)

* https://stytch.com/blog/argon2-vs-bcrypt-vs-scrypt/ 
* https://hashing.dev/about/ https://npmtrends.com/argon2-vs-bcrypt-vs-scrypt-js


> [!IMPORTANT]
> seguimos con el código

Creo el modelo de usuarios en `models/Usuario.js`


```js
const mongoose = require('mongoose');

// creamos esquema
const usuarioSchema = mongoose.Schema({
  email: String,
  password: String
});

// creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exportamos el modelo
module.exports = Usuario;
```

Voy hacer en `init-db.js` que haya algunos usuarios  ya inicialmente. Recuerda que tenías una funcion `await initAgentes();` que nos borraba algunso agente que habían y creaban algunos nuevos que los metía desde el json `init-db-data.json`

```js
async function main() {
  ...
  // inicializar la colección de agentes
  await initAgentes();
}

...

async function initAgentes() {
  // borrar todos los documentos de la colección de agentes
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  // crear agentes iniciales
  const inserted = await Agente.insertMany(initData.agentes);
  console.log(`Creados ${inserted.length} agentes.`);
};
```

bueno pues ahora nos creamos la funcion de eliminar y crear usuarios

```js
// importo modelos desde "models index"
const { Agente, Usuario } = require('./models');

...

async function main() {
  ...
  await initAgentes();
  // inicializar la colección de usuarios
  await initUsuarios();
}

...

// definimos funcion
async function initUsuarios() {
  // eliminar usuarios
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const inserted = await Usuario.insertMany([
    { email: 'admin@example.com', password: '1234'},
    { email: 'usuario1@example.com', password: '1234'},
  ]);
  console.log(`Creados ${inserted.length} usuarios.`)
}

```

con el `models/index.js` puedo exportar todo lo que sea "publico"

```js
module.exports = {
  Agente: require('./Agente'),
  Usuario: require('./Usuario'),
}
```

voy a provar que funcione

```sh
➜  nodeapp git:(main) ✗ npm run init-db

> nodeapp@0.0.0 init-db
> node init-db.js

Conectado a MongoDB en cursonode
Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?si
Eliminados 3 agentes.
Creados 3 agentes.
Eliminados 0 usuarios.
Creados 2 usuarios.
```

**Ahora que tenemos usuarios nos hacemos una página de Login**

Me creo un nuevo controlador `controlador/LoginController.js`

```js
class LoginController {

  index(req, res, next) {
    res.render('login'); // render de una vista de una pag que se llama login
  }
}

module.exports = LoginController;
```

Vemos a la aplicación y cargamos 

```js
...
// const i18n = require('./lib/i18nConfigure');
// const FeaturesController = require('./controllers/FeaturesController');
// const LangController = require('./controllers/LangController');
const LoginController = require('./controllers/LoginController');

...


/**
 * Rutas del website
 */
// const featuresController = new FeaturesController();
// const langController = new LangController();
const loginController = new LoginController();

// app.use(i18n.init);
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// // app.use('/features', require('./routes/features'));
// app.get('/features', featuresController.index);
// app.get('/change-locale/:locale', langController.changeLocale);
app.get('/login', loginController.index)
```

Creamos una vista de esta página. Dentro de `views/features.ejs` si arrancas la app y miras lo que hay, te puede interesar, entonces vamos hacer una copia y le llamaremos `login.ejs` copiando el contenido y modificando cosas, es decir vamos a meter un formulario de LOGUIN para que se loguee el usuario guardando el diseño o aprevechando el diseño del template features

```html
<% include cabecera.ejs %>
  <!-- Basic features section-->
  <section class="bg-light">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <!-- Formulario de login -->

        </div>
    </div>
</section>
<% include pie.ejs %>
```

Si te fijas en `public/index_from_template.html` verás que cargará Boostrap. Y en la página de Boostrap https://getbootstrap.com/docs/5.3/forms/overview/ puedes encontrar modelos de formularios login para copiar y pegay el codigo directamente


```html
<% include cabecera.ejs %>
  <!-- Basic features section-->
  <section class="bg-light">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">


            <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>


        </div>
    </div>
</section>
<% include pie.ejs %>
```

Queremos que el usuario pinche en el boton submit tengamos un metodo POST para enviarlo a la BBDD y los imputs han de tener el `name` si no no irán al servidor. Así hará un post a la ruta `/login`

```html
<form method="POST">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" name="password" class="form-control" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>

</form>
```

Vamos al `loginControler`

```js
const Usuario = require('../models/Usuario');

class LoginController {

  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }
  // esto solo para probar que están llegando los valores al servidor
  async post(req, res, next) {
    console.log(req.body)
    res.send(1)  
  }

}

module.exports = LoginController;
```

y ahora este método post que he añadido a la clase LoginControler, tendré que definir su ruta en `app`

```js
/**
 * Rutas del website
 */
// const featuresController = new FeaturesController();
// const langController = new LangController();
// const loginController = new LoginController();

// app.use(i18n.init);
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// // app.use('/features', require('./routes/features'));
// app.get('/features', featuresController.index);
// app.get('/change-locale/:locale', langController.changeLocale);
app.get('/login', loginController.index);
app.post('/login', loginController.post);

```

Carga la página y comproeba que hay conexion. 

Aprovecha y vete a `es.json` y traduce `"Login": "Acceso",`

Vamos al `loginControler`

```js
const Usuario = require('../models/Usuario');

class LoginController {

  index(req, res, next) {
    res.locals.error = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || usuario.password !== password) {
        res.locals.error = req.__('Invalid credentials');
        res.render('login');
        return;
      }
      // si existe y la contraseña coincide --> zona privada
      res.redirect('/privado');
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
```
Esto `res.locals.error = req.__('Invalid credentials');` error de vista quiero pintarla en la vista. Me voy a `login.ejs` y le pongo en la forma:

```html
<p><%= error %></p>
```

en el controlador, esto `res.locals.error = '';` hace que cuando se renderice por primera vez esté

```html
<form method="POST">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" name="password" class="form-control" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <p><%= error %></p>
</form>
```

esto hará que renderice la página pero que te diga, invalit credentials si en inválido. Esto le obliga al usuario escribir de nuevo todo. 

Vamos hacer que **si las credenciales no son correctas el email por lo menos se le mantenga** al usuario en la casilla. Para el voy a meter una variable en el email  `value="<%= email %>"` en ` <input type="email" name="email" value="<%= email %>" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">` esto se utiliza para insertar dinámicamente un valor en el campo de entrada del email cuando la página se carga, lo que permite al desarrollador prellenar el formulario con datos existentes o predeterminados.

Aprovecha y vete a `es.json` y traduce `"Invalid credentials": "Credenciale invalidas"`

`res.locals.email = '';` esto hará que cuando se renderice esté vacio la primera vez.
Y cuando pongan invalid credential, voy a volver a mendarle a la vista ese email `res.locals.email = email;`

```js
const Usuario = require('../models/Usuario');

class LoginController {

  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || usuario.password !== password) {
        res.locals.error = req.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }
      // si existe y la contraseña coincide --> zona privada
      res.redirect('/privado');
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
```


**USUARIO UNICOS**  

vamos hacer que no ubiera usuarios multiples con el mismo email: `unique: true` solo con esto moonguse ya no le dejará

```js
const mongoose = require('mongoose');

// creamos esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true},
  password: String
});

// creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exportamos el modelo
module.exports = Usuario;
```

**CREAMOS ZONA PRIVADA**

Si hace login lo redirigimos a una zona privada. 

CReo controlador  `controlers/PrivadoController.js`

```js
class PrivadoController {
  index(req, res, next) {
    res.render('privado'); // renderiza vista "privado"
  }
}

module.exports = PrivadoController;
```

Lo llamo en la `app.js`

```js
...
// const LoginController = require('./controllers/LoginController');
const PrivadoController = require('./controllers/PrivadoController');

...
/**
 * Rutas del website
 */
// const featuresController = new FeaturesController();
// const langController = new LangController();
// const loginController = new LoginController();
const privadoController = new PrivadoController();

// app.use(i18n.init);
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// // app.use('/features', require('./routes/features'));
// app.get('/features', featuresController.index);
// app.get('/change-locale/:locale', langController.changeLocale);
// app.get('/login', loginController.index);
// app.post('/login', loginController.post);
app.get('/privado', privadoController.index);

```

Creo la vista (me copio features y lo trabajo) `views/privado`

```html
<% include cabecera.ejs %>
  <!-- Basic features section-->
  <section class="bg-light">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div class="col-12 col-lg-5">

                <h2 class="display-4 lh-1 mb-4"><%= __('Private zone') %></h2>

            </div>
        </div>
    </div>
</section>
<% include pie.ejs %>
```

**caja de sesion en la memoria del servidor**

Nos apoyaremos en https://github.com/expressjs/session  `npm repo expres-session`
Que se cree sesion y se guarden ahí àra cada usuario con identificador, etc Gestiona sesion y las cookies, etc dejando la sesion de cada usuario en una propiedad `req.session`

Se puede hacer sin esta librería pero es codigo ya escrito mil veces en mil sitios


`$ npm install express-session`

`app.js`

```js
...
const session = require('express-session');


...
/**
 * Rutas del website
 */
// const featuresController = new FeaturesController();
// const langController = new LangController();
// const loginController = new LoginController();
// const privadoController = new PrivadoController();

// app.use(i18n.init);
app.use(session({
  name: 'nodeapp-session', // nombre de la cookie
  secret: 'as98987asd98ashiujkasas768tasdgyy', // a mano o busca secure passport generator
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2d - expiración de la sesión por inactividad
  }
}));
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// // app.use('/features', require('./routes/features'));
// app.get('/features', featuresController.index);
// app.get('/change-locale/:locale', langController.changeLocale);
// app.get('/login', loginController.index);
// app.post('/login', loginController.post);
// app.get('/privado', privadoController.index);
```

Cuando el usuario haga login en `LoginController.js` antes de enviarle a la página privada 

```js
      // si existe y la contraseña coincide --> zona privada
      // apuntar en la sesión del usuario, que está autenticado
      req.session.usuarioLogado = usuario._id;
```

¿como sabemos que la página privada sea privada realmente? miramos en la página que ha hecho el usuario esa petición y vamos a mirar si está logueado `PrivadoControlle.js`

Esta página queda protegida gracias al trocito de codigo `// si el cliente que hace la petición, ...`

```js
class PrivadoController {
  index(req, res, next) {

    // si el cliente que hace la petición, no tiene en su sesión la variable usuarioLogado
    // le mandamos al login porque no le conocemos
    if (!req.session.usuarioLogado) {
      res.redirect('/login');
      return;
    }

    res.render('privado');
  }
}

module.exports = PrivadoController;
```

Si quiero proteger más páginas a parte de esta página, tendrías que poner en cada una de ellas repetir el mismo codigo, incluso si la página privada tuviera otras peticiones como un PUT o un POST, pues tendrías que repetir este codigo en cada uno de ellos, para comprobar que todos los accesos a este controlador están identificados por un usuario con sesion y está logueado. ¿tendría que repetir el codigo en multiples sitios? pies vamos a ponerlo para reutilizarlo:

Lo pongo en un modulo y me creo un midelware

`lib/sessionAuthMiddleware.js`

```js
// modulo que exporta un middleware que controla si estamos logados o no

module.exports = (req, res, next) => {
  // si el cliente que hace la petición, no tiene en su sesión la variable usuarioLogado
  // le redirigimos al login porque no le conocemos
  if (!req.session.usuarioLogado) {
    res.redirect('/login');
    return;
  }
  next();
}
```

`app.js`

```js
// ...
// const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
// const swaggerMiddleware = require('./lib/swaggerMiddleware');
const sessionAuthMiddleware = require('./lib/sessionAuthMiddleware');

...


/**
 * Rutas del website
 */
// const featuresController = new FeaturesController();
// const langController = new LangController();
// const loginController = new LoginController();
// const privadoController = new PrivadoController();

// app.use(i18n.init);
// app.use(session({
//   name: 'nodeapp-session', // nombre de la cookie
//   secret: 'as98987asd98ashiujkasas768tasdgyy',
//   saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
//   resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 2 // 2d - expiración de la sesión por inactividad
//   }
// }));
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));
// // app.use('/features', require('./routes/features'));
// app.get('/features', featuresController.index);
// app.get('/change-locale/:locale', langController.changeLocale);
// app.get('/login', loginController.index);
// app.post('/login', loginController.post);
app.get('/privado', sessionAuthMiddleware, privadoController.index);
```

cuando recibas una petición a `/privado`  activará este middelware `sessionAuthMiddleware` que comprueba si estoy logado y si no estás el mismo te mandará al login; pero si sí estás logado te dejará pasar a `privadoController.index`



**ENCRIPTAMOS LAS CONTRASEÑAS DEL USUARIOS**

https://codahale.com/how-to-safely-store-a-password/

`npm install bcrypt`

https://github.com/kelektiv/node.bcrypt.js/


En el modelo de usuario, aprovechando que en el modelo puedo crear metodos, me creo un metodo estático que haga un hash de una password.

`models/Usuario.js`

```js
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// // creamos esquema
// const usuarioSchema = mongoose.Schema({
//   email: { type: String, unique: true},
//   password: String
// });

// método estático que hace un hash de una password
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
}

// método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password)
}

// // creamos el modelo
// const Usuario = mongoose.model('Usuario', usuarioSchema);

// // exportamos el modelo
// module.exports = Usuario;
```


Vamos a `init-db` y cambiamos esto `{ email: 'admin@example.com', password: '1234'},`

```js
    { email: 'admin@example.com', password: await Usuario.hashPassword('1234')},
    { email: 'usuario1@example.com', password: await Usuario.hashPassword('1234')},
```

probemos `npm run init-db`

Ahora no funcionaría el login en el controlador del Login 


Creo un metodo en `models/Usuario.js` y lo uso en `loginController`

```js
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// // creamos esquema
// const usuarioSchema = mongoose.Schema({
//   email: { type: String, unique: true},
//   password: String
// });

// // método estático que hace un hash de una password
// usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
//   return bcrypt.hash(passwordEnClaro, 7);
// }

// método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password)
}

// // creamos el modelo
// const Usuario = mongoose.model('Usuario', usuarioSchema);

// // exportamos el modelo
// module.exports = Usuario;
```

En en `loginController` en vez de comparar con 
` if (!usuario || usuario.password !== password) {` comparará con   
` if (!usuario || !(await usuario.comparePassword(password)) ) {`  
Que no coincida, 

```js
  // si no lo encuentro o la contraseña no coincide --> error
  if (!usuario || !(await usuario.comparePassword(password)) ) {
    res.locals.error = req.__('Invalid credentials');
    res.locals.email = email;
    res.render('login');
    return;
  }
```

cambio la cabecera y cambio el button por el `<a href="/login"`

```html
<a href="/login" class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
    <span class="d-flex align-items-center">
        <span class="small"><%= __('Login') %></span>
    </span>
</a>
```


**EN ZONA PRIVADA: quiero ver el email del user**

```html
<% include cabecera.ejs %>
  <!-- Basic features section-->
  <section class="bg-light">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div class="col-12 col-lg-5">

                <h2 class="display-4 lh-1 mb-4"><%= __('Private zone') %></h2>
                <p>User: <%= email %></p>

            </div>
        </div>
    </div>
</section>
<% include pie.ejs %>
```

Ahora en `PrivadoControle.js` le pasamos el emial del usuario 

```js
const Usuario = require('../models/Usuario');
const createError = require('http-errors');

// class PrivadoController {
//   async index(req, res, next) {

    try {
      // obtener el id del usuario de la sesión
      const usuarioId = req.session.usuarioLogado; // está en memoria

      // buscar el usuario en la BD
      const usuario = await Usuario.findById(usuarioId);

      if (!usuario) { // esto no debería ocurrir por lo tanto erro de servidor
        next(createError(500, 'usuario no encontrado'))
        return;
      }

      res.render('privado', { email: usuario.email });

    } catch (err) {
      next(err);
    }
  }
// }

// module.exports = PrivadoController;
```

