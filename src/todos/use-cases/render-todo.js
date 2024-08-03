import { Todo } from '../models/todo.model';
import { createTodoHTML } from './create-todo-html';

let element;

/**
 * Renderiza una lista de todos en el elemento especificado.
 * @param {string} elementId - El ID del elemento en el que se renderizarán los todos.
 * @param {Todo[]} todos - La lista de todos a renderizar.
 */
export const renderTodos = (elementId, todos = []) => {
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error(`Element with id ${elementId} not found`);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
}
