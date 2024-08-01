import html from './app.html?raw';
/**
 * Esta funcion se encarga de renderizar la aplicacion en el elemento con el id que se le pase
 * @param {string} elementId 
 */
export const App = (elementId) => {

    //esta funcion se ejecuta inmediatamente despues de ser definida y se encarga de renderizar la aplicacion
    //en el elemento con el id que se le pase. Esto se llama una funcion autoejecutable
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
    })();

}

//podemos importar mediante js un documento html y renderizarlo en el DOM con la funcion App
