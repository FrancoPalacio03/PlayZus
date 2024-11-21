import { isEmptyField, isValidEmail } from '../tools/validations.js';

function confirmCancel() {
  const confirmMessage = "¿Desea volver a la página anterior?";
  if (confirm(confirmMessage)) {
    history.go(-1);
  }
}

function resetForm() {
  document.getElementById('survey-form').reset();
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('survey-form');
  const gameName = getQueryParam('name'); 

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comments = document.getElementById('comment').value;

    if (isEmptyField(name) || isEmptyField(email) || !isValidEmail(email)) {
      alert('Todos los campos obligatorios deben ser completados.');
    } else {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(name + ' te recomienda el juego ' + gameName)}&body=${encodeURIComponent(comments)}`;
      window.open(mailtoLink, '_self'); 
    }
  });

  const cancelButton = document.querySelector('button[type="button"]');
  cancelButton.addEventListener('click', confirmCancel);

  const resetButton = document.querySelector('button[type="reset"]');
  resetButton.addEventListener('click', resetForm);
});
