// Fecha de la boda: (año, mes - 1, día, hora, minuto)
// Los meses empiezan en 0, así que diciembre = 11
const boda = new Date(2025, 11, 5, 16, 0);

function actualizar() {
  const resto = Math.max(0, boda - new Date());
  document.getElementById('d').textContent = Math.floor(resto / 86400000);
  document.getElementById('h').textContent = Math.floor(resto / 3600000) % 24;
  document.getElementById('m').textContent = Math.floor(resto / 60000) % 60;
  document.getElementById('s').textContent = Math.floor(resto / 1000) % 60;
}

actualizar();
setInterval(actualizar, 1000);