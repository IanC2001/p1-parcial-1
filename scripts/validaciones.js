class Album {
    constructor(nombre, artista, id, portada, pistas) {
        this.nombre = nombre;
        this.artista = artista;  
        this.id = id;
        this.portada = portada;
        this.pistas = pistas;
    }

    toHTML() {
        let html = `<div class="album-card">`;
        html += `<img src="${this.portada}" class="album-cover">\n`;
        html += `<div class="album-info">\n`;
        html += `<h3 class="album-title">${this.nombre}</h3>\n`;
        html += `<p class="artist-name">Artista: ${this.artista}</p>\n`;  
        html += `<p class="album-id">Código: ${this.id}</p>\n`;
        html += `<p class="track-list-title">Pistas:</p>\n`;

        html += `<ul class="track-list">`;
        this.pistas.forEach((pista, index) => {
            const duracionFormateada = formatearDuracion(pista.duracion);
            
            let duracionMayor = ''; 
            if (pista.duracion > 180) {
                duracionMayor = 'highlight'; 
            }

            html += `<li class="track-item">${index + 1}. ${pista.nombre}  <span class="${duracionMayor}">${duracionFormateada}</span></li>\n`;
        });
        html += `</ul>`;
        html += `</div>\n`;
        html += `</div>`;
        
        return html;
    }
}


function validarString(msg){
    let str, datoValido = true;

    do{
        str = prompt(msg);
        //Valido que no haya apretado cancel o dejar vacio
        if(str === null || str.trim() === ""){
            alert("Complete el campo");
            datoValido = false;
        }else{
            datoValido = true;
        }
    }while(!datoValido);
    //Devuelvo el dato si esta bien
    return str;
}

function artista(msg) {
    return validarString(msg); 
}

function portada(msg){
    return validarString(msg); 
}

let numUnico = [];
function validarId(msg) {
    let num, datoValido = true;

    do {
        num = prompt(msg);

        // Verifico que sea número, no esté vacío, y lo convierto a entero
        if (isNaN(num) || num.trim() === "") { 
            alert("Ingrese solo números");
            datoValido = false;
        } else {
            num = parseInt(num); // Convierto a número entero para las comparaciones
            
            // Verifico si el número ya existe en los discos cargados o en numUnico
            const existeEnDiscos = discos.some(album => album.id === num);
            if (num < 1 || num > 999) {
                alert("Ingrese un número entre 1 y 999");
                datoValido = false;
            } else if (existeEnDiscos || numUnico.includes(num)) { // Verifico en ambos arrays
                alert("Ingrese otro número, ya ha ingresado este");
                datoValido = false;
            } else {
                datoValido = true;
                numUnico.push(num); // Agrego el número único al array
            }
        }
    } while (!datoValido);

    return num;
}

function validarDuracion(msg) {
    let duracion, datoValido = true;

    do {
        duracion = prompt(msg);

        if (isNaN(duracion) || duracion.trim() === "" || duracion <= 0 || duracion > 7200) {
            alert("Por favor, ingrese una duración válida entre 1 y 7200 segundos.");
            datoValido = false;
        } else {
            datoValido = true;
        }
    } while (!datoValido);
    
    return duracion;
}

function pistas (){
    let canciones = [];
    let agregarOtra = true;

    while(agregarOtra){
        let nombre = validarString('Ingrese el nombre de la canción');
        let duracion = validarDuracion('Ingrese la duración de la canción en segundos');
        // Agrego la canción al array de canciones
        canciones.push({"nombre":nombre, "duracion":duracion});

        //Pregunto si quiere agregar otra canción
        let continuar = confirm('¿Desea agregar otra canción?');
        if(!continuar){
            agregarOtra = false;
        }
    }
    return canciones;
}

function formatearDuracion(segundos){
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;

    const MinutosFormateados = '0' + minutos;
    const segundosFormateados = '0' + seg;

    return MinutosFormateados.slice(-2) + ':' + segundosFormateados.slice(-2);
}

