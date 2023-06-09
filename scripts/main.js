if (window.location.href.indexOf('index.html') > -1) {

  let text = document.getElementById('txtPara');
  let leaf = document.getElementById('leaf');
  let hill1 = document.getElementById('hill1');
  let hill2 = document.getElementById('hill2');
  let hill3 = document.getElementById('hill3');
  let hill4 = document.getElementById('hill4');
  let hill5 = document.getElementById('hill5');

  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -0.3 + 'px';
    hill3.style.left = value * 0.4 + 'px';
  });
}
if (window.location.href.indexOf('parques.html') > -1) {

  function cargarSweetAlert() {
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  let parques = [];
  //Cargamos parques desde el archivo parques.json
  fetch("../scripts/parques.json")
    .then(response => response.json())
    .then(data => {
      parques = data;
      cargarParques(parques);
    })

  const contenedorParques = document.querySelector("#contenedor-parques");
  const botonesCategoria = document.querySelectorAll(".boton-categoria");
  let botonSeleccion = document.querySelectorAll(".parque-seleccion");
  const numero = document.querySelector("#numero");

  let parquesEnAventura = [];
  // Cargar datos del almacenamiento local al iniciar la página
  window.addEventListener('DOMContentLoaded', () => {
    const parquesGuardados = localStorage.getItem('parques-en-aventura');
    if (parquesGuardados) {
      parquesEnAventura = JSON.parse(parquesGuardados);
      actualizarNumero();
    }
  });

  function cargarParques(parquesSeleccionados) {

    contenedorParques.innerHTML = "";

    parquesSeleccionados.forEach(parque => {

      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
                <div class="card">
                    <img src="${parque.imagen}" class="img-parque" alt="${parque.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${parque.titulo}</h5>
                        <p class="card-text">Dificultad: ${parque.dificultad} /${parque.km} / ${parque.tiempo}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${parque.valor}</li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn btn-primary">Sitio Oficial</button>
                        <button type="button" class="btn text-white btn-info">Información</button> 
                        <button type="button" class="btn btn-success parque-seleccion" id="${parque.id}">Seleccionar</button>  
                    </div>
                </div>
        `;
      contenedorParques.append(div);
    });
    clicBotonAgregar();
  }

  cargarParques(parques);

  botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

      botonesCategoria.forEach(boton => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");

      if (e.currentTarget.id !== "todos") {
        const categoriaSeleccionada = parques.filter(parque => parque.categoria.id === e.currentTarget.id);
        cargarParques(categoriaSeleccionada);
      } else {
        cargarParques(parques);
      }
    });
  });

  function clicBotonAgregar() {
    
    botonSeleccion = document.querySelectorAll(".parque-seleccion");
    botonSeleccion.forEach(boton => {
      boton.addEventListener("click", (e) => {
        const parqueSeleccionado = parques.find(parque => parque.id === e.currentTarget.id);
        parquesEnAventura.push(parqueSeleccionado);
        actualizarNumero();
        guardarParquesEnAventura(); 
      });
    });
  }

  function actualizarNumero() {
    numero.innerText = parquesEnAventura.length;
  }
  function guardarParquesEnAventura() {
    localStorage.setItem('parques-en-aventura', JSON.stringify(parquesEnAventura));
    cargarSweetAlert().then(function() {
      // Aquí se garantiza que la biblioteca SweetAlert se ha cargado correctamente
      
      Swal.fire({
        title: 'Parque Agregado',
        text: 'Vamos por la aventura!',
        icon: 'success'
      });
    }).catch(function() {
      console.error('Error al cargar la biblioteca SweetAlert.');
    });
  }
}

if (window.location.href.indexOf('galeria.html') > -1) {

  let parques = [];
  //Cargamos parques desde el archivo parques.json
  fetch("../scripts/parques.json")
    .then(response => response.json())
    .then(data => {
      parques = data;
    })

  setInterval(addItem, 300);

  let itemsCounter = 1;
  let container = document.getElementById('aos-demo');

  function addItem () {
    
    if (itemsCounter > parques.length) return;

    const item = document.createElement('div');
    item.classList.add('aos-item');
    item.setAttribute('data-aos', 'fade-up');
  
    const parqueActual = parques[itemsCounter - 1];
    const imagenURL = parqueActual.imagen;
  
    const itemInnerHTML = document.createElement('div');
    itemInnerHTML.classList.add('aos-item__inner');
    const imagen = document.createElement('img');
    imagen.src = imagenURL;
  
    const titulo = document.createElement('h3');
    titulo.textContent = parqueActual.titulo;
  
    itemInnerHTML.appendChild(imagen);
    itemInnerHTML.appendChild(titulo);
  
    item.appendChild(itemInnerHTML);
    container.appendChild(item);
    itemsCounter++;
  }
}

//------------------------------------Aventura--------------------------------------------------------//




if (window.location.href.indexOf('aventura.html') > -1) {
let parquesEnAventura = localStorage.getItem("parques-en-aventura");
parquesEnAventura = JSON.parse(parquesEnAventura);

const contenedorAventuraVacia = document.querySelector("#aventura-vacia");
const contenedorAventuraParques = document.querySelector("#aventura-parques");
const contenedorAventuraAcciones = document.querySelector("#aventura-acciones");
let btnEliminarParque = document.querySelectorAll(".aventura-parque-eliminar");
const btnVaciar = document.querySelector("#aventura-acciones-vaciar");
const btnFinAventura = document.querySelector(".aventura-acciones-finalizar");


function cargarParquesAventura() {
    if (parquesEnAventura && parquesEnAventura.length > 0) {
        contenedorAventuraVacia.classList.add("disabled");
        contenedorAventuraParques.classList.remove("disabled");
        contenedorAventuraAcciones.classList.remove("disabled");

        contenedorAventuraParques.innerHTML = "";
        actualizarNumero();

        function actualizarNumero() {
            numero.innerText = parquesEnAventura.length;
        }

        parquesEnAventura.forEach(parque => {
            const div = document.createElement("div");
            div.classList.add("aventura-parques");
            div.innerHTML = `
                    <img class="aventura-imagen" src="${parque.imagen}" alt="${parque.titulo}">
                    <div class="aventura-parque-nombre">
                        <small>Parque</small>
                        <h3>${parque.titulo}</h3>
                    </div>
                    <div class="aventura-parque-dificultad">
                        <small>Dificultad</small>
                        <h3>${parque.dificultad}</h3>
                    </div>
                    <div class="aventura-parque-km">
                        <small>Kilometros</small>
                        <h3>${parque.km}</h3>
                    </div>
                    <div class="aventura-parque-tiempo">
                        <small>Tiempo</small>
                        <h3>${parque.tiempo}</h3>
                    </div>
                    <div class="aventura-parque-valor">
                        <small>Valor</small>
                        <h3>${parque.valor}</h3>
                    </div>
                    <button class="aventura-parque-eliminar" id="${parque.id}"><i class="bi bi-trash-fill"></i></button>
            `
            contenedorAventuraParques.append(div);
        });
    }
    else {
        contenedorAventuraVacia.classList.remove("disabled");
        contenedorAventuraParques.classList.add("disabled");
        contenedorAventuraAcciones.classList.add("disabled");
    }
    actualizarbtnEliminar();
    actualizarTotal();
}
cargarParquesAventura();

function actualizarbtnEliminar() {
    btnEliminarParque = document.querySelectorAll(".aventura-parque-eliminar");

    btnEliminarParque.forEach(boton => {
        boton.addEventListener("click", eliminarParqueX)

    });
}

function eliminarParqueX(e) {
    
    const idBoton = e.currentTarget.id;
    const parqueEliminado = parquesEnAventura.find(parque => parque.id === idBoton);
    const index = parquesEnAventura.findIndex(parque => parque.id === idBoton);
    parquesEnAventura.splice(index, 1);
    cargarParquesAventura();
    localStorage.setItem("parques-en-aventura", JSON.stringify(parquesEnAventura));

    Toastify({
        text: "Parque eliminado",
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#359381",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
}

function actualizarTotal() {
    const totalCalculado = parquesEnAventura.reduce((acc, parque) => {
        if (parque.valor !== 'Gratis') {
            return acc + parseInt(parque.valor);
        }
        return acc;
    }, 0);
    total.innerText = `$${totalCalculado}`;
}

btnVaciar.addEventListener("click", vaciarAventura);
function vaciarAventura() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar todos los parques en la aventura`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        confirmButtonColor: "#359381",
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            parquesEnAventura.length = 0;
            numero.innerText = parquesEnAventura.length;
            localStorage.setItem("parques-en-aventura", JSON.stringify(parquesEnAventura));
            cargarParquesAventura();
        }
    })
}
function vaciarAventuraFin() {

    parquesEnAventura.length = 0;
    numero.innerText = parquesEnAventura.length;
    localStorage.setItem("parques-en-aventura", JSON.stringify(parquesEnAventura));
}

btnFinAventura.addEventListener("click", finAventura);
function finAventura() {
  vaciarAventuraFin(); 
  cargarParquesAventura();
  Toastify({
    text: "Gracias por elegir tu aventura con nosotros!",
    duration: 4000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#359381",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
      x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function() {}
  }).showToast();
};

}
