let parquesEnAventura = localStorage.getItem("parques-en-aventura");
parquesEnAventura = JSON.parse(parquesEnAventura);

const contenedorAventuraVacia = document.querySelector("#aventura-vacia");
const contenedorAventuraParques = document.querySelector("#aventura-parques");
const contenedorAventuraAcciones = document.querySelector("#aventura-acciones");
const contenedorAventuraFinalizada = document.querySelector("#aventura-finalizada");


if(parquesEnAventura) {
    contenedorAventuraVacia.classList.add("disabled");
    contenedorAventuraParques.classList.remove("disabled");
    contenedorAventuraAcciones.classList.remove("disabled");
    contenedorAventuraFinalizada.classList.add("disabled");

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
                    <small>Titulo</small>
                    <h3>${parque.titulo}</h3>
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
                <button class="aventura-parque-eliminar"><i class="bi bi-trash-fill"></i></button>
        `
        contenedorAventuraParques.append(div);
    })
    

}else{

}