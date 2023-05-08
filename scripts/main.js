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

//--------------------Parques------------------//

// PRODUCTOS
const parques = [
    // Parques
    //Quebradas
    {
        id: "quebrada-01",
        titulo: "Quebrada de Macul",
        imagen: "../images/quebradas/quebradamacul.jpg",
        categoria: {
            nombre: "Quebrada",
            id: "quebrada"
        },
        valor: "gratis"
    },
    //Parques
    {
        id: "parque-01",
        titulo: "Aguas de Ramón",
        imagen: "../images/parques/aguasderamon.jpg",
        categoria: {
            nombre: "Parques",
            id: "parques"
        },
        valor: 3000
    },
    {
        id: "parque-02",
        titulo: "Alto el Naranjo",
        imagen: "../images/parques/altoelnaranjo.jpeg",
        categoria: {
            nombre: "Parques",
            id: "parques"
        },
        valor: 3000
    },
    {
        id: "parque-03",
        titulo: "Salto de Apoquindo",
        imagen: "../images/parques/saltoapoquindo.jpg",
        categoria: {
            nombre: "Parques",
            id: "parque"
        },
        valor: 3000
    },
    //Cerros
    {
        id: "cerro-01",
        titulo: "Cerro Carbón",
        imagen: "../images/cerros/cerrocarbon.jpg",
        categoria: {
            nombre: "Cerros",
            id: "cerros"
        },
        valor: "Gratis"
    },
    {
        id: "cerro-02",
        titulo: "Cerro Manquehue",
        imagen: "../images/cerros/cerromanquehue.jpg",
        categoria: {
            nombre: "Cerros",
            id: "cerros"
        },
        valor: "Gratis"
    },
    {
        id: "cerro-03",
        titulo: "Cerro Manquehuito",
        imagen: "../images/cerros/cerromanquehuito.jpg",
        categoria: {
            nombre: "Cerros",
            id: "cerros"
        },
        valor: "Gratis"
    },
    {
        id: "cerro-04",
        titulo: "Cerro San Cristobal",
        imagen: "../images/cerros/sancristobal.jpg",
        categoria: {
            nombre: "Cerros",
            id: "cerros"
        },
        valor: "Gratis"
    },
    {
        id: "cerro-05",
        titulo: "Mirador de Condores",
        imagen: "../images/cerros/miradordecondores.jpg",
        categoria: {
            nombre: "Cerros",
            id: "cerros"
        },
        valor: "Gratis"
    },
    //Rios
    {
        id: "rios-01",
        titulo: "Rio Clarillo",
        imagen: "../images/rios/rioclarillo.jpg",
        categoria: {
            nombre: "Rios",
            id: "rios"
        },
        valor: 2000
    }
];

const contenedorParques = document.querySelector("#contenedor-parques"); 

function cargarParques() {
    parques.forEach(parque => {

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
                        <button type="button" class="btn btn-success" id="${parque.id}">Seleccionar</button>  
                    </div>
                </div>
        `;
        contenedorParques.append(div);
    })
}
console.log(parques);
cargarParques();