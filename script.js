// --- Matrix Effect ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '1010011100';
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; // green matrix
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    }
}

setInterval(drawMatrix, 50);

// --- IP Tracker ---
fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        document.getElementById('user-ip').innerText = `Your IP: ${data.ip}`;
    })
    .catch(() => {
        document.getElementById('user-ip').innerText = `IP unavailable`;
    });

// --- Visitor Chart ---
async function fetchViews() {
    try {
        const res = await fetch('https://backend-8472.onrender.com/views');
        const data = await res.json();
        return data.views || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function renderChart() {
    const views = await fetchViews();
    const ctx = document.getElementById('viewsChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: views.map((v,i) => `Visitor ${i+1}`),
            datasets: [{
                data: views,
                backgroundColor: views.map(() => `hsl(${Math.random()*360},70%,50%)`)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { enabled: true }
            }
        }
    });
}

renderChart();
