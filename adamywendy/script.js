// Cambia estos valores con la información de Wendy y Adam.
const CONFIG = {
  weddingDate: "2027-07-18T17:00:00", // Ejemplo: "2027-06-20T17:00:00"
  dateLabel: "18-07-27",

  ceremony: {
    date: "18-07-27",
    time: "3:00 P.M.",
    place: "Parroquia De El Sagrado Corazon"
  },

  reception: {
    date: "18-07-27",
    time: "7:00 P.M.",
    place: "Quinta San Nicolas"
  },

  mapUrl: "https://maps.app.goo.gl/7KGRY8JcamC9PMpf6",
  mapEmbedUrl: "mapEmbedUrl: "https://www.google.com/maps?q=25.7517239,-100.2912136&output=embed",",
  giftUrl: "",
  rsvpUrl: "",

  musicUrl: "audio/musica.mp3",
  storyPhoto: "fotos/pareja.jpg",

  // Cambia estas rutas por los nombres de tus fotos.
  photos: [
    "fotos/1.jpg",
    "fotos/2.jpg",
    "fotos/3.jpg"
  ]
};

const byId = (id) => document.getElementById(id);
const audio = byId("weddingMusic");
const welcome = byId("welcome");

function setText(id, text) {
  byId(id).textContent = text;
}

function updateCountdown() {
  const target = new Date(CONFIG.weddingDate).getTime();
  const ids = ["days", "hours", "minutes", "seconds"];

  if (!CONFIG.weddingDate || !Number.isFinite(target)) {
    ids.forEach((id) => setText(id, "--"));
    return;
  }

  const remaining = target - Date.now();

  if (remaining <= 0) {
    ids.forEach((id) => setText(id, "00"));
    return;
  }

  const values = [
    Math.floor(remaining / 86400000),
    Math.floor((remaining % 86400000) / 3600000),
    Math.floor((remaining % 3600000) / 60000),
    Math.floor((remaining % 60000) / 1000)
  ];

  ids.forEach((id, index) => {
    setText(id, String(values[index]).padStart(2, "0"));
  });
}

function startMusic() {
  if (!CONFIG.musicUrl) return;

  if (audio.src !== new URL(CONFIG.musicUrl, document.baseURI).href) {
    audio.src = CONFIG.musicUrl;
  }

  audio.play().catch(() => {});
}

byId("enterWithMusic").addEventListener("click", () => {
  welcome.classList.add("is-hidden");
  startMusic();
});

byId("enterSilent").addEventListener("click", () => {
  welcome.classList.add("is-hidden");
});

byId("musicControl").addEventListener("click", () => {
  if (!CONFIG.musicUrl) return;

  if (audio.paused) {
    startMusic();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  byId("musicControl").setAttribute("aria-label", "Pausar música");
});

audio.addEventListener("pause", () => {
  byId("musicControl").setAttribute("aria-label", "Reproducir música");
});

setText("dateLabel", CONFIG.dateLabel);
setText("ceremonyDate", CONFIG.ceremony.date);
setText("ceremonyTime", CONFIG.ceremony.time);
setText("ceremonyPlace", CONFIG.ceremony.place);
setText("receptionDate", CONFIG.reception.date);
setText("receptionTime", CONFIG.reception.time);
setText("receptionPlace", CONFIG.reception.place);

byId("storyImage").src = CONFIG.storyPhoto;

updateCountdown();
setInterval(updateCountdown, 1000);

if (CONFIG.mapUrl) {
  byId("mapLink").href = CONFIG.mapUrl;
} else {
  byId("mapLink").hidden = true;
}

if (CONFIG.mapEmbedUrl) {
  const map = document.createElement("iframe");
  map.src = CONFIG.mapEmbedUrl;
  map.loading = "lazy";
  map.title = "Mapa del lugar de la celebración";
  map.referrerPolicy = "no-referrer-when-downgrade";
  byId("mapBox").replaceChildren(map);
}

if (CONFIG.giftUrl) {
  byId("giftLink").href = CONFIG.giftUrl;
} else {
  byId("giftLink").hidden = true;
}

if (CONFIG.rsvpUrl) {
  byId("rsvpLink").href = CONFIG.rsvpUrl;
} else {
  byId("rsvpLink").hidden = true;
}

const gallery = byId("galleryTrack");

if (CONFIG.photos.length) {
  gallery.replaceChildren(
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
  gallery.replaceChildren(
    ...[1, 2, 3].map((number) => {
      const placeholder = document.createElement("div");
      placeholder.className = "gallery-item gallery-placeholder";
      placeholder.textContent = `Agrega foto ${number}`;
      return placeholder;
    })
  );
}

function moveGallery(direction) {
  const item = gallery.querySelector(".gallery-item");

  if (item) {
    gallery.scrollBy({
      left: direction * (item.getBoundingClientRect().width + 14),
      behavior: "smooth"
    });
  }
}

byId("previousPhoto").addEventListener("click", () => moveGallery(-1));
byId("nextPhoto").addEventListener("click", () => moveGallery(1));