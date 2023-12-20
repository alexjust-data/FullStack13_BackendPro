
---
> [!NOTE]
> Paso a paso de todo el temario `Frontend PRO`. 
> Todo el proceso se desarrolla en [nodeapp](https://github.com/alexjust-data/FullStack_FrontendPro/tree/main/nodeapp) de este repositorio.
> 
> Instructor :  Javier  
> ciudad : Madrid  
> web : https://javiermiguel.com   
> contacto : jamg44@gmail.com   
> twitter : @JavierMiguelG  
> Guía https://github.com/KeepCodingWeb15/backend-nodejs-mongodb/commits/main/  
>
> Este es una continuación más avanzada de [Fundamentos-Backend-Node.js-y-MongoDB](https://github.com/alexjust-data/FullStack_Node_mongoDB)
>
---

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

---
> [!IMPORTANT]
> seguimos con el código
---

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
---
> [!IMPORTANT]
> seguimos con el código
---

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

---
> [!IMPORTANT]
> seguimos con el código
---


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

**Hash de contraseñas**

Contacta con un profesional y que te haga el pestTesting

* PBKDF2: https://keepcoding.io/blog/que-es-pbkdf2/
* bcrypt: https://codahale.com/how-to-safely-store-a-password/ 
* scrypt: https://github.com/Tarsnap/scrypt
* argon2: https://medium.com/@mpreziuso/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e

Como elegir? (spoiler: PBKDF2 está antiguo, cualquiera de los otros tres es bueno)

* https://stytch.com/blog/argon2-vs-bcrypt-vs-scrypt/ 
* https://hashing.dev/about/ 
* https://npmtrends.com/argon2-vs-bcrypt-vs-scrypt-js


---
> [!IMPORTANT]
> commit "ponemos el email del usuario en la página privada"
---

**Continuamos dentro de zona privada**

Voy hacer que el botón login desapareca cuando el usuario esté logueado.

`views/cabecera.ejs`

```html
        <a href="/login" class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
            <span class="d-flex align-items-center">
                <span class="small"><%= __('Login') %></span>
            </span>
        </a>
```

para eso me gustaria acceder a la sesión para saber si la sesión tiene ese atributo que le pusimos en 

`loginControler.js`

```js
// cuando un usuario hace login lo guardamos en el atributo
req.session.usuarioLogado = usuario._id;
```

pues desde la vista quiero ver si el usuario está logado. Podría decirle que desde el controlador renderice esa página privada `PrivadoControler,js` podría decírselo aquí y sería tan sencillo como modificar esto:

```js
res.render('privado', { email: usuario.email, usuarioLogado: usuarioId });
```

y hacer esto en cada una de las vistas. Pero vamos hacer algo más práctico, y es permitir que todas las vistas puedan acceder directamente a la sesion para leer datos de la sesion porque si escalas la app, sin meter nada en el controlador leer algo de esa sesion.

Para que la vista pueda leer la sesion, en `app.js`

```js
// hacemos que el objeto session esté disponible al renderizar las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  // todo middelware hace dos cosas o responder o next para que siga evaluando
  next();
});
```

Nos vamos a al cabecera y cambio esta linea `<li class="nav-item"><a class="nav-link me-lg-3" href="/download"><%= __('Download') %></a></li>` por esta otra

```html
<li class="nav-item"><a class="nav-link me-lg-3" href="/privado"><%= __('Private area') %></a></li>
```

Ahora tendremos en la cabecera un "Private area" que nos lleva al area privada `href="/privado`. Ahora le meto la condición de si está logado.

```html
<ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
    <li class="nav-item"><a class="nav-link me-lg-3" href="/features"><%= __('Features') %></a></li>
    <% if (session.usuarioLogado) { %>
        <li class="nav-item"><a class="nav-link me-lg-3" href="/privado"><%= __('Private area') %></a></li>
    <% } %>
</ul>
```

Y además lo pondré en el botón del login que aparezca el botón del `login` y aprobecho para else le meto un botoun de `logout`.

```html
  <% if (!session.usuarioLogado) { %>
      <a href="/login" class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
          <span class="d-flex align-items-center">
              <span class="small"><%= __('Login') %></span>
          </span>
      </a>
  <% } else  { %>
      <a href="/logout" class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
          <span class="d-flex align-items-center">
              <span class="small"><%= __('Logout') %></span>
          </span>
      </a>
  <% } %>
```

Vamos hacer la funcionalidad del `logout` en `LoginController` y le metemos el metodo logout.  
**caja de sesion en la memoria del servidor** Nos apoyaremos en https://github.com/expressjs/session  `npm repo expres-session`


```js
LoginController {
  
  ...

  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    })
  }
}
```

Añadimos en `app.js`

```js
app.get('/logout', loginController.logout);
```

En cuanto abrimos NoSqlBoosters para ver lo que pcurre en MongoDB podemos ver que tenemos una carpeta de sesion nueva con una sesion abierta y guardada ahí

![](nodeapp/public/assets/img/5readme.png)

---
> [!WARNING]
> De cara al proyecto final, todos pinchan en esto y puede que no te contraten por este error:
> 
>Todos sabemos que cuendo un usuario enre al correo electronico, lo que vemos ahí son nuestros emails, no los de otra persona, entonces el servidor de gmail cuando recibe una petición al backend y busca en la base de datos hace un filtro por los emials d e este usario. Ta,bién cuando el frontedn pones eliminar este email, hace una peticion al backend y le dice que elimine el email y el backend lo priermo que hace es verificar si ese email es mío; para que yo no pueda eliminar el email de tra persona.
>.
---


**Más formas de autentificacion***  
**VAMOS A PERMITIR CREAR AGENTES**  

Para que no esté dando la lata cada vez que reiniciemos perdamos la seseión vamos a guardar la sesión en base de datos y acontinuacion veremos como aparece una lista de agentes. Hasta ahora como guardabamos en la memoria la autentificación, cada vez que cierras la app se borra la mememoria y todos los usuario pierden su sesión.

Se puede guardar las sesiones en el disco, en una BBDD (ahora tenemos mongDb), en una BBDD en memoria (redis). Ahora con mongodb nos está bien, si algún día tu aplicación va a tener una concurrencia de decenas de miles de usuarios entonces puede que redis te irá más rápido.

**Metemos en MogoDb las s**

https://github.com/expressjs/session  propiedad `stores`, en esta propiedad se guardarán la información de las sesiones. Ahora este modulo lo guarda en un store `MomeryStore` lo que ahora estamos haciendo, pero vamos a guardarlo en un store diferente. 

Me apoyo en una librerio que se llama `connectMOngo` https://github.com/jdesboeufs/connect-mongo : 


le tengo que decir en qué base de datos quiero que la guarde, la cadena de conexion a la bbdd.

```sh
npm install connect-mongo
```

Cambio en  `app.js`


`store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/cursonode'})`


```js
const MongoStore = require('connect-mongo');

...



app.use(session({
  name: 'nodeapp-session', // nombre de la cookie
  secret: 'as98987asd98ashiujkasas768tasdgyy',
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2d - expiración de la sesión por inactividad
  },
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/cursonode'})
}));
```

Ahora entras en la aplicacion coomo usuario, luego apagas la app desde la terminar y la reinicas, podrás ver que ya no te echa como usuario, ya tiene tus credenciales guardadas en la base de datos.


Esta `'mongodb://127.0.0.1/cursonode'` es la cadena de conexion a la base de datos, nosotros también la tenemos en `connectMongoose.js` y ahora estará en dos sitios y será desagradable tener que buscar la en en lfuturo, entonces vamos a cambiar eso tambien. No quiero que en el futuro quien tanga que cambiar esto necesite entender el codigo, entonces voy a ponerselo facil y lo haremos en un fichero init donde venga esta configuracion. Existen librería que se llama `dotenv`

Voy hacer que mi aplicación vea la configuración de variables de entorno del sistema operativo, además con esta libreria haré que carge estas variables de entorno por si no estuvieran ahí.

`npm install dotenv`

https://github.com/motdotla/dotenv

`app.js` :  `store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})`

`lib/connectMongoose.js` : `mongoose.connect(process.env.MONGODB_URI)`

Sólo con esto si arrancas la aplicacion da error, si quieres que funcione has de pasarle las variables de entorno. Me creo fichero `.env` para que las cargue desde ahí. 
Después, en el inicio más temprano de la aplicación, como dice la doc, le añado la linea requerida :

`bin/www/`: `require('dotenv').config();`  
`bin/cluster`: `require('dotenv').config();` 

y para cuando ejecutamos la semilla init-db  
`init-db`: `require('dotenv').config();`  

lo hemos cargado en cada punto de entrada a la aplicacion.

Ahora ya carga.

---
> ![WARNING]
> el fichero `.env` no se mete en el repositirio git. Si ahora haces un commit la has cagado. El fichero .env es tuyo, del desarrollador, de nadie más, de tus cuentas de desarrollador, ni de tus compañeros de trabajo ni de nadie más.
---

Para que un compañero sepa que ha de poner, vamos a facilitar la vida a mis compñaeros, vamos hacer una copia del fichero y lo llamaremos `.env.example` y este si que va al repo aninimizado. ¿cómo sabe que ha de utilizar esto? cómo podemos hacer para que lo sepa- LO APUNTAMOS EN EL `README.md`


Copy .env.example to to your custom .env.
```sh
cp .env.example .env
```
And setup your configuration.



## Listado de agentes 

Ahora lo que quiero es que cuando pinte los agente, pinte sólo los agente de admin o de usuario1, del que esté logado.

modelo de agente `models/Agente.js` Quiero que cada agente tenga un propietario. Pero voy a aprvechar para haceruna relación de MOngoDb `owner: { ref: 'Usuario', type: mongoose.Schema.Types.ObjectId },`

```js
// definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: { type: Number, index: true, min: 18, max: 120 },
  owner: { ref: 'Usuario', type: mongoose.Schema.Types.ObjectId },
}, {
  // collection: 'agentes' // para forzar un nombre concreto de colección
});
```

ahora cada agente tiene un atributo diciendo quien es el propietario de este agente.  
Voy a `init-db` donde creo los agentes les pongo una propiedad `await initAgentes();`

```js
async function main() {
  // espero a que se conecte a la base de datos
  await new Promise(resolve => connection.once('open', resolve))
  const borrar = await pregunta(
    'Estas seguro de que quieres borrar la base de datos y cargar datos iniciales?'
  )
  if (!borrar) {
    process.exit();
  }
  await initUsuarios(); //1 se inicializan los usuarios
  await initAgentes(); // los agnetes
  connection.close();
}
```
y en la inicializacion de los agentes, hasta ahora traíamos los agentes del archivo `init-db-data.json` pero ahora cojo los agente y los inicializo directamente en `init-db`

```js
  // crear agentes iniciales
  const inserted = await Agente.insertMany([
    { "name": "Smith", "age": 33, owner: adminUser._id }, // Smith es propiedad de adminUser._id
    { "name": "Jones", "age": 23, owner: adminUser._id },
    { "name": "Brown", "age": 46, owner: usuario1User._id }
  ]);
```

A cada agente que inserto lo pongo un owner y quiero poner un email en cada uno. Voy hacer una funcion para que lo llame:

```js
  const [ adminUser, usuario1User ] = await Promise.all([
    Usuario.findOne({ email: 'admin@example.com'}),
    Usuario.findOne({ email: 'usuario1@example.com' })
  ])
```

Puedes comprobar que se han creado `npm run init-db` verás en NoSQLBooster como se han creado. Esto inicializará la base de datos eliminando y creando


Quiero que en la zona privada aparezcan los agentes del usuario logueado. Voy a `PrivadoControññer.js`

```js
const { Agente, Usuario } = require('../models');

// class PrivadoController {
//   async index(req, res, next) {

//     try {
//       // obtener el id del usuario de la sesión
//       const usuarioId = req.session.usuarioLogado;

//       // buscar el usuario en la BD
//       const usuario = await Usuario.findById(usuarioId);

//       if (!usuario) {
//         next(createError(500, 'usuario no encontrado'))
//         return;
//       }

      // cuando el usuario existe
      // cargar lista de agentes que pertenecen al usuario
      const agentes = await Agente.find({ owner: usuarioId }); 
      // buscaremos aquellos documentos cuya propiedad owner sea el mismo usuario id 

      res.render('privado', {
        email: usuario.email,
        agentes // le doy una lista de agentes que enviaré a la vista
      });

//     } catch (err) {
//       next(err);
//     }
//   }
// }

// module.exports = PrivadoController;
```

Me voy a la vista `Privado` y me creo una vista chula para ver los agentes.


**Creamos un nuevo agente**

Añado linea en `Privado.ejs` : `<th scope="col"><a href="/agentes-new">New agent</a></th>`  
Me creo un `controllers/AgenteController.js` y le meto la petición de crear y borrar un agente.

En la `app`

```js
const AgentesController = require('./controllers/AgentesController');

/**
 * Rutas del website
 */
const agentesController = new AgentesController();

// defino ruta
app.get('/agentes-new', sessionAuthMiddleware, agentesController.new);
```

En `AgentesController` 

```js
const Agente = require('../models/Agente');

class AgentesController {
  new(req, res, next) {
    res.render('agentes-new');
  }

  async postNewAgent(req, res, next) {
    try {
      const usuarioId = req.session.usuarioLogado;
      const { name, age } = req.body;
      
      // le paso un objeto
      const agente = new Agente({ 
        name,
        age,
        owner: usuarioId // el que crea el agente
      });
      await agente.save(); // lo guardamos

      res.redirect('/privado'); // lo mandamos a la lista de agentes

    } catch (error) {
      next(error);
    }
  }
}

module.exports = AgentesController;
```

Creamos la vista del agente new. `view/agentes-new.ejs` y me creo una vista bonita para crear un nuevo agente, me creo un formulario de boostrap.

`app.js` añadimos

```js
app.post('/agentes-new', sessionAuthMiddleware, agentesController.postNewAgent);
```

**Eliminar agentes del usuarios**


En `view/Private.ejs` todo lo voy cogiendo de Boostrad plantillas e iconos `<i class="bi bi-trash"></i>` esto es una papelera. Esto `confirmDeleteAgent` es un afuncion para que confirme antes de borrar.

```html
<td><a
    onclick="confirmDeleteAgent('<%= agente.name %>', '<%= agente._id %>')"
    href="javascript:void(0);">
        <i class="bi bi-trash"></i>
</a></td>
```

le paso una función dentro del la vista para que pregunte si seguro quiere elimnar 

```html
<script>
    function confirmDeleteAgent(name, agenteId) {
        if (confirm(`Estas seguro que quieres eliminar el agente ${name}?`)) {
            window.location.href = `/agentes-delete/${agenteId}`;
        }
    }
</script>
```

Voy `AgentesController.js` y le añado la función para eliminar el agente

```js
async deleteAgent(req, res, next) {
    try {
      const usuarioId = req.session.usuarioLogado;
      const agenteId = req.params.agenteId;

      // validar que el agente que queremos borrar es propiedad del usuario!!!!
      const agente = await Agente.findOne({ _id: agenteId });

      // verificar que existe
      if (!agente) {
        console.warn(`WARNING - el usuario ${usuarioId} intentó eliminar un agente inexistente (${agenteId})`);
        next(createError(404, 'Not found'));
        return;
      }

      // agente.owner viene de la base de datos y es un ObjectId
      if (agente.owner.toString() !== usuarioId) {
        console.warn(`WARNING - el usuario ${usuarioId} intentó eliminar un agente (${agenteId}) propiedad de otro usuario (${agente.owner})`);
        next(createError(401, 'No autorizado'));
        return;
      }

      await Agente.deleteOne({ _id: agenteId });

      res.redirect('/privado');

    } catch (error) {
      next(error);
    }
```

`app.js` acuerdate siempre que la zona privada está protegida con `sessionAuthMiddleware` recuerda esto para el proyecto final porque esto lomiramos bien. Las rutas se tiene que proteger.

```js
// Zona privada del usuario
// app.get('/privado', sessionAuthMiddleware, privadoController.index);
// app.get('/agentes-new', sessionAuthMiddleware, agentesController.new);
// app.post('/agentes-new', sessionAuthMiddleware, agentesController.postNewAgent);
app.get('/agentes-delete/:agenteId', sessionAuthMiddleware, agentesController.deleteAgent)
```

### Autentificacion por API key 


* La autenticación con API Key se basa en enviar en todas las peticiones un API Key (como cabecera o parámetro GET)
* Éste API Key suele ser suministrada por el servicio tras el registro de usuario.
* El API Key es único e identifica al usuario de manera unívoca.
* El API Key siempre es la misma, no cambia ni hay que renovarla.

![](nodeapp/public/assets/img/6readme.png)


### Tokens (y JWT)

![](nodeapp/public/assets/img/7readme.png)


* JWT es un estándar abierto (RFC 7519)
* Define una forma segura y compacta de transmitir información entre diferentes partes con un objeto JSON
* La información puede ser verificada porque va firmada digitalmente
* Se pueden firmar los tokens con HMAC (algoritmo secreto) o con un par de claves RSA (pública/privada)
* el mejor sitio para guardar un token en el Browser es en una cookie como las que hemos visto

![](nodeapp/public/assets/img/8readme.png)

Un JWT está formado por tres partes:

* Cabecera: JSON en formato base64 que indica el tipo de token y el algoritmo usado para firmarlo
* Payload: JSON de datos en formato base64. Contiene los claims (claves del diccionario de datos).
* Firma: firma del token resultante de aplicar la siguiente fórmula: 
> HMACRSA256( base64(header) + base64(payload) + <secret> )

**¿Por qué usar JWT?**

* Evitamos guardar la sesión del usuario en la base de datos.
* Es el usuario quien nos envía su información en todo momento.
* Es seguro, porque podemos validar que el token no ha sido alterado desde que nosotros lo enviamos.


Autenticación por JWT

![](nodeapp/public/assets/img/9readme.png)

---
> [!IMPORTANT]
> Segimos con el codigo: implantamos token JWT
---

vamos a `controlers/LoginControllers.js` y genero ` postJWT(req, res, next)`

(merece la pena pagar con esta auth const `jsonwebtoken`)

`npm install jsonwebtoken`


```js
const jwt = require('jsonwebtoken');
// const Usuario = require('../models/Usuario');

// class LoginController {

//   index(req, res, next) {}

//   async post(req, res, next) {}

//   logout(req, res, next) {}

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || !(await usuario.comparePassword(password)) ) {
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // si existe y la contraseña coincide --> devuelvo un JWT
      const tokenJWT = await jwt.sign({ _id: usuario._id }, 's876ads87dasuytasduytasd', {
        expiresIn: '2h'
      });
      res.json({ jwt: tokenJWT });

    } catch (err) {
      next(err);
    }
  }
}
module.exports = LoginController;
```

en `app.js`

```js
// esto lo utilizaré para los dos, api y website
const loginController = new LoginController();

/**
 * Rutas del API
 */
// app.use('/api-doc', swaggerMiddleware);
app.post('/api/login', loginController.postJWT);
// app.use('/api/agentes', require('./routes/api/agentes'));
```

Abro `POSTMAN` y hago un post

![](nodeapp/public/assets/img/14readme.png)

y vemos la respuesta del servidor, nos ha devuelvo un JToken. Si lo coias y lo pegas en http://jwt.io verás el contenido.


Ahora mismo si pones en Browser `http://localhost:3000/api/agentes` saldrá por pantalla la lista de agentes sin haber pedido ninguna autentificación

```sh
{"results":[{"_id":"657c862970776a3eba495f55","name":"Smith","age":33,"owner":"657c862970776a3eba495f4f","__v":0},{"_id":"657c862970776a3eba495f57","name":"Brown","age":46,"owner":"657c862970776a3eba495f50","__v":0},{"_id":"657c9cbd5c692b557a6a26ca","name":"AlexJust","age":18,"owner":"657c862970776a3eba495f4f","__v":0}]}
```
Entonces lo que queremos es que cuando este middelware reciba una petición, que haga la validación de que tiene el JWToken correcto.

```js
/**
 * Rutas del API
 */
// app.use('/api-doc', swaggerMiddleware);
// app.post('/api/login', loginController.postJWT);
app.use('/api/agentes', require('./routes/api/agentes'));
```
Para esto nos creamos un middelware para esto `lib/jwtAuthMiddleware.js` y creo un modulo que esporta un middleware. 

```js
var createError = require('http-errors');
const jwt = require('jsonwebtoken');

// modulo que exporta un middleware
module.exports = async (req, res, next) => {
  try {

    // recoger el jwtToken de la cabecera, o del body, o de la query string
    const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt;

    // comprobar que mandado un jwtToken
    if (!jwtToken) {
      next(createError(401, 'no token provided'));
      return;
    }

    // comprobaremos que el token en válido
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        next(createError(401, 'invalid token'));
        return;
      }
      // apuntamos el usuario logado en la request
      req.usuarioLogadoAPI = payload._id;
      // dejamos pasar al siguiente middleware
      next();
    })


  } catch (error) {
    next(error);
  }
}
```

Acuérdate que el `LoginController.js` teníamos 

```js
      // si existe y la contraseña coincide --> devuelvo un JWT
      const tokenJWT = await jwt.sign({ _id: usuario._id }, 's876ads87dasuytasduytasd', {
```

vamos a ponerlo en `.env`

```sh
JWT_SECRET='s876ads87dasuytasduytasd'
```
y en `.env.example` JWT_SECRET=secret  
es por esto que hemos puesto esta lina así `jwt.verify(jwtToken, process.env.JWT_SECRET,` en `module.exports`

voy a `app.js`

```js
// const swaggerMiddleware = require('./lib/swaggerMiddleware');
// const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
// const sessionAuthMiddleware = require('./lib/sessionAuthMiddleware');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');

...

/**
 * Rutas del API
 */
// app.use('/api-doc', swaggerMiddleware);
// app.post('/api/login', loginController.postJWT);
app.use('/api/agentes', jwtAuthMiddleware, require('./routes/api/agentes'));
```

en `routes/api/agentes.js`

```js
router.get('/', async (req, res, next) => {
  try {

    // escribimos en el log el id del usuario logado en el API con JWT
    console.log('Usuario API :', req.usuarioLogadoAPI): 
```

te imprimirá el Id del usuario que podriamos utilizar para si quisiéramos hacer alguna petición a la base de datos y sacar solamente sus agentes en vez de sacar todos pues podríamos sacar los suyos.

Si te fijas cada agente tiene un owner, (lo puedes ver en la base de datos NoSqlBosster) pues podrías filtar con owner con filtros : 

```js
router.get('/', async (req, res, next) => {
  try {

    // escribimos en el log el id del usuario logado en el API con JWT
    const usuarioIdLogado = req.usuarioLogadoAPI;

    // // filtros
    // // http://127.0.0.1:3000/api/agentes?name=Jones
    // const filterByName = req.query.name;
    // const filtreByAge = req.query.age;
    // // paginación
    // // http://127.0.0.1:3000/api/agentes?skip=2&limit=2
    // const skip = req.query.skip;
    // const limit = req.query.limit;
    // // ordenación
    // // http://127.0.0.1:3000/api/agentes?sort=-age%20name
    // const sort = req.query.sort;
    // // field selection
    // // http://localhost:3000/api/agentes?fields=name%20-_id%20address
    // const fields = req.query.fields;

    // const filtro = {};

    // if (filterByName) {
    //   filtro.name = filterByName;
    // }

    // if (filtreByAge) {
    //   filtro.age = filtreByAge;
    // }

    filtro.owner = usuarioIdLogado;
```

Con esto cuando hagas una petición te devolverá sólo los agentes que son de tu propiedad. Tanto si quiere eliminar algo como soliciatr, siempre con el filtro del usuario propietario del espacio.


## Tareas en segundo plano

Cuando tenemos una app en el movil, le damos alguna cosa y tarda, esto es pésimo para el producto. La percepción del usuario a ver que es lento, el usuario no quiere ese servicio. Si realmente sabemos que va a tardar la respuesta, hemos de resolver las espectativas del usuario. Por ejemplo si pide la codificacion de un video que tarda 1h, pues has de decirle con una progreso como avanza, en front. 

**Tareas lentas o pesadas**

* Las respuestas a las peticiones HTTP deben ser casi inmediatas 
* Un backend lento, es un backend mal hecho
* Pero a veces hay que hacer cosas que son lentas como enviar correo, redimensionar una imagen, leer archivos gigantes...
* Todas esas tareas lentas, deberemos hacerlas de manera diferida


**VAMOS A ENVAR CORREOS DESDE LA APLICACION**

Es sencillo

https://github.com/nodemailer/nodemailer

https://nodemailer.com/

```sh
npm install nodemailer
```

Hay palataformas para desarrolladores como 
* https://sendgrid.com/en-us/free y es gratis;   
* https://www.brevo.com/
* https://www.mailgun.com/

El spam es un problema, como la suplantación, gracias a esto ya no es tan sencillo enviar un email, cierto volumne de correo los servidores se protejen mucho por culpa del spam. Los servidores tiene como mision tratar de reducir el spam todo lo que sea posible, si nuestra app va a enviar volumne de correos directamente iremos a la carpate de espam.

Hay dos tipos de emial, los 
* `transaccionales`(avisas al usario en base a algo que el usuario a hecho p.e envío email con el link) el usuario tiene un contexto del porque se envía este emial
* `marketing` (p.e novedades del producto, etc).

https://nodemailer.com/ permite conetcarse a las pataformas de estos servidores de emial casi sin cmabiar nada. En el enlace tienes los ejmplos de como aplicarlo. Además tiene un servicio que ayuda a los desarrolladores https://ethereal.email/ para que no se envíe realmente y que solo sea para ver si funciona bien.

Vamos hacer que en nuestro frontend cuando el usuario haga login vamos a enviarle un email antes de mandarle a otro sitio

`loginController.js`

```js
  async post(req, res, next) {
    try {
      // const { email, password } = req.body;

      // // buscar el usuario en la base de datos
      // const usuario = await Usuario.findOne({ email: email });

      // // si no lo encuentro o la contraseña no coincide --> error
      // if (!usuario || !(await usuario.comparePassword(password)) ) {
      //   res.locals.error = req.__('Invalid credentials');
      //   res.locals.email = email;
      //   res.render('login');
      //   return;
      // }

      // // si existe y la contraseña coincide --> zona privada
      // // apuntar en la sesión del usuario, que está autenticado
      // req.session.usuarioLogado = usuario._id;

      // enviar email al usuario
      const emailResult = await usuario.sendEmail('Bienvenido', 'Bienvenido a NodeApp');
      console.log('Email enviado', emailResult); // luego ya lo quitamos

  //     res.redirect('/privado');

  //   } catch (err) {
  //     next(err);
  //   }

  // }
```

vamos h hacernos el método `sendEmail` en el `models/usuario` para enviar emails ¿sería un metodo estático o de instancia? utilizaremos una instancia porque necesitamos el emial del usuario entonces usaremos `methods`

```js
const nodemailer = require('nodemailer');

...


// método para enviar emails al usuario
usuarioSchema.methods.sendEmail = async function(asunto, cuerpo) {

  // crear un transport [lo he creado en lib/emailTransportConfigure.js]
  const transport = await emailTransportConfigure();

  // enviar email
  ...
}
``` 

`lib/emailTransportConfigure.js`

```js
const nodemailer = require('nodemailer');

module.exports = async function() {

  // entorno desarrollo
  const testAccount = await nodemailer.createTestAccount();

  const developmetTransport = {
    host: testAccount.smtp.host, //'smtp.ethereal.email',
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    }
  }

  const transport = nodemailer.createTransport(developmetTransport);

  return transport;
}
```

continúo... `models/usuario`

```js
// método para enviar emails al usuario
usuarioSchema.methods.sendEmail = async function(asunto, cuerpo) {
  // crear un transport
  const transport = await emailTransportConfigure();

  // enviar email
  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM, // esto en .env EMAIL_SERVICE_FROM=admin@example.com
    to: this.email,
    subject: asunto,
    // text: --> para emails con texto plano
    html: cuerpo
  });
  console.log(`URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`);
  return result;
}
```

Ahora por consola si recargas el usaurio en el browser verás como 

```sh
POST /login - - ms - -
URL de previsualización: https://ethereal.email/message/ZYHhhESjrQqJ-uwEZYHhwX9x6n-bKr2VAAAAAYiccvnrtvhgkd4MUGtaHio
Email enviado {
  accepted: [ 'admin@example.com' ],
  rejected: [],
  ehlo: [ 'PIPELINING', '8BITMIME', 'SMTPUTF8', 'AUTH LOGIN PLAIN' ],
  envelopeTime: 185,
  messageTime: 176,
  messageSize: 291,
  response: '250 Accepted [STATUS=new MSGID=ZYHhhESjrQqJ-uwEZYHhwX9x6n-bKr2VAAAAAYiccvnrtvhgkd4MUGtaHio]',
  envelope: { from: 'admin@example.com', to: [ 'admin@example.com' ] },
  messageId: '<e0033287-2fd0-0563-f1d9-b037dc148261@example.com>'
}
```

si te vas a `https://ethereal.email/message/ZYHhhESjrQqJ-uwEZYHhwX9x6n-bKr2VAAAAAYiccvnrtvhgkd4MUGtaHio` verás la estructura de tu email que se ha enviado de verdad con ese contenido


![](nodeapp/public/assets/img/15readme.png)


Ahora vamos hacer para que quede preparado para producción.


`lib/emailTransportConfigure.js`

```js
// const nodemailer = require('nodemailer');

// module.exports = async function() {

//   // entorno desarrollo
//   const testAccount = await nodemailer.createTestAccount();

//   const developmetTransport = {
//     host: testAccount.smtp.host, //'smtp.ethereal.email',
//     port: testAccount.smtp.port,
//     secure: testAccount.smtp.secure,
//     auth: {
//         user: testAccount.user,
//         pass: testAccount.pass
//     }
//   }

  const productionTransport = {
    // que sea configurable
    service: process.env.EMAIL_SERVICE_NAME, 
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    }
  }

  console.log('process.env.NODE_ENV', process.env.NODE_ENV); // haz login y lo verás

  // uso la configuración del entorno en el que me encuentro
  const activeTransport = process.env.NODE_ENV === 'development' ?
    developmetTransport :
    productionTransport;

  const transport = nodemailer.createTransport(activeTransport);

  // return transport;
}
```

`package.json`

```sh
  "scripts": {
    "start": "cross-env node NODE_ENV=production ./bin/www",
    "dev": "cross-env NODE_ENV=development DEBUG=nodeapp:* nodemon ./bin/www",
```
esto nos dice si estamos en modo desarrollador o en produccion, entonces aquí podríamos utilizar esto 

```js
  // uso la configuración del entorno en el que me encuentro
  const activeTransport = process.env.NODE_ENV === 'development' ?
    developmetTransport :
    productionTransport;
``` 

ahora cuando nos logueamos podemos ver en terminal 

```sh
npm run dev

...


POST /login - - ms - -
process.env.NODE_ENV development
URL de previsualización: https://ethereal.email/message/ZYHmVkSjrQqJ.EtHZYHmk34VFVvG.PRsAAAAAfD0.da9H60FawqCIKrsrRI
```

se hubiera enviado el emial al usuario logueado. NO tiene más historia.
Lo que si hemos notado es que cuando hacemos lgoin tarda mucho a cargar la página y esperaríamos que tardase nada, instanteneo. Eso es muy malo ¿qué podemos hacer?

Para este caso concreto podemos hacer una cosa sencilla  `loginController.js` le quito el awaut que significa que antes que pueda entrar le envío el emial, entonces para esta caso me puedo permitir quitar esa espera de envío de emial antes de que pueda redirigirlo a la area privada.

```js
const emailResult = usuario.sendEmail('Bienvenido', 'Bienvenido a NodeApp');
```

en otro caso, si que tendría que utilizar ua tecnica quemepermita enviar ese emial y que el usuario no tenga que esperar a que se envíe.

**Recuerda que : Tareas lentas o pesadas**

* Las respuestas a las peticiones HTTP deben ser casi inmediatas 
* Un backend lento, es un backend mal hecho
* Pero a veces hay que hacer cosas que son lentas como enviar correo, redimensionar una imagen, leer archivos gigantes...
* Todas esas tareas lentas, deberemos hacerlas de manera diferida

**Flujo básico de una petición HTTP**

![](nodeapp/public/assets/img/10readme.png)

**Envío de un e-mail desde un back-end**

![](nodeapp/public/assets/img/11readme.png)

**Envío con tarea programada**

![](nodeapp/public/assets/img/12readme.png)

**Comandos personalizados en NPM**

NPM nos permite crear nuestro propios comandos personalizados

Esto es útil para ejecutarlos desde la consola o a través de tareas programadas (con cron)

Tan sólo hay que crear una entrada en package.json, apartado scripts

**VEAMOS OTRA FORMA DE HACER MUCHO MEJOR:**

**Envío de un e-mail con tareas en background**

![](nodeapp/public/assets/img/13readme.png)


**Tareas en background con RabbitMQ**

Es un software de envio de mensajes entre aplicativos. No tiene nada que ver con el emial o whatsapp, son mensajes entre aplicativos para que se cominquen a través de este software- RabbitMQ es un software de envío de mensajes que implementa el protocolo AMQP

https://rabbitmq.com/#getstarted

Podemos usarlo desde:

* Instalación Win/linux/Mac https://www.rabbitmq.com/download.html
* Docker https://hub.docker.com/_/rabbitmq/
* CloudAMQP https://www.cloudamqp.com/

El servicio que usaremos nosotros es CloudAMQP https://www.cloudamqp.com/  y me creo una instancia

![](nodeapp/public/assets/img/16readme.png)

Y usarlo desde amazon, cloud foundry, etc...

Las credenciales para conectar estám en OVERVIEW

Creo carpeta `ejemplo-rabbitmq` y los archivos `consumer.js` y `publisher.js` que se comunicarán entre ellos. Ahora me voy a 

```sh
cd ejemplo-rabbitmq
npm init -y
```
esto creará un packeage.json y voy a utilizar una librería `AMQP` advence message q protocol

```sh
npm repo amqplib
npm install amqplib
```

`publisher.js`

utilizamos estas técnicas https://amqp-node.github.io/amqplib/channel_api.html

```js
'use strict';

require('dotenv').config();

const amqplib = require('amqplib');
const EXCHANGE = 'task-request';

main().catch(err => console.log('Hubo un error', err));

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // conectar al broker de RabbitMQ
  // la URL la sacamos de AMQP details https://api.cloudamqp.com/ (está en .env)
  const connection = await amqplib.connect('amqps://ltdqkxwg:nLJMO8DacQSTA4mUtMXLzR707hamH0Gl@whale.rmq.cloudamqp.com/ltdqkxwg'); 

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe un exchange (si no lo crea)
  // https://amqp-node.github.io/amqplib/channel_api.html#channel_assertExchange
  await canal.assertExchange(EXCHANGE, 'direct', {
    durable: true // the exchange will survive broker restarts
  })
  
  const mensaje = {
    tarea : 'enviar un email'
  };
  console.log('enviado mensaje', mensaje);

  canal.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(mensaje)), {
    persistent: true, // the message will survive broker restarts
  });

  console.log('enviado mensaje', mensaje);
  // await sleep(1);
}
```

ya ùedes empezar a comprovar si tienes conexion

```sh
cd ejemplo-rabbitmq
npx nodemon publisher.js
```
Si te vas a `RabbitMQ Manager` en https://customer.cloudamqp.com/instance haces click y te vas a `Eschanges` y en Exchange: task-request verás el gráfico con la señal.

> [!NOTE] 
> Quien publica, publica un Exchange y quien recibe recibe una Coda. La Coda está asociada a quien recibe el mensaje normalmente.
> Puedes ver lo patrones que hai en :
> https://www.rabbitmq.com/getstarted.html
>
> La X en los gráficos es un Exchange y ese X fíjate que lo envía a una o varias colas. 
> `Publish/Subscribe` lo enviará a todas las colas, lo enviará a todo el suscrito
> `Work Queues` irá uno detrás de otro
> ¿a qué codas se lo enviaremos nosotros? `keepSending = canal.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(mensaje)), {` a todas, poreso hemos puesto el `*`.
> `Routing` dependiendo del tipo de `log` el exchange lo enviará a una cola u otra. Si es por ejemplo un log de error pues le llega a un consumidor, por ejempli que elerte al admin del sistema. El log de warning lo enviaría a un fichero de log, o lo que sea.
> `Topics` podríamos definirle comodines 
> `RPC` de petición respuesta, hace petición y espera una respuesta.

Nosotros vamos hacer funcionar `Work Queues`

Voy a meterlo en un bucle infonito para que esté publicando mensajes constantemente.
Vpu a instalar `npm install dotenv` para que me cargue las variable de entorno. Esto es porque la clave la vamos a meter en `.env` en `cd ejemplo-rabbitmq`

```js
'use strict';

require('dotenv').config();

const amqplib = require('amqplib');
const EXCHANGE = 'task-request';

main().catch(err => console.log('Hubo un error', err));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe un exchange
  await canal.assertExchange(EXCHANGE, 'direct', {
    durable: true // the exchange will survive broker restarts
  })

  let keepSending = true;

  while (true) {
    // publicar mensajes
    const mensaje = {
      tarea: 'enviar un email' + Date.now()
    };

    // verificar si puedo enviar más o tengo que darle un respiro
    if (!keepSending) {
      // esperar a que se drene (vacie) el buffer de escritura del broker
      console.log('Buffer lleno, espero a que se vacie');
      await new Promise(resolve => canal.on('drain', resolve))
    }

    keepSending = canal.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(mensaje)), {
      persistent: true, // the message will survive broker restarts
    });

    console.log('enviado mensaje', mensaje);
    // await sleep(1);
  }

}
```

Creamos el publicador ahora vamos a crear el consumidor `consumidor.js`

```js
'use strict';

require('dotenv').config();

const amqplib = require('amqplib');

const QUEUE = 'tasks';

main().catch(err => console.log('Hubo un error', err));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe la cola para recibir mensajes
  // es responsabilidad del consumir que exista esta cola
  await canal.assertQueue(QUEUE, {
    durable: true, // the queue will survive broker restarts
    // si prebalece la velocidad que una poca pérdida de mensajes pondrías a FALSE
    // y lo gestionaría todo en memoria
  });

  // le dice al publicador "dame 1 mensaje y hasta que no acabae no me des más"
  canal.prefetch(1); // pending ack's

  canal.consume(QUEUE, async mensaje => {
    // sacamos el contenido del Buffet (esto puede ser cualquier tipo de fichero ahora es toString()
    const payload = mensaje.content.toString();
    console.log(payload);
    await sleep(150);
    canal.ack(mensaje);
  });

}
```

Tengo arrancado y enviando mesajes ` npx nodemon publisher.js` 

```sh
enviado mensaje { tarea: 'enviar un email1703079460016' }
enviado mensaje { tarea: 'enviar un email1703079462018' }
enviado mensaje { tarea: 'enviar un email1703079464018' }
enviado mensaje { tarea: 'enviar un email1703079466020' }
enviado mensaje { tarea: 'enviar un email1703079468022' }
enviado mensaje { tarea: 'enviar un email1703079470024' }
enviado mensaje { tarea: 'enviar un email1703079472025' }
```

Ahora arranco `npx nodemon consumer.js` y verás que no parece que nos llegue ningún mensaje, esto es porque no lo hemos conectado:

A mano (se podría hacer en codigo pero yo prefiero a mano) conectamos la cola del consumidor https://whale.rmq.cloudamqp.com/#/exchanges/ltdqkxwg/task-request:

![](nodeapp/public/assets/img/17readme.png)


Ahora si que nos aparecen los mensajes en consola

```sh
➜  ejemplo-rabbitmq git:(main) ✗ npx nodemon consumer.js
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node consumer.js`
{"tarea":"enviar un email1703079645001"}
{"tarea":"enviar un email1703079647004"}
{"tarea":"enviar un email1703079649007"}
{"tarea":"enviar un email1703079651009"}
```

Puedes ver que llegan y vemos que son string, podrían ser ficheros o lo que sea que se envia y consume.

![](nodeapp/public/assets/img/18readme.png)

Ves que hay una tarea abierta, entra en task

![](nodeapp/public/assets/img/19readme.png)

Puedes ver que están llegando los mensajes en `Message rates last ten minutes ` y en `Queued messages last ten minutes ` nos dice la cola que tiene, puedes ver que es baja o que no hay porque le estamos diciendo `canal.ack(mensaje);` en 

![](nodeapp/public/assets/img/20readme.png)


Ahora voy hacer que el que ublica lo haga más rápido  `await sleep(100);`  
Podríamos hacer que el consumidor tarde más, y que cada vez que consuma lo escriba por la consola , cómo configurar al consumidor para que le diga a la cola que se vaya esperando porque estoy trabajando: con `canal.prefetch(1); // pending ack's`

Si duplicas el terminal y abres otro consumidor `npx nodemon consumer.js` también consumirá, puedes abrir tantos consumidores como creas y consumirán lo que publique el publicador. Escalas tu apicación escalando el proceso consumidor.

Este metodo nos permite tener varios elementos que publican y varios que consuman.


**Docker**

```sh
docker run
  -d --hostname=mq --name mq -p 8080:15672 -p 5672:5672
  rabbitmq:3-management
```

```sh
npm i amqplib
```

Uso con Node.js http://www.squaremobius.net/amqp.node/

Ejemplos estratégias https://github.com/squaremo/amqp.node/blob/master/examples/tutorials/README.md


¿Que tamaño pueden tener los mensajes?  

Teoricamente: 2^64 bytes  

En la práctica depende de las máquinas que usemos y la conexión.  

Si los mensajes son grandes mejor enviar una ruta a un servidor de ficheros o similar.


Usando MongoDB: 
* https://github.com/chilts/mongodb-queue
* https://github.com/scttnlsn/monq 
* https://github.com/agenda/agenda

Usando Redis: 
* https://github.com/bee-queue/bee-queue
* https://github.com/OptimalBits/bull
* https://github.com/Automattic/kue


---

