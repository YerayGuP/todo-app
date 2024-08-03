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
 * Esta funcion se encargara de inicializar el store
 * Lo que significa que se encargara de cargar los datos del localstorage
 */
const initStore = () => {
    loadStore();
    console.log('InitStore')
}

/**
 * Esta funcion se encargara de guardar el store en el localstorage
 */
const loadStore = () => {
   if ( localStorage.getItem( 'state' ) ) {
        const { todos = [], filter = Filter.all } = JSON.parse( localStorage.getItem( 'state' ) );
        state.todos = todos;
        state.filter = filter;
   } return;
}

const saveStateToLocalStorage = () => {
    // JSON.stringify(state): metodo que nos permite convertir un objeto a un string de un objeto JSON
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Condiconal switch que se encargara de retornar los todos segun el filtro que se le pase
 * Usa el operador spread para retornar un nuevo array con los todos que cumplan con la condicion
 * @param {Filter} filter.all => Retorna todos los todos
 * @param {Filter} filter.completed => Retorna todos los todos completados
 * @param {Filter} filter.pending => Retorna todos los todos pendientes 
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
    saveStateToLocalStorage()
}

/**
 * Esta funcion se encargara de eliminar un todo
 * @param {string} id 
 */
const deleteTodo = (id) => {
    state.todos = state.todos.filter( todo => todo.id !== id );
    // Filtramos los todos que no tengan el id que queremos eliminar y los guardamos en el array de todos
    // De esta forma eliminamos el todo con el id que pasamos como parametro en el array original
    saveStateToLocalStorage()
}

/**
 * Esta funcion se encargara de eliminar todos los todos completados
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage()
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

    saveStateToLocalStorage()
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
    saveStateToLocalStorage()
}

/**
 * Esta funcion se encargara de retornar el filtro actual
 * @returns {Filter} Ejemplo: all, completed, pending
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

