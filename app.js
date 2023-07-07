// Objetivo: Crear una tabla con los personajes de Rick and Morty

// Obtener referencia al elemento de la tabla en HTML
const tableBody = document.getElementById('table-body');

// Realizar la solicitud a la API de Rick and Morty
fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())//Convertir la respuesta a JSON
  .then(data => {
    // Iterar sobre los resultados de la API
    data.results.forEach(character => {
      // Crear una nueva fila en la tabla
      const row = document.createElement('tr');

      // Crear una celda para el nombre del personaje
      const nameCell = document.createElement('td');
      nameCell.textContent = character.name;
      row.appendChild(nameCell);

      // Crear una celda para las características del personaje
      const statusCell = document.createElement('td');
      statusCell.textContent = `${character.status} - ${character.species}`;
      row.appendChild(statusCell);

      // Crear una celda para la primera imagen del personaje
      const image1Cell = document.createElement('td');
      const image1 = document.createElement('img');
      image1.src = character.image;
      image1.alt = character.name;
      image1Cell.appendChild(image1);
      row.appendChild(image1Cell);

      //Buscar en la API de Rick and Morty la información del personaje por nombre y verficiar si hay otro. Posteriormente, agregar la segunda imagen a la tabla. 

      fetch(`https://rickandmortyapi.com/api/character/?name=${character.name}`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 1) {
            // Crear una celda para la segunda imagen del personaje
            const image2Cell = document.createElement('td');//Herramienta HTML para crear una celda
            const image2 = document.createElement('img');//Herramienta HTML para crear una imagen
            image2.src = data.results[1].image;
            image2.alt = data.results[1].name;
            image2Cell.appendChild(image2);
            row.appendChild(image2Cell);
          } else {
            // Crear una celda vacía si no hay una segunda imagen
            const emptyCell = document.createElement('td');
            row.appendChild(emptyCell);
          }

          // Agregar la fila a la tabla
          tableBody.appendChild(row);
        }
      );
    });
  })
  .catch(error => console.log(error));

