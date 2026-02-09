let intentos = 0;

// Texto de la canción
const letraCompleta = "llegué borrachoooo de amooooor\ncomo todas las noches";
let index = 0;

function si() {
  // Pantalla 1 -> 2
  document.getElementById("pantalla1").style.display = "none";
  document.getElementById("pantalla2").style.display = "block";

  // Después de 3 segundos pasa sola a la pantalla 3
  setTimeout(() => {
    document.getElementById("pantalla2").style.display = "none";
    document.getElementById("pantalla3").style.display = "block";

    // Empieza la música
    document.getElementById("musica").play();

    // Empieza a escribir la letra
    escribirLetra();
  }, 3000);
}

function escribirLetra() {
  if (index < letraCompleta.length) {
    document.getElementById("letra").innerHTML +=
      letraCompleta[index] === "\n" ? "<br>" : letraCompleta[index];
    index++;

    // Velocidad de escritura (ajustable)
    setTimeout(escribirLetra, 120);
  }
}

function no() {
  intentos++;

  const mensajes = [
    "¿segura? 👀",
    "ándale di que sí 😌",
    "esto ya estaba escrito",
    "ok pero… be my valentin 💗"
  ];

  alert(mensajes[intentos % mensajes.length]);
}

