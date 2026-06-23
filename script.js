// Atributos do Tamagotchi
let hunger = 0;
let boredom = 0;
let isDead = false;

// Elementos do DOM
const pet = document.getElementById('pet');
const statHunger = document.getElementById('stat-hunger');
const statBoredom = document.getElementById('stat-boredom');
const statusText = document.getElementById('status-text');
const bgMusic = document.getElementById('bg-music');

// Botões
const btnFeed = document.getElementById('btn-feed');
const btnPlay = document.getElementById('btn-play');
const btnReset = document.getElementById('btn-reset');

// Ativar a música no primeiro clique na página (Regra dos Navegadores)
document.body.addEventListener('click', () => {
    if (bgMusic.paused && !isDead) {
        bgMusic.volume = 0.4; // Volume ambiente
        bgMusic.play().catch(err => console.log("Áudio aguardando interação."));
    }
});

// Loop principal do Jogo (Roda a cada 2.5 segundos)
const gameLoop = setInterval(() => {
    if (isDead) return;

    // Aumenta status de necessidade
    hunger = Math.min(hunger + 8, 100);
    boredom = Math.min(boredom + 12, 100);

    updateStats();
    checkMood();
}, 2500);

// Atualiza os números na tela
function updateStats() {
    statHunger.innerText = hunger;
    statBoredom.innerText = boredom;
}

// Verifica o humor ou se o pato morreu
function checkMood() {
    if (hunger >= 100 || boredom >= 100) {
        die();
    } else if (hunger > 70 || boredom > 70) {
        statusText.innerText = "CHATEADO";
        statusText.style.color = "#ffea00";
        pet.className = "cyber-pet sad";
    } else {
        statusText.innerText = "FELIZ";
        statusText.style.color = "#ff00ff";
        pet.className = "cyber-pet bounce";
    }
}

// Função de Morte do Bichinho
function die() {
    isDead = true;
    statusText.innerText = "GAME OVER";
    statusText.style.color = "#ff0000";
    pet.className = "cyber-pet dead";
    bgMusic.pause(); // Para a música do Wii se ele morrer
    clearInterval(gameLoop);
}

// Ações dos Botões (Interações)
btnFeed.addEventListener('click', () => {
    if (isDead) return;
    hunger = Math.max(hunger - 25, 0);
    
    // Animação rápida de comendo
    pet.className = "cyber-pet eating";
    setTimeout(checkMood, 600);
    updateStats();
});

btnPlay.addEventListener('click', () => {
    if (isDead) return;
    boredom = Math.max(boredom - 30, 0);
    
    // Efeito visual de pulo rápido ao brincar
    pet.style.transform = "scale(1.4) translateY(-15px)";
    setTimeout(() => {
        pet.style.transform = "none";
        checkMood();
    }, 300);
    updateStats();
});

// Reiniciar o Jogo (Botão C)
btnReset.addEventListener('click', () => {
    location.reload();
});

// Inicia o Pato com a animação de pulinho
pet.className = "cyber-pet bounce";
