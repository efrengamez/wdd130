let intentos = 0;

function si() {
  document.getElementById("pantalla1").style.display = "none";
  document.getElementById("pantalla2").style.display = "block";
}

function continuar() {
  document.getElementById("pantalla2").style.display = "none";
  document.getElementById("pantalla3").style.display = "block";

  const musica = document.getElementById("musica");
  musica.play();
}

function no() {
  intentos++;

  const mensajes = [
    "¿segura? 👀",
    "piénsalo otra vez 😌",
    "ándale di que sí",
    "ok pero… be my valentin 💗"
  ];

  alert(mensajes[intentos % mensajes.length]);
}
