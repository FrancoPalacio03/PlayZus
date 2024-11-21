export function updateCartDisplay() {
    const cartContainer = $("#cart-content");
    cartContainer.empty(); 
    let totalPrice = 0; 

  
    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (existingItems.length > 0) {
        existingItems.forEach((item, index) => { // Incluye el índice para poder eliminar
            const itemPrice = parseFloat(item.price.replace(/[$,]/g, '')); // Eliminar el símbolo de $ y comas
            totalPrice += itemPrice; // Sumar el precio del artículo al total
            
            const cartItemHTML = `
                <div class="info-cart-product">
                    <div class="product-image-container">
                        <img class="product-image" src="${item.coverUrl.replace('t_thumb', 't_cover_big')}" alt="${item.name}">
                    </div>
                    <div class="titulo-producto-container">
                        <p class="titulo-producto-carrito">${item.name}</p>
                    </div>
                    <div class="price_close_container">
                        <span class="precio-producto-carrito">$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(itemPrice)}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-close cursor-pointer" data-title="${item.name}" data-index="${index}">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            `;
            cartContainer.append(cartItemHTML);
        });

        $(".cart-empty").hide(); // Ocultar mensaje de carrito vacío
        $(".cart-total").removeClass("hidden"); // Mostrar total
        $(".total-pagar").text(`$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(totalPrice)}`); // Mostrar el total acumulado
        $(".sale-btn-container").removeClass("hidden"); // Mostrar botón de venta

        // Agregar evento de clic a los íconos de eliminación
        $(".icon-close").on("click", function() {
            const index = $(this).data("index"); // Obtener el índice del artículo a eliminar
            existingItems.splice(index, 1); // Eliminar el artículo del array
            localStorage.setItem("cartItems", JSON.stringify(existingItems)); // Actualizar localStorage
            updateCartDisplay(); // Volver a renderizar el carrito
        });
    } else {
        $(".cart-total").addClass("hidden"); // Ocultar total
        $(".sale-btn-container").addClass("hidden"); // Ocultar botón de venta
    }
}
