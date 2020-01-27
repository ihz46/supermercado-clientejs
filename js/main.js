console.log('Empieza script');

//declaramos un endpoint, de tipo constante
const ENDPOINT = 'http://localhost:8080/mercadona-rest/producto/';

//seleccionar elementos por id:

//Pintamos el valor de la constante en la etiqueta html que contenga el id endpoint
document.getElementById('endpoint').innerHTML = ENDPOINT;

let inputEL = document.getElementById('idProducto');
let botonEL = document.getElementById('boton');
let resultadoEL = document.getElementById('resultado');
let listaEL = document.getElementById('listaProductos');

//Se carga la función tras cargar la página (Evento onload)
window.onload = function () {
    console.trace('Inicio del DOM');
    cargarProductos();
}

//Función que se ejecuta cuando se carga todo el documento
function cargarProductos() {

    console.log('cargarProductos');

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let productos = JSON.parse(xhr.responseText);
            console.debug("producto en json %o", productos);
            listaEL.innerHTML = "";  // limpiar lista
            for (let p of productos) {
                listaEL.innerHTML += `<li class="list-group-item"><b>${p.id}</b> - ${p.nombre}</li>`;
            }

        }
    }
    xhr.open('Get', `${ENDPOINT}`);
    xhr.send();
    console.debug(`GET ${ENDPOINT}`);


}


//registrar evento click para el boton:
botonEL.addEventListener("click", () => {

    console.debug('Click boton');
    if (inputEL.value == "") {
        resultadoEL.innerHTML = 'Escribe algo por favor';
    } else {

        //hacemos la petición (es la request asincrona, la llamada a Ajax)
        var xhr = new XMLHttpRequest();


        //Cuando cambia el estado de la llamada a ajax
        xhr.onreadystatechange = function () {

            console.debug("state: " + xhr.readyState);
            console.debug("status: " + xhr.status);
            console.debug("responseText: " + xhr.responseText);

            if (xhr.readyState === 4) {  // esperar a completar la peticion

                //convetir de texto a json
                let producto = JSON.parse(xhr.responseText);

                if (xhr.status === 200) {

                    //pintamos en texarea
                    //resultadoEL.innerHTML = "id= " + producto.id + " nombre=" + producto.nombre;
                    resultadoEL.innerHTML = `id= ${producto.id} nombre=${producto.nombre} imagen=${producto.imagen} descripcion=${producto.descripcion}`;
                    nombre.innerHTML = `${producto.nombre}`;
                    imagen.src = `${producto.imagen}`;
                    descripcion.innerHTML = `${producto.descripcion}`;
                    precio.innerHTML = `${producto.precio} €`;
                }

                if (xhr.status === 404) {
                    resultadoEL.innerHTML = `No encontrado`;
                }

            }

        }

        //xhr.open('Get', `http://localhost:8080/mercadona-rest/producto/${inputEL.value}`); //metodo a la uri indicada
        xhr.open('Get', `${ENDPOINT}${inputEL.value}`);
        xhr.send(); //cuidado es ASINCRONO !!


    }


});




