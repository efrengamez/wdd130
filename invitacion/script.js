/* ---------- 1. CONFIGURA AQUÍ TUS DATOS ---------- */
const FECHA_BODA = new Date('2026-12-05T15:00:00');   // 5 dic 2026, 3:00 pm
const WHATSAPP   = '521XXXXXXXXXX';                    // lada + número, sin + ni espacios
const MENSAJE    = 'Hola, confirmo mi asistencia a la boda de Luis y Sinai. Nombre y número de personas: ';

/* ---------- 2. CUENTA REGRESIVA ---------- */
const ids = ['dias','horas','minutos','segundos'].map(id => document.getElementById(id));
function actualizarCuenta(){
  let resto = Math.max(0, FECHA_BODA - new Date());
  const d = Math.floor(resto / 86400000);  resto %= 86400000;
  const h = Math.floor(resto / 3600000);   resto %= 3600000;
  const m = Math.floor(resto / 60000);     resto %= 60000;
  const s = Math.floor(resto / 1000);
  [d,h,m,s].forEach((v,i) => ids[i].textContent = String(v).padStart(2,'0'));
}
actualizarCuenta();
setInterval(actualizarCuenta, 1000);

/* ---------- 3. MÚSICA (play / pausa) ---------- */
const audio = document.getElementById('cancion');
const btnPlay = document.getElementById('btnPlay');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
btnPlay.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});
audio.addEventListener('play',  () => { iconPlay.hidden = true;  iconPause.hidden = false; });
audio.addEventListener('pause', () => { iconPlay.hidden = false; iconPause.hidden = true; });

/* ---------- 4. CARRUSELES (deslizan solos y con el dedo) ---------- */
function iniciarCarrusel(id){
  const cont   = document.getElementById(id);
  const pista  = cont.querySelector('.pista');
  const fotos  = pista.children;
  const puntos = cont.querySelector('.puntitos');
  let actual = 0, pausa = false;

  for (let i = 0; i < fotos.length; i++) puntos.appendChild(document.createElement('span'));
  const marcar = () => [...puntos.children].forEach((p,i) => p.classList.toggle('activo', i === actual));
  marcar();

  pista.addEventListener('scroll', () => {
    actual = Math.round(pista.scrollLeft / pista.clientWidth);
    marcar();
  });
  pista.addEventListener('touchstart', () => pausa = true, {passive:true});
  pista.addEventListener('touchend',   () => setTimeout(() => pausa = false, 3000));

  setInterval(() => {
    if (pausa) return;
    const sig = (actual + 1) % fotos.length;
    pista.scrollTo({left: sig * pista.clientWidth, behavior: 'smooth'});
  }, 3500);
}
iniciarCarrusel('carrusel1');
iniciarCarrusel('carrusel2');

/* ---------- 5. CONFIRMAR ASISTENCIA (WhatsApp) ---------- */
document.getElementById('btnConfirmar').href =
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAJE)}`;