let intentos = 0;

function si() {
  document.getElementById("pregunta").style.display = "none";
  document.getElementById("invitacion").style.display = "block";
}

function no() {
  intentos++;

  const mensajes = [
    "mmm… ¿segura? 👀",
    "piénsalo bien 😌",
    "un elotito no se rechaza",
    "ok pero… be my valentin? 💗"
  ];

  document.getElementById("texto").innerHTML =
    mensajes[intentos % mensajes.length];
}


