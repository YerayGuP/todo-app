# HACIENDO EL TODOLIST:

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

## Renderizando el todo

* Primero, creamos en `app.js` una función llamada `displayTodos`, que contendrá una variable con el valor para llamar a los todos y mostrar los filtros. También contendrá la función `renderTodos`:

    ```javascript
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementId.TodoList, todos);
    }
    ```

* La llamaremos desde la función autoinvocada:

    ```javascript
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();
    ```

* Crearemos en el directorio `todos`, la carpeta `use-cases`, así como los archivos `create-todo-html.js`, `render-todo.js` e `index.js`.

* En segundo lugar, montamos la función `renderTodos`. Esta función selecciona por ID un elemento HTML y lo almacena en una variable. Tras esto, crea un `forEach` que enviará cada elemento almacenado en el array `todos` como elemento HTML a través de la función `createTodoHTML`:

    `render-todo.js`:

    ```javascript
    import { Todo } from '../models/todo.model';
    import { createTodoHTML } from './create-todo-html';

    export const renderTodos = (elementId, todos = []) => {
        const element = document.querySelector(elementId);
        todos.forEach(todo => {
            element.append(createTodoHTML(todo));
        });
    }
    ```

* En tercer lugar, la función `createTodoHTML` validará si existe el todo y creará una constante HTML con el valor de un `h1` y su descripción. También creará el `li` en una constante y le añadiremos el valor del `h1` anterior. Esa constante `li` la retornaremos.

    ```javascript
    import { Todo } from '../models/todo.model';

    export const createTodoHTML = (todo) => {
        if (!todo) throw new Error('A TODO is required');
        const html = `<h1>${todo.description}</h1>`;

        const liElement = document.createElement('li');
        liElement.innerHTML = html;
        return liElement;
    }
    ```

* Finalmente, en `index.js` exportaremos las funciones anteriores para usarse en `app.js`.

    ```javascript
    export { renderTodos } from './render-todo';
    export { createTodoHTML } from './create-todo-html';
    ```

## Mejorando la función `createTodoHTML`

* Cambiaremos el valor de la constante HTML anterior y crearemos un HTML más completo. El valor de la descripción de cada instancia irá en el `label`, mientras que el `checked` llevará una condicional que valida el `done` de cada instancia. Cada `li` poseerá el atributo `data-id` que tendrá el valor `id` de la instancia, así como la clase `completed` si corresponde.

    ```javascript
    export const createTodoHTML = (todo) => {
        if (!todo) throw new Error('A TODO is required');
        const html = `
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.done ? 'checked' : ''}>
                <label>${todo.description}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        `;

        const liElement = document.createElement('li');
        liElement.innerHTML = html;
        liElement.setAttribute('data-id', todo.id);
        if (todo.done) liElement.classList.add('completed');

        return liElement;
    }
    ```

## Validaciones en `renderTodos`

* Entre los cambios que realizamos, tenemos que creamos la variable `element` externa a la función, pero la instanciamos dentro con una validación que nos permite generar el elemento siempre que no exista de antes y lanzar un error si no existe. Luego, limpiamos el contenido con un texto vacío e iteramos como hicimos anteriormente.

    ```javascript
    let element; // Variable que almacenara el elemento del DOM
    /**
    * 
    * @param {HTMLElement} elementId 
    * @param {Todo} todos 
    */
    export const renderTodos = ( elementId, todos = [] ) => {
        // Si no se ha pasado un elemento por parametro, intentamos obtenerlo del DOM
        if ( !element ) element = document.querySelector( elementId );
        
        // Si no se encuentra el elemento, lanzamos un error
        if ( !element ) throw new Error(`Element with id ${ elementId } not found`);

        // Limpiamos el contenido del elemento
        element.innerHTML = '';

        // Iteramos sobre los todos y los agregamos al elemento del DOM
        todos.forEach( todo => {
            element.append(createTodoHTML(todo));
        })
    }
    ```

## Añadiendo el elemento al DOM

* Dentro de `app.js`, en nuestro objeto `ElementId`, añadiremos el ID del input:

    ```javascript
    const ElementId = {
        TodoList: '.todo-list',
        TodoInput: '#new-todo-input',
    }
    ```

### Una vez creados, haremos la referenciación debajo de la función autoinvocada:
1. Creamos el puntero:

    ```javascript
    const newInputDescription = document.querySelector(ElementId.TodoInput);
    ```

2. Creamos el evento:

    ```javascript
    newInputDescription.addEventListener('keyup', (event) => {});
    ```

3. Dentro de este evento queremos que se envíe el valor del input cuando pulsemos Enter y que nunca se envíe si está vacío. El código de Enter es 13, por lo tanto, la validación en el evento sería la siguiente:

    ```javascript
    if (event.keyCode !== 13) return; // Si la tecla presionada no es Enter, no hacemos nada
    if (event.target.value.trim() === '') return; // Si el valor del input está vacío, no hacemos nada
    ```

4. Para añadir el todo al array como nueva instancia, llamamos al método `addTodo` con el valor del evento y lo mostramos con la función `displayTodos`:

    ```javascript
    todoStore.addTodo(event.target.value);
    displayTodos();
    ```

