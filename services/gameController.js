
export async function getGames({ sortBy, platform, genre, category, offset }) {
  try {
      const response = await $.ajax({
          url: 'http://localhost:3000/games',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ sortBy, platform, genre, category, offset }), // Añadir offset al request
      });
      return response;
  } catch (error) {
      console.error('Error al obtener los juegos:', error);
      throw error; // Propagar el error si ocurre
  }
}


export async function getGameById(id) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: 'http://localhost:3000/games',  // URL de la API del servidor
          method: 'POST',  // Cambiar a POST
          contentType: 'application/json',  // Especificar el tipo de contenido
          data: JSON.stringify({ id }),
          success: function(data) {
              resolve(data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Error al obtener el juego:', textStatus, errorThrown);
              reject(errorThrown);
          }
      });
  });
}

export async function getGamesBySearch(searchQuery) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/games',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ search: searchQuery }), // Pasa el término de búsqueda
        success: function(data) {
          resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error al obtener los juegos:', textStatus, errorThrown);
          reject(errorThrown);
        }
      });
    });
  }
  

// titulo, valoracion 
// enum --> crearlo
// gender --> ID --> endpoint gender {id} --> name
// plataform --> ID --> endpoint plataform {id} --> name
// filtrado de (populares, mas valorados, lanzamientos) 
    // dentro de la query
    // en el back del frontend con JS
