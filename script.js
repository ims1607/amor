// 1. CONFIGURACIÓN DE LA FECHA OBJETIVO
// (Año, Mes-1 (Febrero es 1), Día, Hora, Minutos, Segundos)
const targetDate = new Date(2026, 1, 14, 0, 0, 0).getTime();

// 2. REFERENCIAS A ELEMENTOS DEL DOM
const timerElement = document.getElementById('timer');
const envelope = document.getElementById('envelope-wrapper');
const heartsContainer = document.getElementById('hearts-container');
const glowEffect = document.querySelector('.glow');

// 3. ESTADO INICIAL
let isUnlocked = false;

// 4. GENERADOR DE LLUVIA DE CORAZONES
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Posición horizontal aleatoria entre 0 y 100vw
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño aleatorio para dar profundidad
    const size = Math.random() * 15 + 10 + 'px';
    heart.style.fontSize = size;
    
    // Duración de la caída aleatoria (entre 4 y 7 segundos)
    const duration = Math.random() * 3 + 4 + 's';
    heart.style.animationDuration = duration;
    
    // Opacidad aleatoria para que unos brillen más que otros
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    
    // Añadirlos al contenedor principal
    heartsContainer.appendChild(heart);
    
    // Eliminar el elemento del DOM una vez termine la animación (evita lag)
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// 5. INICIAR LA LLUVIA CONSTANTE
// Crea un corazón cada 400 milisegundos
setInterval(createHeart, 400);

// 6. LÓGICA DEL CONTADOR REGRESIVO
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Verificar si el tiempo ha terminado
    if (distance <= 0) {
        clearInterval(countdown);
        isUnlocked = true;
        
        // Efectos visuales de desbloqueo
        timerElement.style.display = "none"; 
        
        // Pequeña espera para la apertura automática cinematográfica
        setTimeout(() => {
            envelope.classList.add('open');
            // Difuminar y ocultar el brillo trasero al abrirse la carta
            if(glowEffect) glowEffect.style.opacity = "0";
        }, 1200);

    } else {
        // Cálculo de días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar el texto del contador en pantalla
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}, 1000);

// 7. INTERACCIONES DEL USUARIO (CLIC)
envelope.addEventListener('click', () => {
    if (!isUnlocked) {
        // Mensaje de bloqueo personalizado
        alert("Tranquila bibi, todavía no es San Valentín. 😊❤️");
    } else {
        // Si ya está desbloqueado, permitir cerrar/abrir manualmente con clic
        envelope.classList.toggle('open');
    }
});

// 8. LOG DE CONSOLA PARA DEBUG (OPCIONAL)
console.log("Web de San Valentín cargada. Esperando al 14 de febrero...");