// Visitor Counter
let count = 0;
const visitorCount = document.getElementById('visitorCount');
const target = 1234; // Replace with real visitor data
const speed = 50;

const updateCount = () => {
  const increment = Math.ceil(target / speed);
  count += increment;
  if(count > target) count = target;
  visitorCount.textContent = count;
  if(count < target) setTimeout(updateCount, 50);
};
updateCount();

// Moving futuristic particles background
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
const colors = ['#00f0ff','#0ff','#0077ff'];

class Particle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2 + 1;
    this.speedX = Math.random()*1 - 0.5;
    this.speedY = Math.random()*1 - 0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvas.width) this.x = 0;
    if(this.x < 0) this.x = canvas.width;
    if(this.y > canvas.height) this.y = 0;
    if(this.y < 0) this.y = canvas.height;
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function init(){
  particlesArray = [];
  for(let i=0;i<200;i++){
    particlesArray.push(new Particle());
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update(); p.draw();});
  requestAnimationFrame(animate);
}
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
