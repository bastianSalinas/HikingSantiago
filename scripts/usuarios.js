const url = "https://jsonplaceholder.typicode.com/users";
const contTrabajadores = document.querySelector("#lista-usuarios");


fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(trabajador => {
            const div = document.createElement("div");
            div.classList.add("trabajadores");
            div.textContent =trabajador.name+"  ("+trabajador.username+")"+"\n"+trabajador.email;
            contTrabajadores.append(div);
        });
    })
    .catch(error => console.log("Error en traer información de la API", error))

