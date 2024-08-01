import {v4 as uuid } from 'uuid';

export class Todo {
    description;
    /**
     * El constructor de la clase Todo recibe una descripción y la asigna a la propiedad description.
     * id, done y createdAt son inicializados con valores por defecto.
     * @param {string} description 
     */
    constructor(description) {
        //actualizamos el id con la función uuid() que nos devuelve un id único
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();

    }
}
