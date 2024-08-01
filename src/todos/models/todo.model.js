export class Todo {
    description;

    /**
     * El constructor de la clase Todo recibe una descripción y la asigna a la propiedad description.
     * id, done y createdAt son inicializados con valores por defecto.
     * @param {string} description 
     */
    constructor(description) {
        this.description = description;
        this.id = 1;
        this.done = false;
        this.createdAt = new Date();


    }
}

/* 
De momento solo tenemos una propiedad en el modelo, la descripción.
Pero en el constructor, además de la descripción, estamos inicializando otras propiedades:
id: un número que identificará a cada tarea.
done: un booleano que indicará si la tarea está completada o no.
createdAt: la fecha en la que se creó la tarea.

*/