5. Una vez hecho, reseteamos el valor a un string vacío:

    ```javascript
    event.target.value = '';
    ```

### Resultado:

```javascript
import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';
import { Todo } from './models/todo.model';

const ElementId = {
    TodoList: '.todo-list',
    TodoInput: '#new-todo-input',
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementId.TodoList, todos);
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();

    // Referenciamos el input del formulario
    const newInputDescription = document.querySelector(ElementId.TodoInput);
    newInputDescription.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return; 
        if (event.target.value.trim() === '') return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });
}
```
## Añadimos la funcionalidad de completado y eliminación

* Primero referenciamos la lista HTML que tenemos en el objeto `ElementId`:

```javascript
const ElementId = {
    TodoList: '.todo-list',
    TodoInput: '#new-todo-input',
}

// Referencia al <ul>
const todoListUL = document.querySelector(ElementId.TodoList);
```

### 1. Listener de completado:
* Buscamos el elemento más cercano que tenga el atributo `data-id`.
* Cambiamos el estado del todo.
* Volvemos a renderizar la lista.

```javascript
todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos(); 
});
```

### 2. Listener de eliminación:
* Verificamos si el elemento clickeado es el botón de eliminar.
* Buscamos el elemento más cercano que tenga el atributo `data-id`.
* Si no encontramos el elemento o no es el botón de eliminar, no hacemos nada.
* Eliminamos el todo.
* Volvemos a renderizar la lista.

```javascript
todoListUL.addEventListener('click', (event) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]'); 
    if (!element || !isDestroyElement) return;
    todoStore.deleteTodo(element.getAttribute('data-id'));        
    displayTodos();
});
```

## LocalStore - La persistencia de los datos.

### Local Storage
* El local storage es una característica del navegador web que permite almacenar datos de forma persistente en el dispositivo del usuario, utilizando un espacio de almacenamiento asignado por el navegador. A diferencia de las cookies, los datos guardados en el local storage no tienen una fecha de expiración predeterminada, lo que permite su acceso incluso después de cerrar y reabrir el navegador. Esto lo hace útil para aplicaciones web que requieren almacenar información localmente para su funcionamiento sin conexión o para mejorar la experiencia del usuario.

### Session Storage
* El session storage es una característica del navegador web que permite almacenar datos de forma temporal en el dispositivo del usuario, asociando dichos datos a una única sesión del navegador. Los datos en el session storage se mantienen disponibles mientras la pestaña o ventana del navegador esté abierta y se eliminan automáticamente al cerrar la pestaña o ventana.

### ¿Qué diferencia hay entre ellos?
* La principal diferencia entre session storage y local storage es la duración del almacenamiento: el session storage es temporal y se borra al finalizar la sesión del navegador, mientras que el local storage es persistente y retiene los datos hasta que se eliminen explícitamente, incluso después de cerrar y reabrir el navegador.

### saveStateToLocalStorage:
* Esta función se compone del objeto `localStorage`, encargado de manejar el almacenamiento local del navegador. Para implementar el guardado, accederemos a su método `setItem`, que permite guardar datos en el almacenamiento local. Este método requiere un nombre para la clave y un objeto JSON, convertido a una cadena de texto mediante `JSON.stringify`. Con esto, guardaremos el estado del objeto.

```javascript
const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}
```

* Esta función será llamada desde cada método que altere el objeto `todos`. Ejemplo: `addTodo`, `deleteTodos`, `deletedCompleted`, `toggleTodos`, etc.

### loadStore:
* Esta función nos permitirá verificar si existe un objeto `state`. De existir, haremos una desestructuración del objeto JSON y los relacionaremos con el array `todos` y el objeto `Filter`.

```javascript
const loadStore = () => {
   if (localStorage.getItem('state')) {
        const { todos = [], filter = Filter.all } = JSON.parse(localStorage.getItem('state'));
        state.todos = todos;
        state.filter = filter;
   }
   return;
}
```

### Inicializándolo en el initStore:
* Llamaremos a `loadStore` desde `initStore`.

```javascript
const initStore = () => {
    loadStore();
    console.log('InitStore');
}
```

* Con esto, por fin hemos añadido la función `saveStateToLocalStorage` para guardar el estado en `localStorage` y la función `loadStore` para cargar el estado desde `localStorage` al inicializar la aplicación. 

### Método todoCompleted:

## Añadiendo la funcionalidad para borrar completados

1. Añadimos una nueva entrada en el objeto `ElementId` para seleccionar el botón de borrado de completados.

    ```javascript
    const ElementId = {
        TodoList: '.todo-list',
        TodoInput: '#new-todo-input',
        TodoCompleted: '.clear-completed',
    }
    ```

2. Necesitamos asignar este nuevo identificador a una constante para poder trabajar con él. 

    ```javascript
    const todoCompleted = document.querySelector(ElementId.TodoCompleted);
    ```

3. Crearemos un listener para manejar el evento `click` en el botón de borrar completados. Este listener ejecutará una función que primero eliminará todos los todos completados del `todoStore` y luego volverá a renderizar la lista de todos actualizada:

    ```javascript
    todoCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted(); 
        displayTodos(); 
    });
    ```

