// Fetch user IP
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('user-ip').innerText = `Your IP: ${data.ip}`;
    })
    .catch(() => {
        document.getElementById('user-ip').innerText = `IP unavailable`;
    });

// Fetch live visitor data from your Render backend
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
            labels: views.map((v, i) => `Visitor ${i+1}`),
            datasets: [{
                label: 'Visitors',
                data: views,
                backgroundColor: views.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`),
                borderWidth: 1
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
