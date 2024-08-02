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

## Matizando las funcionalidades de nuestro Store.
* En esta seccion hemos creado las funcionalidades que queremos hacer con nuestro store, pero no hemos implementado ninguna de ellas. Nos servira como una guia para saber que es lo que queremos hacer. Las funciones que implementaremos serán las siguientes:

1. Esta funcion se encargara de guardar el store en el localstorage

            const loadStore = () => {
                throw new Error('Not implemented')
            }


2. Esta funcion implemetara la logica para agregar un nuevo todo

            const addTodo = (todo) => {
                throw new Error('Not implemented')
            }


3. Esta funcion se encargara de eliminar un todo


            const deleteTodo = (id) => {
                throw new Error('Not implemented')
            }


4. Esta funcion se encargara de eliminar todos los todos completados

            const deleteCompleted = () => {
                throw new Error('Not implemented')
            }


5. Esta funcion actualizara el estado de un todo

            const toggleTodo = (id) => {
                throw new Error('Not implemented')
            }


6. Esta funcion se encargara de actualizar el filtro:

            const setFilter = (newFilter = Filter.all) => {
                throw new Error('Not implemented')
            }


7. Esta funcion se encargara de obtener los todos, para no acceder directamente al state:

        const getCurrentFilter = () => {
            throw new Error('Not implemented')
        }

8. Esta funcion se encargara de obtener el todo

        const getTodos = (filter) => {
            throw new Error('Not implemented')
        }

9. Finalmente las agregaremos a la funcion de exportacion por defecto:

        export default {
            addTodo,
            deleteCompleted,
            deleteTodo,
            getCurrentFilter,
            getTodos,
            initStore,
            loadStore,
            setFilter,
            toggleTodo,
        }

## Implementando las funcionalidades:

* Dado que tenemos un objeto `Filter` y un array `todos` en el objeto `state` definidos, construiremos los métodos en base a ellos. 

```javascript
const Filter = {
    all: 'all',
    completed: 'completed',
    pending: 'pending',
}

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
```

### 1. Método `getTodos`:
* Para esta funcionalidad usaremos el condicional `switch` para que, según el tipo de filtro (`all`, `completed` o `pending`), realice una u otra opción. En cada caso, retornará una copia del `state` con los `todos` que coincidan. En el caso de `all`, retornamos ese array con un spread, lo cual no será necesario con `filter` en `completed` y `pending` ya que `filter` es un método inmutable que devuelve una copia del array modificada. La idea es no modificar los originales.

```javascript
const getTodos = (filter = Filter.all) => {
    switch (filter) {
        case Filter.all: 
            return [...state.todos]; 
        case Filter.completed: 
            return state.todos.filter(todo => todo.done);
        case Filter.pending: 
            return state.todos.filter(todo => !todo.done);
        default: 
            throw new Error(`Option ${filter} not valid`);
    }
}
```

### 2. Método `addTodo`:
* En esta funcionalidad solo requerimos una descripción. Una vez que la verificamos, la añadimos dentro del array `todos` mediante el método `push`.

```javascript
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description)); // Agregamos un nuevo todo al array de todos
}
```

### 3. Método `deleteTodo`:
* Este método recogerá un `id` y actualizará el array `state.todos` con todos los `todos` que no tengan el `id` especificado.

```javascript
const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
}
```

### 4. Método `deleteCompleted`:
* Similar al anterior, actualizaremos el array `state.todos` para eliminar todas las instancias que tengan `done` en `true`.

```javascript
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
}
```

### 5. Método `setFilter`:
* Esta función actualizará el filtro. Posee una validación para que solo admita `all`, `completed` o `pending` como filtros.

```javascript
const setFilter = (newFilter = Filter.all) => {
    if (newFilter !== Filter.all && newFilter !== Filter.completed && newFilter !== Filter.pending) {
        throw new Error(`Option ${newFilter} not valid`);
    }
    state.filter = newFilter;
}
```

### 6. Método `getCurrentFilter`:
* Esta función devolverá el filtro activo.

```javascript
const getCurrentFilter = () => {
    return state.filter;
}
```

### 7. Método `toggleTodo`:
* Esta función nos permitirá cambiar el estado de `true` a `false`, y viceversa, de un `todo` específico.

```javascript
const toggleTodo = (id) => {
    if (!id) throw new Error('Id is required');

    state.todos = state.todos.map(todo => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    });
}
```
