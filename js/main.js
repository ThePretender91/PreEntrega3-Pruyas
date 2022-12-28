const contenedorbutaca = document.querySelector('.contenedor-sala');
const butacas = document.querySelectorAll('.fila .butaca:not(.ocupado');
const peliculaSeleccionada = document.getElementById('pelicula');
const formatoSeleccionado = document.getElementById('formato');
const fechaSeleccionada = document.getElementById('fecha');
const horarioSeleccionado = document.getElementById('horario');
const cantidad = document.getElementById('cantidad');
const total = document.getElementById('total');

verificarStorage();

let precioPelicula = parseInt(peliculaSeleccionada.value);
let formatoPelicula = '';
let fechaPelicula = '';
let horarioPelicula = '';

//Actualiza cantidad y total
function actualizarSeleccion() {
    const seleccionButacas = document.querySelectorAll('.fila .butaca.seleccionado');

    const indiceButacas = [...seleccionButacas].map((butaca) => [...butacas].indexOf(butaca));

    localStorage.setItem('indiceButacas', JSON.stringify(indiceButacas));

    let cantidadButacasSeleccionadas = seleccionButacas.length;
    
    cantidad.innerText = cantidadButacasSeleccionadas;
    total.innerText = cantidadButacasSeleccionadas * precioPelicula;
}

function verificarStorage() {
    const butacasSeleccionadas = JSON.parse(localStorage.getItem('indiceButacas'));

    if (butacasSeleccionadas !== null && butacasSeleccionadas.length > 0) {
        butacas.forEach((butaca,index) => {
            if (butacasSeleccionadas.indexOf(index) > -1) {
                butaca.classList.add('seleccionado')
            }
        });
    }

    const indicePeliculaSeleccionada = localStorage.getItem('indiceSeleccionPelicula');

    if (indicePeliculaSeleccionada !== null) {
        peliculaSeleccionada.selectedIndex = indicePeliculaSeleccionada;
    }

    const indiceFormatoSeleccionado = localStorage.getItem('indiceSeleccionFormato');

    if (indiceFormatoSeleccionado !== null) {
        formatoSeleccionado.selectedIndex = indiceFormatoSeleccionado;
    }

    const indiceFechaSeleccionada = localStorage.getItem('indiceSeleccionFecha');

    if (indiceFechaSeleccionada !== null) {
        fechaSeleccionada.selectedIndex = indiceFechaSeleccionada;
    }

    const indiceHorarioSeleccionado = localStorage.getItem('indiceSeleccionHorario');

    if (indiceHorarioSeleccionado !== null) {
        horarioSeleccionado.selectedIndex = indiceHorarioSeleccionado;
    }
}

//Listeners
peliculaSeleccionada.addEventListener('change', (e) => {
    precioPelicula = parseInt(e.target.value);

    localStorage.setItem('indiceSeleccionPelicula', e.target.selectedIndex);
    localStorage.setItem('precioSeleccionPelicula', e.target.value);

    actualizarSeleccion();
});

formatoSeleccionado.addEventListener('change', (e) => {
    formatoPelicula = e.target.value;

    localStorage.setItem('indiceSeleccionFormato', e.target.selectedIndex);
    localStorage.setItem('valorSeleccionFormato', e.target.value);
});

fechaSeleccionada.addEventListener('change', (e) => {
    fechaPelicula = e.target.value;

    localStorage.setItem('indiceSeleccionFecha', e.target.selectedIndex);
    localStorage.setItem('valorSeleccionFecha', e.target.value);
});

horarioSeleccionado.addEventListener('change', (e) => {
    horarioPelicula = e.target.value;

    localStorage.setItem('indiceSeleccionHorario', e.target.selectedIndex);
    localStorage.setItem('valorSeleccionHorario', e.target.value);
});

contenedorbutaca.addEventListener('click', (e) => {
    if (e.target.classList.contains('butaca') && !e.target.classList.contains('ocupado')) {
        e.target.classList.toggle('seleccionado');
    }
    actualizarSeleccion();
});

actualizarSeleccion();