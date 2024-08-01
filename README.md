## generar html dinamicamente:

1. En nuestro documento html debemos vicular ```main.js``` e ```index.html```.
    index.html:

        <div id="app"></div>
        <script type="module" src="/main.js"></script>

2. Creamos un directorio llamado ```src``` con dos subdirectorios ```src/store``` y ```src/todos```.
3. En el directorio ````todos/``` creamos dos archivos:
    a. ```app.html``` en el que crearemos el html.
    b. ```app.js``` en el que crearemos una funcion autoejecutable que renderize el contenido de ```app.html```:

    app.js:

        import html from './app.html?raw'; => importamos app.html

        export const App = (elementId) => {
            (() => {
                const app = document.createElement('div');
                app.innerHTML = html;
                document.querySelector(elementId).appendChild(app);
            })();
        }

    c. Cuando se llame a esta funcion creará un div con el contenido de app.html.

4. En nuestro ```main.js``` importamos nuestro ```app.js``` y llamamos a la funcion:

    main.js:
    
        import { App } from './src/todos/app'
        App('#app') 