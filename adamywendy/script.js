/* Personaliza estos datos: fecha, lugar, enlaces, fotos y audio. */
const CONFIG = {
  // Fecha en formato YYYY-MM-DDTHH:MM:SS. Cambia la zona horaria si hace falta.
  weddingDate: "2027-01-01T17:00:00",
  dateLabel: "FECHA POR CONFIRMAR",

  ceremony: {
    date: "Fecha por confirmar",
    time: "Hora por confirmar",
    place: "Lugar por confirmar"
  },

  reception: {
    date: "Fecha por confirmar",
    time: "Hora por confirmar",
    place: "Lugar por confirmar"
  },

  mapUrl: "",
  mapEmbedUrl: "",
  giftUrl: "",
  rsvpUrl: "",
  musicUrl: "",

  // Ejemplo: ["fotos/1.jpg", "fotos/2.jpg"]
  photos: []
};

const $ = (id) => document.getElementById(id);
const musicScreen = $("musicScreen");
const audio = $("backgroundMusic");

function enterInvitation(withMusic) {
  musicScreen.classList.add("is-hidden");

  if (withMusic) {
    playMusic();
  }
}

function playMusic() {
  if (!CONFIG.musicUrl) return;

  if (audio.src !== new URL(CONFIG.musicUrl, document.baseURI).href) {
    audio.src = CONFIG.musicUrl;
  }

  audio.play().catch(() => {});
}

$("withMusic").addEventListener("click", () => enterInvitation(true));
$("withoutMusic").addEventListener("click", () => enterInvitation(false));

$("musicToggle").addEventListener("click", () => {
  if (!CONFIG.musicUrl) return;

  if (audio.paused) {
    playMusic();
  } else {
    audio.pause();
  }
});

function updateCountdown() {
  const target = new Date(CONFIG.weddingDate).getTime();
  const remaining = target - Date.now();

  if (!Number.isFinite(target) || remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      $(id).textContent = "00";
    });
    return;
  }

  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };

  Object.entries(values).forEach(([id, value]) => {
    $(id).textContent = String(value).padStart(2, "0");
  });
}

function setText(id, value) {
  $(id).textContent = value;
}

setText("dateLine", CONFIG.dateLabel);
setText("ceremonyDate", CONFIG.ceremony.date);
setText("ceremonyTime", CONFIG.ceremony.time);
setText("ceremonyPlace", CONFIG.ceremony.place);
setText("partyDate", CONFIG.reception.date);
setText("partyTime", CONFIG.reception.time);
setText("partyPlace", CONFIG.reception.place);

updateCountdown();
setInterval(updateCountdown, 1000);

if (CONFIG.mapUrl) {
  $("mapLink").href = CONFIG.mapUrl;
} else {
  $("mapLink").hidden = true;
}

if (CONFIG.mapEmbedUrl) {
  const frame = document.createElement("iframe");
  frame.src = CONFIG.mapEmbedUrl;
  frame.loading = "lazy";
  frame.title = "Mapa del lugar del evento";
  frame.referrerPolicy = "no-referrer-when-downgrade";
  $("mapFrame").replaceChildren(frame);
}

if (CONFIG.giftUrl) {
  $("giftLink").href = CONFIG.giftUrl;
} else {
  $("giftLink").hidden = true;
}

if (CONFIG.rsvpUrl) {
  $("rsvpLink").href = CONFIG.rsvpUrl;
} else {
  $("rsvpLink").hidden = true;
}

const track = $("galleryTrack");

if (CONFIG.photos.length) {
  track.replaceChildren(
    ...CONFIG.photos.map((src, index) => {
      const image = document.createElement("img");
      image.className = "gallery-item";
      image.src = src;
      image.alt = `Foto ${index + 1} de Wendy y Adam`;
      image.loading = "lazy";
      return image;
    })
  );
} else {
  track.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.textContent = `Agrega foto ${index + 1}`;
  });
}

function moveGallery(direction) {
  const item = track.querySelector(".gallery-item");

  if (item) {
    track.scrollBy({
      left: direction * (item.getBoundingClientRect().width + 15),
      behavior: "smooth"
    });
  }
}

$("prevPhoto").addEventListener("click", () => moveGallery(-1));
$("nextPhoto").addEventListener("click", () => moveGallery(1));