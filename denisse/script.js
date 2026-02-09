let intentos = 0;
const letraCompleta = "llegué borrachoooo de amooooor\ncomo todas las noches";
let index = 0;
let lluvia;

function si() {
  document.getElementById("pantalla1").style.display = "none";
  document.getElementById("pantalla2").style.display = "block";

  setTimeout(() => {
    document.getElementById("pantalla2").style.display = "none";
    document.getElementById("pantalla3").style.display = "block";

    document.getElementById("musica").play();
    iniciarCorazones();
    escribirLetra();
  }, 3000);
}

function escribirLetra() {
  if (index < letraCompleta.length) {
    document.getElementById("letra").innerHTML +=
      letraCompleta[index] === "\n" ? "<br>" : letraCompleta[index];
    index++;
    setTimeout(escribirLetra, 120);
  } else {
    // cuando termina la letra, pasa a pantalla final
    setTimeout(final, 2500);
  }
}

function iniciarCorazones() {
  lluvia = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (2 + Math.random() * 3) + "s";
    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

function final() {
  clearInterval(lluvia);
  document.getElementById("pantalla3").style.display = "none";
  document.getElementById("pantalla4").style.display = "block";
}

function no() {
  intentos++;
  const mensajes = [
    "¿segura? ",
    "esto ya estaba escrito ",
    "no aceptamos negativas",
    "ok pero… be my valentin "
  ];
  alert(mensajes[intentos % mensajes.length]);
}


