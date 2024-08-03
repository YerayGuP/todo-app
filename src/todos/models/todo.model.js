import { v4 as uuid } from 'uuid';

export class Todo {
    /**
     * Crea una instancia de Todo.
     * @param {string} description - Descripción de la tarea.
     */
    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}