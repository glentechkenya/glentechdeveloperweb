/* MATRIX EFFECT */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const letters = "01GLENTECHAI";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#00f0ff";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y,i)=>{
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i*fontSize, y*fontSize);
    if (y*fontSize > canvas.height && Math.random() > 0.975) drops[i]=0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 33);

/* VISITOR COUNTER */
let visitors = 0;
setInterval(()=>{
  visitors += Math.floor(Math.random()*5)+1;
  document.getElementById("visitorCount").textContent = visitors;
},800);

/* REAL IP STALKER (Gifted API) */
fetch("https://api.giftedtech.co.ke/api/stalk/ipstalk?apikey=gifted")
.then(res => res.json())
.then(data => {
  document.getElementById("ip").textContent =
    data.ip || data.address || "Unavailable";
})
.catch(()=>{
  document.getElementById("ip").textContent = "Protected";
});

/* BATTERY */
if (navigator.getBattery) {
  navigator.getBattery().then(b=>{
    document.getElementById("battery").textContent =
      Math.floor(b.level*100)+"%";
  });
}

/* SERVER RUNTIME */
let mins = 0;
setInterval(()=>{
  mins++;
  document.getElementById("runtime").textContent =
    `${Math.floor(mins/1440)}d ${Math.floor(mins/60)%24}h ${mins%60}m`;
},60000);

/* REQUESTS */
let req = 0;
setInterval(()=>{
  req += Math.floor(Math.random()*10);
  document.getElementById("requests").textContent = req;
},1200);
