import { getGameById } from '../services/gameController.js';
import { renderGameDetail } from '../views/gameInfo.js';

let gameData;

$(document).ready(function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const gameId = getQueryParam('id');
    const mainContainer = document.getElementById('main-container');

    if (gameId) {
        // Almacenar el ID del juego en el historial
        const visitedGames = JSON.parse(localStorage.getItem("visitedGames")) || [];
        if (!visitedGames.includes(gameId)) {
            visitedGames.push(gameId);
            localStorage.setItem("visitedGames", JSON.stringify(visitedGames));
        }

        getGameById(gameId).then(data => {
            gameData = data[0];
            renderGameDetail(mainContainer, gameData);
            console.log(data);
        }).catch(error => {
            console.error('Error al cargar la información del juego:', error);
        });
    }

    $(document).on("click", "#cart-add-button", function() {
        const gameInfo = {
            name: gameData.name,
            coverUrl: gameData.cover.url,
            price: $(".card-description").eq(2).text()
        };

        const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const itemExists = existingItems.some(item => item.name === gameInfo.name);
        if (itemExists) {
            alert("El juego ya está en el carrito!");
            return;
        }

        existingItems.push(gameInfo);
        localStorage.setItem("cartItems", JSON.stringify(existingItems));
        alert("Juego agregado al carrito!");
    });
});

// Evento para compartir en WhatsApp
$(document).on("click", "#share-button", function() {
    window.location.href = `../html/survey.html?name=${gameData.name}`;
});


