$("document").ready( function (){
    
    function obtenerTodosLosDigimon(){
        return fetch("https://digimon-api.vercel.app/api/digimon")
        .then(response => response.json())
        .catch(error => console.error(error));
    }

    function enviarTodosLosDigimonAlHTML(datos){
        let htmlDigimons = ""
        for (const dato of datos) {
            htmlDigimons += `<p>Nombre: ${dato.name}<p>
            <p>Nivel: ${dato.level}</p>
            <img src="${dato.img}" alt="">`
        }
        let divDigimons = $("#digimons")
        divDigimons.html(htmlDigimons)
    }

    obtenerTodosLosDigimon()
        .then(datos => enviarTodosLosDigimonAlHTML(datos))
        .catch(error => console.error(error));

    function obtenerDigimonPorNombre(nombre){
        return fetch("https://digimon-api.vercel.app/api/digimon/name/" + nombre)
        .then(response => response.json())
        .catch(error => console.error(error));
    }

    function enviarDigimonAlHTML(datos){
        console.log(datos)
        let htmlDigimon = `<p>Nombre: ${datos[0].name}<p>
        <p>Nivel: ${datos[0].level}</p>
        <img src="${datos[0].img}" alt="">`
        let divDigimon = $("#digimon")
        divDigimon.html(htmlDigimon)
    }

    obtenerDigimonPorNombre("Agumon")
        .then(datos => enviarDigimonAlHTML(datos))
        .catch(error => console.error(error));
    
    function obtenerDigimonsPorNivel(nivel){
        return fetch("https://digimon-api.vercel.app/api/digimon/level/" + nivel)
        .then(response => response.json())
        .catch(error => console.error(error));
    }
    
    obtenerDigimonsPorNivel("Rookie")
        .then(datos => enviarDigimonsPorNivelAlHTML(datos))
        .catch(error => console.error(error));
    
    function enviarDigimonsPorNivelAlHTML(datos){
        console.log(datos)
        let  htmlNiveles = ""
        for (const dato of datos) {
            htmlNiveles += `<p>Nombre: ${dato.name}<p>
            <p>Nivel: ${dato.level}</p>
            <img src="${dato.img}" alt="">`
        }
        let divNiveles = $("#niveles")
        divNiveles.html(htmlNiveles)
    }
})