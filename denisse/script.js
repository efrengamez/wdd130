let intentos = 0;

function si() {
  document.getElementById("texto").innerHTML =
    "JAJA sabía que sí 🤍<br>entonces ya somos oficialmente 💘";
}

function no() {
  intentos++;

  const mensajes = [
    "mmm… ¿segura? 👀",
    "piénsalo con el corazón 😌",
    "valentín no aceptaría un no",
    "ok pero… be my valentin? 💗"
  ];

  document.getElementById("texto").innerHTML =
    mensajes[intentos % mensajes.length];
}


