import todoStore, { Filter } from "../../store/todo.store";

let element;

/**
 * Renderiza el número de todos pendientes en el elemento especificado.
 * @param {string} elementId - El ID del elemento en el que se renderizará el número de todos pendientes.
 */
export const renderPending = (elementId) => {
    if (!element) element = document.querySelector(elementId);
    if (!element) throw new Error('Element not found');

    element.innerHTML = todoStore.getTodos(Filter.pending).length;
}

