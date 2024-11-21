function ratingConversor(valoration) {
    // Convierte la valoración a un rango de 0 a 10
    let points = (valoration / 100) * 10;

    // Redondea el puntaje a un decimal
    return points.toFixed(1);
}

export default ratingConversor;