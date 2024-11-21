// Imports
import { getGames } from "../services/gameController.js";
import { renderGames } from "../views/renderCards.js";
import { renderNavbar } from "../views/navbar.js";

// Variables de filtros y contenedores
const filtersHTML = renderNavbar();
const desktopFilterContainer = document.getElementById("categories-container");
const filterTrigger = document.getElementById("filters-popup");
const mobileFilterContainer = document.querySelector(".popup-content");

// Variables para controlar filtros seleccionados
let selectedPlatform = null;
let selectedCategory = null;
let selectedGenre = null;
let offset = 0; 

// Spinner y botón de "View More"
const spinner = document.getElementById("loading-spinner");
const viewMoreButton = document.querySelector(".more-btn");

// Funciones de Spinner
function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

// Manejo de la ventana según el tamaño (móvil o escritorio)
$(document).ready(function () {
  function checkWindowWidth() {
    const windowWidth = $(window).width();
    if (windowWidth <= 768) {
      desktopFilterContainer.innerHTML = "";
      mobileFilterContainer.innerHTML = filtersHTML;

      // Listener para el filtro móvil
      filterTrigger.removeEventListener("click", toggleMobileFilter);
      filterTrigger.addEventListener("click", toggleMobileFilter);

      // Evitar cierre del popup al hacer clic dentro
      mobileFilterContainer.removeEventListener("click", stopPropagation);
      mobileFilterContainer.addEventListener("click", stopPropagation);
    } else {
      desktopFilterContainer.innerHTML = filtersHTML;
      mobileFilterContainer.innerHTML = "";
    }
  }

  // Alternar visibilidad del filtro móvil
  function toggleMobileFilter(event) {
    event.preventDefault();
    mobileFilterContainer.classList.toggle("active");
  }

  // Evitar propagación del clic en el popup
  function stopPropagation(event) {
    event.stopPropagation();
  }

  // Chequear el tamaño de la ventana y asignar eventos
  checkWindowWidth();
  $(window).on("resize", checkWindowWidth);

  // Cerrar popup si se hace clic fuera
  document.addEventListener("click", function (event) {
    if (!filterTrigger.contains(event.target) && !mobileFilterContainer.contains(event.target)) {
      mobileFilterContainer.classList.remove("active");
    }
  });
});

// Inicializar la aplicación cargando los juegos
async function init() {
  showSpinner();
  try {
    const games = await getGames({
      sortBy: "recent",
      platform: selectedPlatform,
      category: selectedCategory,
      genre: selectedGenre,
      offset: offset,
    });
    renderGames(games); // Carga inicial
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  } finally {
    hideSpinner();
  }
}

// Cargar más juegos
async function loadMoreGames() {
  showSpinner();
  try {
    offset += 10; // Incrementar offset para cargar más juegos
    const moreGames = await getGames({
      sortBy: "recent",
      platform: selectedPlatform,
      category: selectedCategory,
      genre: selectedGenre,
      offset: offset,
    });
    renderGames(moreGames, true); // Usar append = true para no sobrescribir
  } catch (error) {
    console.error("Error al cargar más juegos:", error);
  } finally {
    hideSpinner();
  }
}

document.addEventListener("DOMContentLoaded", init);
viewMoreButton.addEventListener("click", loadMoreGames);

// Funciones de actualización de juegos según filtros
async function updateGames(sortBy) {
  document.getElementById("cards-container").innerHTML = "";
  showSpinner();
  try {
    const games = await getGames({
      sortBy: sortBy,
      platform: selectedPlatform,
      category: selectedCategory,
      genre: selectedGenre,
    });
    renderGames(games);
  } catch (error) {
    console.error("Error al actualizar los juegos:", error);
  } finally {
    hideSpinner();
  }
}

// Manejo de eventos para las tarjetas de juegos
$(document).ready(function () {
  $("#cards-container").on("click", ".card", function () {
    const card = $(this);
    const productId = card.data("id");
    window.location.href = `../html/gameInfo.html?id=${productId}`;
  });

  // Manejo de clics en botones de plataforma
  $(".categories-buttons[id_platform]").on("click", async function () {
    const platformId = $(this).attr("id_platform");
    if (selectedPlatform === platformId) {
      selectedPlatform = null;
      $(this).removeClass("selected");
    } else {
      selectedPlatform = platformId;
      $(".categories-buttons[id_platform]").removeClass("selected");
      $(this).addClass("selected");
    }
    await updateGames("top_rated");
  });

  // Manejo de clics en categorías
  $(".dropdown-item[enum-category]").on("click", async function () {
    const categoryId = $(this).attr("enum-category");
    if (selectedCategory === categoryId) {
      selectedCategory = null;
      $(this).removeClass("selected");
    } else {
      selectedCategory = categoryId;
      $(".dropdown-item[enum-category]").removeClass("selected");
      $(this).addClass("selected");
    }
    await updateGames("top_rated");
  });

  // Manejo de clics en géneros
  $(".dropdown-item[gender_id]").on("click", async function () {
    const genreId = $(this).attr("gender_id");
    if (selectedGenre === genreId) {
      selectedGenre = null;
      $(this).removeClass("selected");
    } else {
      selectedGenre = genreId;
      $(".dropdown-item[gender_id]").removeClass("selected");
      $(this).addClass("selected");
    }
    await updateGames("top_rated");
  });

  // Manejo de toggles de dropdowns
  const toggleButtons = document.querySelectorAll(".toggleButton");
  const dropdownMenus = document.querySelectorAll(".dropdownMenu");
  toggleButtons.forEach((toggleButton, index) => {
    toggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      const dropdownMenu = dropdownMenus[index];
      if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
        dropdownMenu.style.display = "flex";
      } else {
        dropdownMenu.style.display = "none";
      }
    });
  });
});

// Botones de filtro rápido (popular, recent, rating)
$("#popular-btn").on("click", async function () {
  await updateGames("popular");
});

$("#releases-btn").on("click", async function () {
  await updateGames("recent");
});

$("#rating-btn").on("click", async function () {
  await updateGames("top_rated");
});
