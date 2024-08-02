import { Todo } from '../models/todo.model';
import { createTodoHTML } from './create-todo-html';


let element; // Variable que almacenara el elemento del DOM
/**
 * 
 * @param {HTMLElement} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {
    // Si no se ha pasado un elemento por parametro, intentamos obtenerlo del DOM
    if ( !element ) element = document.getElementById(elementId);
    
    // Si no se encuentra el elemento, lanzamos un error
    if ( !element ) throw new Error(`Element with id ${elementId} not found`);

    // Limpiamos el contenido del elemento
    element.innerHTML = '';

    // Iteramos sobre los todos y los agregamos al elemento del DOM
    todos.forEach( todo => {
        element.append(createTodoHTML(todo));
    })
}