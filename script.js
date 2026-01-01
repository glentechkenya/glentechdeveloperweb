/* MATRIX */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const chars = "1010011100";
const fontSize = 16;
const cols = canvas.width / fontSize;
const drops = Array.from({ length: cols }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);
    drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
  });
}
setInterval(drawMatrix, 50);

/* CLOCK */
setInterval(() => {
  document.getElementById("clock").textContent =
    "⏱ " + new Date().toLocaleTimeString();
}, 1000);

/* BATTERY */
navigator.getBattery().then(b => {
  const update = () =>
    document.getElementById("battery").textContent =
      "🔋 Battery: " + Math.round(b.level * 100) + "%";
  update();
  b.addEventListener("levelchange", update);
});

/* IP */
fetch("https://api.ipify.org?format=json")
.then(r=>r.json())
.then(d=>{
  document.getElementById("user-ip").textContent = "IP: " + d.ip;
});

/* SPEEDOMETER VISITORS */
const g = document.getElementById("gauge").getContext("2d");
let visitors = 0;

function drawGauge(val){
  g.clearRect(0,0,300,150);
  g.beginPath();
  g.arc(150,150,100,Math.PI,0);
  g.strokeStyle="#007bff";
  g.lineWidth=5;
  g.stroke();

  const angle = Math.PI + (val/100)*Math.PI;
  g.beginPath();
  g.moveTo(150,150);
  g.lineTo(150 + 80*Math.cos(angle),150 + 80*Math.sin(angle));
  g.stroke();
}

setInterval(()=>{
  visitors = Math.min(100, visitors + Math.floor(Math.random()*3));
  document.getElementById("visitor-number").textContent = visitors;
  drawGauge(visitors);
},2000);

/* HIDDEN LINKS */
function goAI(){
  location.href="https://ai-k9qa.onrender.com";
}
function goMovies(){
  location.href="https://glenmoviescomke.vercel.app/";
}
function goWhatsApp(){
  location.href="https://whatsapp.com/channel/0029VbBz7he0G0XhFAUWt70P";
}
