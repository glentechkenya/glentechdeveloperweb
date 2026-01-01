/* MATRIX GREEN 1010011100 */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const chars = "1010011100";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function matrix() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00ff66";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y,i)=>{
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text, i*fontSize, y*fontSize);
    if (y*fontSize > canvas.height && Math.random() > 0.97) drops[i]=0;
    drops[i]++;
  });
}
setInterval(matrix, 33);

/* REAL VISITS (browser-real) */
let views = Number(localStorage.getItem("views") || 0);
views++;
localStorage.setItem("views", views);
document.getElementById("views").textContent = views;

/* SPEEDOMETER */
const sp = document.getElementById("speedometer");
const sctx = sp.getContext("2d");

function drawSpeed(value) {
  sctx.clearRect(0,0,sp.width,sp.height);
  sctx.lineWidth = 10;
  sctx.strokeStyle = "#00ff66";
  sctx.beginPath();
  sctx.arc(130,130,100,Math.PI,Math.PI+(value/2000)*Math.PI);
  sctx.stroke();
}
drawSpeed(views);

/* IP API */
fetch("https://api.giftedtech.co.ke/api/stalk/ipstalk?apikey=gifted")
.then(r=>r.json())
.then(d=>{
  document.getElementById("ip").textContent = d.ip || d.address || "Protected";
})
.catch(()=>document.getElementById("ip").textContent="Protected");

/* BATTERY */
if (navigator.getBattery) {
  navigator.getBattery().then(b=>{
    document.getElementById("battery").textContent =
      Math.floor(b.level*100)+"%";
  });
}

/* RUNTIME */
let mins=0;
setInterval(()=>{
  mins++;
  document.getElementById("runtime").textContent =
    `${Math.floor(mins/1440)}d ${Math.floor(mins/60)%24}h ${mins%60}m`;
},60000);
