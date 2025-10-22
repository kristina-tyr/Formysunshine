// Smooth scroll
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('joy').scrollIntoView({ behavior: 'smooth' });
});

// Surprise = confetti hearts
document.getElementById('surpriseBtn').addEventListener('click', () => {
  burstHearts(40);
});

// Rotating quotes
const quotes = [
  "Світ усміхається, коли усміхаєшся ти 🌻",
  "Котик, не забувай пити водичку 💧",
  "Ти смілива. Навіть якщо інколи боїшся — ти все одно смілива 💫",
  "Квіточко, будь до себе ніжною, як до найкрихкішого алмазу 💖",
  "Твій шлях — унікальний. І це прекрасно ✨",
  "Маленькі кроки теж ведуть до великих перемог 🌈",
  "Твоє світло — це моє тепло. Ділися ним завжди ☀️",
  "Ти маєш право відпочити. В будь яку секунду, хвилинку, годину, день, тиждень, місяць та рік) 🫶"
];
const quoteBox = document.getElementById('quoteBox');
document.getElementById('moreBtn').addEventListener('click', () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = q;
  quoteBox.animate([{ transform: 'translateY(4px)', opacity: .6 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 250, easing: 'ease-out' });
});

// Hydrate hint
document.getElementById('hydrateBtn').addEventListener('click', () => {
  const now = new Date();
  const next = new Date(now.getTime() + 60*60*1000);
  alert("Маленьке нагадування: зроби ковток водички 💧\nЯ нагадаю знову через годинку (ментально 😸).");
  console.log("Next-water-reminder:", next.toLocaleString());
});

// Playground cats
const playground = document.getElementById('playground');
const spawnBtn = document.getElementById('spawnBtn');
const clearBtn = document.getElementById('clearBtn');
const catchMsg = document.getElementById('catchMsg');

let kitties = [];
let movers = [];
const kittyFaces = ["😺","😽","😸","😻","😼","😹"];
const moodMsgs = [
  "О, ти впіймала котика настрою! Він каже: все буде чудово 💗",
  "Котик протягнув лапку підтримки 🐾 Я завжди поруч .",
  "Пухнастик шепоче: пауза — теж прогрес 🌿",
  "Киця підморгнула: ти впораєшся! ✨",
  "Мур-мур: подихай 4–4–4-4 і посміхнись 😊"
];

function random(min, max) { return Math.random() * (max - min) + min; }

function makeKitty() {
  const el = document.createElement('div');
  el.className = 'kitty';
  el.textContent = kittyFaces[Math.floor(Math.random()*kittyFaces.length)];
  playground.appendChild(el);

  // random pos
  const bounds = playground.getBoundingClientRect();
  const x = random(10, bounds.width - 40);
  const y = random(10, bounds.height - 40);
  el.style.left = x + 'px';
  el.style.top = y + 'px';

  el.addEventListener('click', () => {
    catchMsg.textContent = moodMsgs[Math.floor(Math.random()*moodMsgs.length)];
    catchMsg.animate([{ opacity:.6 }, { opacity:1 }], { duration: 220 });
    burstHearts(12);
  });

  // move randomly
  const mover = setInterval(() => {
    const bounds = playground.getBoundingClientRect();
    const nx = Math.max(8, Math.min(bounds.width - 36, parseFloat(el.style.left) + random(-60, 60)));
    const ny = Math.max(8, Math.min(bounds.height - 36, parseFloat(el.style.top) + random(-60, 60)));
    el.style.left = nx + 'px';
    el.style.top = ny + 'px';
  }, random(450, 900));

  kitties.push(el);
  movers.push(mover);
}

function clearKitties() {
  kitties.forEach(k => k.remove());
  movers.forEach(m => clearInterval(m));
  kitties = [];
  movers = [];
  catchMsg.textContent = "";
}

spawnBtn.addEventListener('click', () => {
  if (kitties.length) clearKitties();
  for (let i = 0; i < 4; i++) makeKitty();
});

clearBtn.addEventListener('click', clearKitties);

// Hearts
const heartLayer = document.getElementById('heartLayer');
function spawnHeart(x, y) {
  const el = document.createElement('div');
  el.textContent = "💗";
  el.style.position = 'absolute';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.fontSize = (Math.random()*12 + 14) + 'px';
  el.style.opacity = 1;
  el.style.transform = `translate(-50%, -50%)`;
  heartLayer.appendChild(el);

  const dx = (Math.random() - 0.5) * 120;
  const dy = - (Math.random() * 160 + 60);
  const duration = Math.random() * 600 + 900;

  el.animate([
    { transform: 'translate(-50%,-50%)', opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
  ], { duration, easing: 'ease-out' }).onfinish = () => el.remove();
}

function burstHearts(n=20) {
  const w = window.innerWidth, h = window.innerHeight;
  for (let i = 0; i < n; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    spawnHeart(x, y);
  }
}

// Hugs
document.getElementById('hugBtn').addEventListener('click', () => {
  burstHearts(60);
  const msg = document.createElement('div');
  msg.textContent = "Обіймаюююю";
  Object.assign(msg.style, {
    position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
    padding: '12px 16px', background: 'white', borderRadius: '12px', border: '1px solid rgba(42,39,48,.1)',
    boxShadow: '0 10px 30px rgba(255, 119, 177, .18)', fontWeight: '700', zIndex: 50
  });
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
});
