import ratingConversor from '../tools/ratingGenerator.js'
import priceGenerator from '../tools/priceGenerator.js'


export function renderGameDetail(container, gamedata) {

    // Crear el HTML para los géneros
    const genresHtml = gamedata.genres.map(genre => `<span>${genre.name}</span></br>`).join('');

    // Crear el HTML para las plataformas
    const platformsHtml = gamedata.platforms.map(platform => `<span>${platform.name}</span></br>`).join('');

    // Crear el HTML para las compañías
    const companiesHtml = gamedata.involved_companies.map(company => `<span>${company.company.name}</span></br>`).join('');

    let gameDetail = `

        <div class="left-gamedata-container">
            <img class="cover-container" src="${gamedata.cover.url.replace('t_thumb', 't_1080p')}" alt="${gamedata.name}">
            <div class="game-info-container">
                <div class="left-game-info-container">
                    <h2 class="card-description">${gamedata.name}</h2>
                    <div>
                        <p class="card-description">${ratingConversor(gamedata.rating)}</p>
                        <span class="material-symbols-outlined" id="star-symbol">star_rate</span>
                    </div>
                </div>
                <h3 class="card-description" id="price">$${priceGenerator()}</h3>
            </div>
        </div>

        <div class="right-gamedata-container">
            <div class="game-video-container">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${gamedata.videos[0].video_id}?si=KYiIkmYDDDP9tQP3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="technical-sheet-container">
                <div>
                    <h2>GENRES</h3>
                    ${genresHtml}
                </div>
                <div>
                    <h2>PLATFORMS</h3>
                    ${platformsHtml}
                </div>
                <div>
                    <h2>COMPANIES</h3>
                    ${companiesHtml}
                </div>
            </div>
            <div class="description-container">
                <h3>About of "${gamedata.name}"</h3>
                <span>${gamedata.summary}</span>
            </div>
            <div class="button-gamedata-container">
                <button class="action-buttons" id="share-button">
                    <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M384,336a63.78,63.78,0,0,0-46.12,19.7l-148-83.27a63.85,63.85,0,0,0,0-32.86l148-83.27a63.8,63.8,0,1,0-15.73-27.87l-148,83.27a64,64,0,1,0,0,88.6l148,83.27A64,64,0,1,0,384,336Z"></path></svg>
                    <span class="label">Share</span>
                </button>
                <button class="action-buttons" id="cart-add-button">
                    <svg viewBox="0 0 16 16" class="bi bi-cart-check" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg>
                    <p class="label">Add Cart</p>
                </button>
            </div>
        </div>
    `;

    container.innerHTML += gameDetail;
}