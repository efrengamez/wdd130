let intentos = 0;

function si() {
  document.getElementById("pregunta").style.display = "none";
  document.getElementById("invitacion").style.display = "block";

  const musica = document.getElementById("musica");
  musica.play();
}

function no() {
  intentos++;

  const mensajes = [
    "mmm… ¿segura? 👀",
    "un elotito no se rechaza 🌽",
    "ándale di que sí 😌",
    "ok pero… be my valentin? 💗"
  ];

  alert(mensajes[intentos % mensajes.length]);
}

