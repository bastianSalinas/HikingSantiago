let parquesEnAventura = localStorage.getItem("parques-en-aventura");
parquesEnAventura = JSON.parse(parquesEnAventura);

const contenedorAventuraVacia = document.querySelector("#aventura-vacia");
const contenedorAventuraParques = document.querySelector("#aventura-parques");
const contenedorAventuraAcciones = document.querySelector("#aventura-acciones");
const contenedorAventuraFinalizada = document.querySelector("#aventura-finalizada");
let btnEliminarParque = document.querySelectorAll(".aventura-parque-eliminar");
const btnVaciar = document.querySelector("#aventura-acciones-vaciar");


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
                        <small>Subtotal</small>
                        <h3>${parque.valor}</h3>
                    </div>
                    <button class="aventura-parque-eliminar" id="${parque.id}"><i class="bi bi-trash-fill"></i></button>
            `
            contenedorAventuraParques.append(div);
        });
    }
    else {
        contenedorAventuraVacia.classList.remove("disabled");
        contenedorAventuraFinalizada.classList.add("disabled");
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
