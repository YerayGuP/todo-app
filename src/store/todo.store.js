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
 * Esta funcion se encargara de obtener los todos
 * @param {*} filter 
 */
const getTodos = (filter = Filter.all) => {
    switch (filter) {
        // En caso de que el filtro sea all, retornamos todos los todos en un nuevo array
        case Filter.all: return [...state.todos]; 
        // En caso de que el filtro sea completed, retornamos todos los todos que esten completados en un nuevo array
        case Filter.completed: return state.todos.filter( todo => todo.done );
        // En caso de que el filtro sea pending, retornamos todos los todos que no esten completados en un nuevo array
        case Filter.pending: return state.todos.filter( todo => !todo.done );
        // En caso de que el filtro no sea valido, lanzamos un error
        default: throw new Error(`Option ${filter} not valid`);
    }
}

/**
 * Esta funcion implemetara la logica para agregar un nuevo todo
 * @param {string} todo 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description)); // Agregamos un nuevo todo al array de todos
    
}

/**
 * Esta funcion se encargara de eliminar un todo
 * @param {string} id 
 */
const deleteTodo = (id) => {
    state.todos = state.todos.filter( todo => todo.id !== id );
    // Filtramos los todos que no tengan el id que queremos eliminar y los guardamos en el array de todos
    // De esta forma eliminamos el todo con el id que pasamos como parametro en el array original

}

/**
 * Esta funcion se encargara de eliminar todos los todos completados
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
}

/**
 * Esta funcion actualizara el estado de un todo
 * @param {string} id 
 */
const toggleTodo = (id) => {
    if (!id) throw new Error('Id is required');

    state.todos = state.todos.map( todo => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    });
}

/**
 * Esta funcion se encargara de actualizar el filtro
 * @param {Filter} newFilter
 */
const setFilter = (newFilter = Filter.all) => {
    if (newFilter !== Filter.all && newFilter !== Filter.completed && newFilter !== Filter.pending) {
        throw new Error(`Option ${newFilter} not valid`);
    }
    state.filter = newFilter;

}

/**
 * Esta funcion se encargara de obtener los todos, para no acceder directamente al state
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

