const targetDate = new Date(2026, 1, 14, 0, 0, 0).getTime();
const timerElement = document.getElementById('timer');
const envelope = document.getElementById('envelope-wrapper');
const heartsContainer = document.getElementById('hearts-container');

let isUnlocked = false;

// --- LÓGICA DE LA LLUVIA DE CORAZONES ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño y duración aleatoria para que se vea natural
    const size = Math.random() * 20 + 10 + 'px';
    heart.style.fontSize = size;
    
    const duration = Math.random() * 3 + 2 + 's';
    heart.style.animationDuration = duration;
    
    heart.style.opacity = Math.random() * 0.7 + 0.3;

    heartsContainer.appendChild(heart);

    // Eliminar el corazón cuando termine la animación
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Crear un corazón cada 300ms
setInterval(createHeart, 300);
// ---------------------------------------

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(countdown);
        isUnlocked = true;
        timerElement.style.display = "none"; 
        autoOpen();
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);

function autoOpen() {
    setTimeout(() => {
        envelope.classList.add('open');
    }, 1000);
}

envelope.addEventListener('click', () => {
    if (!isUnlocked) {
        alert("Tranquila amor, todavía no es San Valentín. 😊❤️");
    }
});