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
node --inspect-brk index.js 
```

`index.js ` esto es el fichero que quieres que ejecute, su tu aplicación arranca en `./bin/wwww` pues pon esto y arrancaras el debugger y verás que te muestra una guía.

Vete al browser y pone esto `chrome://inspect` verás que te permite hacer un link a las `DevTools` de tu codigo y está en la primera linea para esperando ¿porqué? porque en el arranque `node --inspect-brk index.js ` le pusiste `-brk`.  
En `DevTools` puedes poner breakpoints, recargas la página `localhost:3000` y se irá parando en los puntos

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

Y le das al `Launch Progran` para arrancar desde terminal verás que conecta con mongoDB
