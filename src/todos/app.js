import html from './app.html?raw';
import todoStore, { Filter } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';
import { Todo } from './models/todo.model';

const ElementId = {
    TodoList: '.todo-list',
    TodoInput: '#new-todo-input',
    TodoCompleted: '.clear-completed',
    TodoFilter: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * Inicializa y renderiza la aplicación en el elemento especificado.
 * @param {string} elementId - El ID del elemento en el que se renderizará la aplicación.
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementId.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementId.PendingCountLabel);
    }

    // Inicializa la aplicación
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();

    // Referencias a los elementos del DOM
    const newInputDescription = document.querySelector(ElementId.TodoInput);
    const todoListUL = document.querySelector(ElementId.TodoList);
    const todoCompleted = document.querySelector(ElementId.TodoCompleted);
    const filtersUL = document.querySelectorAll(ElementId.TodoFilter);

    // Event listeners
    newInputDescription.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13 || event.target.value.trim() === '') return;
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if (element) {
            todoStore.toggleTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (isDestroyElement && element) {
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });

    todoCompleted.addEventListener('click', (event) => {
        if (event.target.className === 'clear-completed') {
            todoStore.deleteCompleted();
            displayTodos();
        }
    });

    filtersUL.forEach(el => {
        el.addEventListener('click', (event) => {
            filtersUL.forEach(filter => filter.classList.remove('selected'));
            event.target.classList.add('selected');
            
            switch (event.target.textContent) {
                case 'Todos':
                    todoStore.setFilter(Filter.all);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filter.pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filter.completed);
                    break;
            }

            displayTodos();
        });
    });
}
