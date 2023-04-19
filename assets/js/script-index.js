$("document").ready( function (){
    
    function obtenerTodosLosDigimon(){
        return fetch("https://digimon-api.vercel.app/api/digimon")
        .then(response => response.json())
        .catch(error => console.error(error));
    }

    function enviarTodosLosDigimonAlHTML(datos){
        let htmlDigimons = ""
        for (const dato of datos) {
            htmlDigimons += `<div class="col">
                <div class="card" data-nombre="${dato.name}">
                    <img src="${dato.img}" class="card-img-top img-fluid" alt="Imagen digimon">
                    <div class="card-body">
                        <h5 class="card-title text-truncate">${dato.name}</h5>
                    </div>
                </div>
            </div>`
        }
        let divDigimons = $("#digimons")
        divDigimons.html(htmlDigimons)

        let cardDigimon = $(".card")
        cardDigimon.click( function () {
                let nombreDigimon = $(this).data("nombre");
                    limpiarModal()
                    obtenerDigimonPorNombre(nombreDigimon)
                    .then(datos => enviarDigimonAModal(datos))
                    .catch(error => console.error(error))
                    $("#modalDigimon").modal("show")
        })
    }

    obtenerTodosLosDigimon()
    .then(datos => enviarTodosLosDigimonAlHTML(datos))
    .catch(error => console.error(error));

    function obtenerDigimonPorNombre(nombre){
        return fetch("https://digimon-api.vercel.app/api/digimon/name/" + nombre)
        .then(response => response.json())
        .catch(error => console.error(error));
    }
    
    function limpiarModal () {
        $("#modalNombreDigimon").text("")
        $("#modalImagenDigimon").attr("src", "")
        $("#modalNivelDigimon").text("")
    }


    function enviarDigimonAModal(datos){
        $("#modalNombreDigimon").text(datos[0].name)
        $("#modalImagenDigimon").attr("src", datos[0].img)
        $("#modalNivelDigimon").text("Nivel: "+datos[0].level)
    }
    
})