import { Todo } from '../todos/models/todo.model';

export const Filter = {
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

/**
 * Inicializa el store cargando los datos del localStorage.
 */
const initStore = () => {
    loadStore();
    console.log('InitStore');
}

/**
 * Carga el store desde el localStorage.
 */
const loadStore = () => {
    if (localStorage.getItem('state')) {
        const { todos = [], filter = Filter.all } = JSON.parse(localStorage.getItem('state'));
        state.todos = todos;
        state.filter = filter;
    }
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Retorna los todos según el filtro proporcionado.
 * @param {string} filter - Filtro a aplicar: 'all', 'completed', 'pending'.
 * @returns {Todo[]} Lista de todos filtrados.
 */
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

/**
 * Agrega un nuevo todo.
 * @param {string} description - Descripción del todo.
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * Elimina un todo por id.
 * @param {string} id - Id del todo a eliminar.
 */
const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
    saveStateToLocalStorage();
}

/**
 * Elimina todos los todos completados.
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * Alterna el estado de un todo.
 * @param {string} id - Id del todo a actualizar.
 */
const toggleTodo = (id) => {
    if (!id) throw new Error('Id is required');

    state.todos = state.todos.map(todo => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * Actualiza el filtro actual.
 * @param {string} newFilter - Nuevo filtro a aplicar: 'all', 'completed', 'pending'.
 */
const setFilter = (newFilter = Filter.all) => {
    if (![Filter.all, Filter.completed, Filter.pending].includes(newFilter)) {
        throw new Error(`Option ${newFilter} not valid`);
    }
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/**
 * Retorna el filtro actual.
 * @returns {string} Filtro actual.
 */
const getCurrentFilter = () => {
    return state.filter;
}

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
