// Partículas de casino/póker para el fondo animado
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

const PARTICLE_EMOJIS = ['♠️','♥️','♦️','♣️'];
const PARTICLE_COUNT = 40;
const PARTICLE_SIZE = 10;
const particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomEmoji() {
  return PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];
}

function randomColor() {
  // Colores suaves de casino
  const colors = ['#FFD700','#E63946','#457B9D','#2A9D8F','#F4A261','#A8DADC','#F72585','#B5179E','#43AA8B','#F9C74F'];
  return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = PARTICLE_SIZE + Math.random() * 4;
    this.emoji = randomEmoji();
    this.color = randomColor();
    this.alpha = 0.08 + Math.random() * 0.05;
    this.speed = 0.07 + Math.random() * 0.09;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.004;
    this.floatY = (Math.random() - 0.5) * 0.06;
  }
  update() {
    this.x += this.speed;
    this.y += this.floatY;
    this.angle += this.spin;
    if (this.x > canvas.width + this.size) {
      this.x = -this.size;
      this.y = Math.random() * canvas.height;
    }
    if (this.y < -this.size) this.y = canvas.height + this.size;
    if (this.y > canvas.height + this.size) this.y = -this.size;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.font = `${this.size}px serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 1;
    ctx.fillText(this.emoji, 0, 0);
    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.update();
    p.draw(ctx);
  }
  requestAnimationFrame(animate);
}
animate(); 