$("document").ready(function () {

  function obtenerTodosLosDigimon() {
    return fetch("https://digimon-api.vercel.app/api/digimon")
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  function enviarTodosLosDigimonAlHTML(datos) {
    let htmlDigimons = "";
    for (const dato of datos) {
      htmlDigimons += `<div class="col">
            <a href="" onClick="return false;">
                <div class="card" data-nombre="${dato.name}">
                    <img src="${dato.img}" class="card-img-top img-fluid" alt="Imagen digimon">
                    <div class="card-body">
                        <h5 class="card-title text-truncate">${dato.name}</h5>
                    </div>
                </div>
                </a>
            </div>`;
    }
    let divDigimons = $("#digimons");
    divDigimons.html(htmlDigimons);

    let cardDigimon = $(".card");
    cardDigimon.click(function () {
      let nombreDigimon = $(this).data("nombre");
      limpiarModal();
      obtenerDigimonPorNombre(nombreDigimon)
        .then(datos => enviarDigimonAModal(datos))
        .then($("#modalDigimon").modal("show"))
        .catch(error => console.error(error));
    });
  }

  obtenerTodosLosDigimon()
    .then(datos => enviarTodosLosDigimonAlHTML(datos))
    .catch(error => console.error(error));

  function obtenerDigimonPorNombre(nombre) {
    return fetch("https://digimon-api.vercel.app/api/digimon/name/" + nombre)
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  function limpiarModal() {
    $("#modalNombreDigimon").text("");
    $("#modalImagenDigimon").attr("src", "");
    $("#modalNivelDigimon").text("");
  }

  function traducirNivel(nivelOriginal) {
    switch (nivelOriginal) {
      case ("Fresh"):
        return "Bebé 1";
        break;
      case ("In Training"):
        return "Bebé 2";
        break;
      case ("Rookie"):
        return "Novato";
        break;
      case ("Champion"):
        return "Campeón";
        break;
      case ("Ultimate"):
        return "Ultra";
        break;
      case ("Mega"):
        return "Mega";
      case ("Armor"):
        return "Armadura";
        break;
    }
    return nivelEspanol;
  }

  function enviarDigimonAModal(datos) {
    $("#modalNombreDigimon").text(datos[0].name);
    $("#modalImagenDigimon").attr("src", datos[0].img);
    $("#modalNivelDigimon").text("Nivel: " + traducirNivel(datos[0].level));
  }

});