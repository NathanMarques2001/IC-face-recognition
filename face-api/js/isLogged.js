document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  const userId = params.get('id');
  const euclideanDistance = params.get('euclideanDistance');

  if (username && userId && euclideanDistance) {
    document.getElementById('username').innerHTML = `Bem-vindo, ${username}!`;
    document.getElementById('user-id').innerHTML = `Seu ID é: ${userId}`;
    document.getElementById('user-euclideanDistane').innerHTML = `Distância euclidiana: ${euclideanDistance}`;
  }

});