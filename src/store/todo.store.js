import { Todo } from '../todos/models/todo.model';

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

/**
 * Esta funcion se encargara de inicializar el store
 * Lo que significa que se encargara de cargar los datos del localstorage
 */
const initStore = () => {
    console.log(state)
    console.log('InitStore')
}

/**
 * Esta funcion se encargara de guardar el store en el localstorage
 */
const loadStore = () => {
    throw new Error('Not implemented')
}

/**
 * Esta funcion implemetara la logica para agregar un nuevo todo
 * @param {string} todo 
 */
const addTodo = (todo) => {
    throw new Error('Not implemented')
}

/**
 * Esta funcion se encargara de eliminar un todo
 * @param {string} id 
 */
const deleteTodo = (id) => {
    throw new Error('Not implemented')
}

/**
 * Esta funcion se encargara de eliminar todos los todos completados
 */
const deleteCompleted = () => {
    throw new Error('Not implemented')
}

/**
 * Esta funcion actualizara el estado de un todo
 * @param {string} id 
 */
const toggleTodo = (id) => {
    throw new Error('Not implemented')
}

/**
 * Esta funcion se encargara de actualizar el filtro
 * @param {object.property} newFilter
 */
const setFilter = (newFilter = Filter.all) => {
    throw new Error('Not implemented')
}

/**
 * Esta funcion se encargara de obtener los todos, para no acceder directamente al state
 */
const getCurrentFilter = () => {
    throw new Error('Not implemented')
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}

