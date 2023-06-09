const urlS = "https://dummyjson.com/todos";
const contServicios = document.querySelector("#lista-servicios");


fetch(urlS)
    .then( (response) => response.json())
    .then( (data) => {
        data.todos.forEach(servicio => {
            const div = document.createElement("div");
            div.classList.add("servicios");
            div.textContent = servicio.todo;
            contServicios.append(div);
        })
        
    })
    .catch(error => console.log("Error en traer información de la API", error))