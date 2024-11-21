import priceGenerator from '../tools/priceGenerator.js'
import ratingConversor from '../tools/ratingGenerator.js'


export function renderGames(games, append = false) {
  const gamesContainer = document.getElementById('cards-container');

  // Si append es false, limpiar el contenedor antes de agregar los nuevos juegos
  if (!append) {
    gamesContainer.innerHTML = '';
  }

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('card', 'zoom-image');
    gameCard.setAttribute('data-id', game.id);

    gameCard.innerHTML = `
      <img src="${game.cover.url.replace('t_thumb', 't_1080p')}" class="card-img">
      <div class="game-info-container">
        <div class="left-game--container">
          <h4 class="card-description">${game.name}</h4>
          <p class="card-description">${ratingConversor(game.rating)}</p>
        </div>
        <h4 class="card-description">$${priceGenerator()}</h4>
      </div>
    `;

    gamesContainer.appendChild(gameCard);
  });
}

