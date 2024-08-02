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
    newInputDescription.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13 ) return; // Si la tecla presionada no es enter, no hacemos nada
        if ( event.target.value.trim() === '' ) return; // Si el valor del input esta vacio, no hacemos nada

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';

    });
}

//podemos importar mediante js un documento html y renderizarlo en el DOM con la funcion App
