// Visitor & View Counters
let visitorCount = localStorage.getItem('visitors') || 0;
let viewCount = localStorage.getItem('views') || 0;

visitorCount++;
viewCount++;

localStorage.setItem('visitors', visitorCount);
localStorage.setItem('views', viewCount);

document.getElementById('visitors').textContent = visitorCount;
document.getElementById('views').textContent = viewCount;
