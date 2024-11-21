export function isEmptyField(value) {
    return !value || value.trim() === '';
  }

export function isValidText(value) {
    const lettersRegex = /^[a-zA-Z]+$/;
    return lettersRegex.test(value);
}

export function isValidDate(value) {
    const dateParts = value.split("-");
    if (dateParts.length === 3) {
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        return dateRegex.test(formattedDate);
    }
    return false;
}

export function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function generateFieldsSummary(fields) {
    let summary = "Datos del formulario:\n";

    fields.forEach(field => {
        const fieldName = field.getAttribute("name");
        const fieldValue = field.value.trim();

        summary += `${fieldName}: ${fieldValue}\n`;
    });

    return summary;
}

