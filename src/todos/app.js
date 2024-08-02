import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';
import { Todo } from './models/todo.model';

const ElementId = {
    TodoList: '.todo-list',
    TodoInput: '#new-todo-input',
}
/**
 * Esta funcion se encarga de renderizar la aplicacion en el elemento con el id que se le pase
 * @param {string} elementId 
 */
export const App = (elementId) => {


    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementId.TodoList, todos);
    }


    //esta funcion se ejecuta inmediatamente despues de ser definida y se encarga de renderizar la aplicacion
    //en el elemento con el id que se le pase. Esto se llama una funcion autoejecutable
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();

    // Referenciamos el input del formulario
    const newInputDescription = document.querySelector(ElementId.TodoInput);
    const todoListUL = document.querySelector(ElementId.TodoList);


    // Listeners
    newInputDescription.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13 ) return; // Si la tecla presionada no es enter, no hacemos nada
        if ( event.target.value.trim() === '' ) return; // Si el valor del input esta vacio, no hacemos nada

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';

    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]'); // Buscamos el elemento mas cercano que tenga el atributo data-id
        todoStore.toggleTodo(element.getAttribute('data-id')); // Cambiamos el estado del todo
        displayTodos(); // Volvemos a renderizar la lista
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy'; // Verificamos si el elemento clickeado es el boton de eliminar
        const element = event.target.closest('[data-id]'); // Buscamos el elemento mas cercano que tenga el atributo data-id
        if ( !element || !isDestroyElement ) return; // Si no encontramos el elemento o no es el boton de eliminar, no hacemos nada
        todoStore.deleteTodo(element.getAttribute('data-id')); // Eliminamos el todo
        displayTodos(); // Volvemos a renderizar la lista
    });
}

//podemos importar mediante js un documento html y renderizarlo en el DOM con la funcion App
