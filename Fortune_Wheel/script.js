const sectors = [
  { label: 'Hadiah A' },
  { label: 'Hadiah B' },
  { label: 'Hadiah C' },
  { label: 'Hadiah D' },
  { label: 'Hadiah E' },
  { label: 'JACKPOT' },
  { label: 'Hadiah F' },
  { label: 'Hadiah G' },
  { label: 'Hadiah H' },
  { label: 'Hadiah I' },
  { label: 'Hadiah J' },
  { label: 'ZONK' },
];
const wheelColors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#d35400', '#2980b9', '#27ae60', '#8e44ad', '#c0392b'];
const rand = (m, M) => Math.random() * (M - m) + m;
const ctx = document.querySelector('#wheel').getContext('2d');
const spinEl = document.querySelector('#spin');
const radius = ctx.canvas.width / 2;
const Allwheel = 2 * Math.PI;

const friction = 0.998;

const getIndex = () => Math.floor(sectors.length - (ang / Allwheel) * sectors.length) % sectors.length;

let angVel = 0;
let ang = 90;
console.log(getIndex());

function drawSector(sector, i) {
  const oneZone = (2 * Math.PI) / sectors.length;
  const ang = oneZone * i;
  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = wheelColors[i];
  ctx.moveTo(radius, radius);
  ctx.arc(radius, radius, radius, ang, ang + oneZone);
  ctx.lineTo(radius, radius);
  ctx.fill();

  ctx.translate(radius, radius);
  ctx.rotate(ang + oneZone / 2);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(sector.label, radius - 10, 10);
  ctx.restore();
}

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - Math.PI / 2}rad)`;
  // spinEl.textContent = !angVel ? 'SPIN' : sector.label;
  if (getIndex() % 2 === 0) {
    spinEl.style.background = 'rgb(182, 29, 29)';
  } else {
    spinEl.style.background = 'rgb(88, 68, 68)';
  }
}

function displayResult(result) {
  let message;
  if (result === 'Zonk') {
    message = 'Yah, Anda mendapat Zonk. Coba lagi!';
  } else if (result === 'Jackpot') {
    message = 'Wow, Anda mendapat Jackpot! Selamat!';
  } else {
    message = `Selamat, Anda mendapatkan ${result}!`;
  }
  alert(message);
}

function frame() {
  if (!angVel) return;
  angVel *= friction;
  if (angVel < 0.002) {
    angVel = 0;
    const result = sectors[getIndex()].label;
    displayResult(result);
  }
  ang += angVel;
  ang %= Allwheel;
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate();
  engine();
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.3);
  });
}
init();
