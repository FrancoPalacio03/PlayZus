import { updateCartDisplay } from '../views/renderGamesCart.js';
import { renderGames } from '../views/renderCards.js';
import { getGamesBySearch } from '../services/gameController.js';
import { getGameById } from '../services/gameController.js';
import priceGenerator from '../tools/priceGenerator.js'

const spinner = document.getElementById('loading-spinner');


function showSpinner() {
  spinner.style.display = 'block';
}


function hideSpinner() {
  spinner.style.display = 'none';
}


$(document).ready(function () {

    function checkWindowWidth() {
        const windowWidth = $(window).width();
        if (windowWidth <= 768){
            $("#search-bar-icon-container").on("click", function(event) {
                event.stopPropagation(); 
                $("#search-bar-container").css("display", "flex");
            });
        
            $("#searchBar").on("keydown", function(event) {
                if (event.key === "Enter") {
                    $("#search-bar-container").css("display", "none");
                }
            });
            
            $(document).on("click", function(event) {
                // Si el clic NO fue en el icono ni en la barra de búsqueda
                if (!$(event.target).closest("#search-bar-icon-container").length && 
                    !$(event.target).closest("#search-bar-container").length) {
                    $("#search-bar-container").css("display", "none");
                }
            });
        }
        else {
            $("#search-bar-container").css("display", "flex");
        }}

    checkWindowWidth();
    $(window).on("resize", checkWindowWidth);


  $('#searchBar').on('keydown', async function (event) {
      if (event.key === 'Enter') {
          const searchQuery = $(this).val().trim();
          if (searchQuery) {
              document.getElementById('cards-container').innerHTML = '';
              showSpinner();

              try {
                  const noResults = document.getElementById('no-results');
                  const games = await getGamesBySearch(searchQuery);
                  if (games.length > 0) {
                      noResults.style.display = 'none';
                  } else {
                      noResults.style.display = 'block';
                  }
                  renderGames(games);
              } catch (error) {
                  console.error('Error al realizar la búsqueda:', error);
              } finally {
                  hideSpinner();
              }
          }
      }
  });

  
  $("#cart-container").on("click", function(event) {
      event.stopPropagation(); 
      updateCartDisplay();
      $(".container-cart-products").toggleClass("hidden-cart");
  });

  $(document).on("click", function(event) {
      if (!$(event.target).closest(".container-cart-products, #cart-container").length) {
          if (!$(".container-cart-products").hasClass("hidden-cart")) {
              $(".container-cart-products").addClass("hidden-cart");
          }
      }
  });

  $(document).on("click", "#history-container", async function() {
    const visitedGames = JSON.parse(localStorage.getItem("visitedGames")) || [];
    
    if (visitedGames.length === 0) {
        alert("No hay juegos visitados.");
        return;
    }

    document.getElementById('cards-container').innerHTML = '';
    showSpinner(); 

    try {
        const reversedVisitedGames = visitedGames.reverse();
        const games = await Promise.all(visitedGames.map(id => getGameById(id))); 
        
        const formattedGames = games.flat().map(game => ({
            id: game.id,
            name: game.name,
            cover: game.cover,
            rating: game.rating,
            price: priceGenerator(), 
        }));
        
        renderGames(formattedGames);
    } catch (error) {
        console.error('Error al cargar los juegos visitados:', error);
    } finally {
        hideSpinner(); 
    }
});

});

