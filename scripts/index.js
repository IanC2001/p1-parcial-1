'use strict';

let discos = []

// Cargo los discos desde el JSON
fetch('discos.json')
  .then(response => response.json())
  .then(data => {
    discos = data;
    console.log('Discos cargados:', discos); 
});

function cargar() {
    const nombreDisco = validarString('Ingrese el nombre del disco');
    const artista = validarString('Ingrese el nombre del artista');   
    const portada = validarString('Ingrese un link de una portada');
    const id = validarId('Ingrese un código único para el album');
    const pistasAlbum = pistas();
    
    //Creo una instancia de Album
    const nuevoAlbum = new Album(nombreDisco, artista, id, portada, pistasAlbum);   
    
    //Agregar el nuevo álbum al array de discos
    discos.push(nuevoAlbum);
}


function mostrar() {
    const discoDiv = document.getElementById('discos'); // Aquí está el cambio
    discoDiv.innerHTML = '';

    // Verifica si hay discos cargados
    if (discos.length > 0) {
        discos.forEach(disco => {            
            const album = new Album(disco.nombre, disco.artista, disco.id, disco.portada, disco.pistas);
            discoDiv.innerHTML += album.toHTML(); // Muestra cada disco
        });
    } else {
        alert("No hay discos para mostrar.");
    }
}

