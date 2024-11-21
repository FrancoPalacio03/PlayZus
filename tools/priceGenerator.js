function priceGenerator() {
    const min = 6.99;
    const max = 60.99;

    // Genera un valor aleatorio entre min y max
    let precioAleatorio = (Math.random() * (max - min) + min).toFixed(2);
    
    // Asegúrate de devolver el valor correcto como número flotante
    return parseFloat(precioAleatorio);
}

export default priceGenerator;
