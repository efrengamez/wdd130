let intentos = 0;

function si() {
  document.getElementById("texto").innerHTML =
    "sabía que dirías que sí 🤍<br>ya somos valentineeee ✨";
}

function no() {
  intentos++;

  const texto = document.getElementById("texto");

  const mensajes = [
    "¿segura? 🥺",
    "piénsalo otra vez, sí? 👀",
    "mmm… creo que te equivocaste 😌",
    "ok, pero… ¿quieres ser mi valentineeee? 🤍"
  ];

  texto.innerHTML = mensajes[intentos % mensajes.length];
}
