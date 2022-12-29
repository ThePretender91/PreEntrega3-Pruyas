//Almacena la transaccion
const transaccion = [];

const contenedorbutaca = document.querySelector('.contenedor-sala');
const butacas = document.querySelectorAll('.fila .butaca:not(.ocupado');
const peliculaSeleccionada = document.getElementById('pelicula');
const formatoSeleccionado = document.getElementById('formato');
const fechaSeleccionada = document.getElementById('fecha');
const horarioSeleccionado = document.getElementById('horario');
const cantidad = document.getElementById('cantidad');
const total = document.getElementById('total');
const botonCheckout = document.getElementById('checkout');
const contenedorCheckout = document.querySelector('.contenedor-checkout');
const alertPlaceholder = document.getElementById('alertaSeleccionButacas')

let precioPelicula = parseInt(peliculaSeleccionada.value);
let verificacionButacas = 0;
let formatoPelicula = '';
let fechaPelicula = '';
let horarioPelicula = '';

verificarStorage();

//Actualiza cantidad y total
function actualizarSeleccion() {
    const seleccionButacas = document.querySelectorAll('.fila .butaca.seleccionado');

    const indiceButacas = [...seleccionButacas].map((butaca) => [...butacas].indexOf(butaca));

    localStorage.setItem('indiceButacas', JSON.stringify(indiceButacas));

    verificacionButacas = seleccionButacas.length;

    if(verificacionButacas > 0) {
        document.getElementById('alertaSeleccionButacas').innerHTML = '';
    }     

    cantidad.innerText = verificacionButacas;
    total.innerText = verificacionButacas * precioPelicula;
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
        
        formatoPelicula = localStorage.getItem('valorSeleccionFormato');
    }

    const indiceFechaSeleccionada = localStorage.getItem('indiceSeleccionFecha');

    if (indiceFechaSeleccionada !== null) {
        fechaSeleccionada.selectedIndex = indiceFechaSeleccionada;

        fechaPelicula = localStorage.getItem('valorSeleccionFecha');
    }

    const indiceHorarioSeleccionado = localStorage.getItem('indiceSeleccionHorario');

    if (indiceHorarioSeleccionado !== null) {
        horarioSeleccionado.selectedIndex = indiceHorarioSeleccionado;

        horarioPelicula = localStorage.getItem('valorSeleccionHorario');
    }
}

const alert = (message) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-warning alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
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

botonCheckout.addEventListener('click', (e) => {
    if(verificacionButacas > 0) {
        const pelicula = peliculas.find(pelicula => pelicula.id === peliculaSeleccionada.selectedIndex+1);

        agregarTransaccion(pelicula, formatoPelicula, verificacionButacas, fechaPelicula, horarioPelicula);

        mostarDatosCheckout();

        contenedorCheckout.classList.toggle('checkout-active');
    } else {
        alert('Debe seleccionar alguna butaca')
    }    
});

const mostarDatosCheckout = () => {
    const contenedor = document.getElementById('contenedor-transaccion');
    
    transaccion.forEach(transaccion => {
    contenedor.innerHTML = `
    <div class="contenedor-informacion">
    <div>
        <p>Pelicula</p>
        <p id="nombrePelicula">${transaccion.nombre}</p>
        <p>Formato: <span id="formatoPelicula">${transaccion.formato}</span></p>
        <p>Fecha: <span id="fechaHoraPelicula">${transaccion.fecha}</span></p>
        <p>Cantidad Entradas: <span id="cantidadEntradas">${transaccion.cantidad}</span></p>
        <p>Precio por Entrada: $<span id="precioEntrada">${transaccion.precio}</span></p>
    </div>
    <img src=${transaccion.imagen} width="200" alt="${transaccion.nombre}">
    </div>
    <p><small>Si esta correcto la transaccion, presione "Aceptar".</small></p>
    <p><small>Si desea realizar alguna modificacion, presione en "Cancelar"</small></p>
    <div class="contenedor-botones-checkout">
        <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary" type="button" id="aceptarCheckout">Aceptar</button>
            <button class="btn btn-secondary" type="button" id="cancelarCheckout">Cancelar</button>
        </div>
    </div>`
});
}

const agregarTransaccion = (pelicula, formato, cantidad, fecha, horario) => {
    pelicula.cantidad += cantidad;
    pelicula.fecha = fecha + '. ' + horario;
    pelicula.formato = formato;
    
    transaccion.push(pelicula)
};

actualizarSeleccion();