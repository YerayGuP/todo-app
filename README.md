## generar html dinamicamente:

1. En nuestro documento html debemos vicular ```main.js``` e ```index.html```.
    index.html:

        <div id="app"></div>
        <script type="module" src="/main.js"></script>

2. Creamos un directorio llamado ```src``` con dos subdirectorios ```src/store``` y ```src/todos```.
3. En el directorio ```todos/``` creamos dos archivos:

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

## Creamos la clase Todo
1. Dentro del directorio ```todos``` creamos el directorio ```models``` y en su interior un archivo llamado ```todo.model.js```.
2. En este archivo creamos una clase llamada Todo, con una propiedad ```description``` y un constructor que la recoja como parametro.
3. En el interior del constructor definimos un id, un estado (done) y una fecha (createdAt).

        export class Todo {
            description;
            constructor(description) {
                this.description = description;
                this.id = 1;
                this.done = false;
                this.createdAt = new Date();
            }
        }

## Creamos el store
1. Dentro del directorio ```store``` creamos el archivo ```todo.store.js```, el cual llevara la logica del store.
2. Importamos la clase Todo a ```todo.store.js```:

        import { Todo } from '../todos/models/todo.model';

3. Definimos un objeto Filter con tres propiedades: all, completed y pending.

        const Filter = {
            all: 'all',
            completed: 'completed',
            pending: 'pending',
        }

4. Definimos el estado inicial de la aplicación. Esto nos sirve para tener datos de prueba y poder ver cómo se comporta la aplicación. Basicamente es un objeto con dos propiedades todos: 

    a. Un array con cinco instancias de la clase Todo. 


    b. filter: la propiedad filter con el valor Filter.all que llama al objeto Filter que definimos anteriormente.

        const state = {
            todos: [
                new Todo('Piedra del alma'),
                new Todo('Piedra del tiempo'),
                new Todo('Piedra del espacio'),
                new Todo('Piedra de la mente'),
                new Todo('Piedra del poder'),
            ],
            filter: Filter.all,
        }

5. Definimos una función initStore que por ahora solo imprime un mensaje en la consola. Pero más adelante, esta función nos permitirá inicializar el store de Vuex.

        const initStore = () => {
            console.log('InitStore')
        }

6. Exportamos un objeto con la propiedad initStore que apunta a la función initStore que definimos anteriormente. De esta manera, cuando importemos el store en el archivo main.js, podremos llamar a la función initStore.

        export default {
            initStore,
        }

7. Finalmente, vamos a main.js, importamos el store y llamamos a la función initStore.

    main.js: 

        import todoStore from './src/store/todo.store'
        todoStore.initStore();

## instalamos la dependecia UUID para crear id unicos para cada tarea.

1. En nuestra terminal instalamos esta dependecia desde ```npm i uuid```. Si se instala, lo veremos en nuestro package.json.

2. Importamos la dependencia en ```todo.model.js```:

    todo.model.js:
    
        //importacion de la dependencia
        import {v4 as uuid } from 'uuid';

        export class Todo {
            description;

            constructor(description) {
                //actualizamos el id con la función uuid() que nos devuelve un id único
                this.id = uuid();
                this.description = description;
                this.done = false;
                this.createdAt = new Date();

            }
        }
