if (window.location.href.indexOf('index.html') > -1) {

    let text = document.getElementById('txtPara');
    let leaf = document.getElementById('leaf');
    let hill1 = document.getElementById('hill1');
    let hill2 = document.getElementById('hill2');
    let hill3 = document.getElementById('hill3');
    let hill4 = document.getElementById('hill4');
    let hill5 = document.getElementById('hill5');

    window.addEventListener('scroll', () =>{
        let value = window.scrollY;
        text.style.marginTop = value * 2.5 + 'px';
        leaf.style.left = value * 1.5 + 'px';
        hill5.style.left = value * 1.5 + 'px';
        hill4.style.left = value * -0.3 + 'px';
        hill3.style.left = value * 0.4 + 'px';
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
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                            to additional content. This content is a little bit longer.</p>
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

const parquesEnAventura = [];

function agregarAventura(e){
    const idBoton = e.currentTarget.id;
    const parquesSeleccionados = parques.find(parque => parque.id === idBoton);

    if(parquesEnAventura.some(parque => parque.id === idBoton)){
        const index = parquesEnAventura.findIndex(parque => parque.id ===idBoton);
        parquesEnAventura[index].cantidad++;
    }else{
        parquesSeleccionados.cantidad = 1;
        parquesEnAventura.push(parquesSeleccionados);
    }
    cambiarNumero();
    localStorage.setItem("parques-en-aventura", JSON.stringify(parquesEnAventura));
}

function cambiarNumero(){
    let nuevoNumero = parquesEnAventura.reduce((acc, parque) => acc + parque.cantidad, 0);
    numero.innerText = nuevoNumero;
}

