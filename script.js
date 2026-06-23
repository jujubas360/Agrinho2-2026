// Atributos do Tamagotchi
let hunger = 0;
let boredom = 0;
let isDead = false;
let gameStarted = false;
let player;

// Elementos do DOM
const pet = document.getElementById('pet');
const statHunger = document.getElementById('stat-hunger');
const statBoredom = document.getElementById('stat-boredom');
const statusText = document.getElementById('status-text');

// Botões
const btnFeed = document.getElementById('btn-feed');
const btnPlay = document.getElementById('btn-play');
const btnReset = document.getElementById('btn-reset');

// 1. Configuração da API do YouTube para tocar o link enviado
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'Pn61zKFkf2A', // ID do vídeo que você enviou
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'Pn61zKFkf2A' // Necessário para fazer o loop funcionar no YT
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    statusText.innerText = "PRONTO!";
}

// Função para dar o "Play" no som na primeira interação do usuário
function startMusic() {
    if (!gameStarted && player && typeof player.playVideo === 'function') {
        player.setVolume(30); // Volume em 30% para não estourar
        player.playVideo();
        gameStarted = true;
        startGameLoop();
    }
}

// 2. Loop principal do Jogo
let gameLoop;
function startGameLoop() {
    pet.className = "cyber-pet bounce";
    statusText.innerText = "FELIZ";
    
    gameLoop = setInterval(() => {
        if (isDead) return;

        // O patinho sente fome e tédio passivamente
        hunger = Math.min(hunger + 5, 100);
        boredom = Math.min(boredom + 8, 100);

        updateStats();
        checkMood();
    }, 2000); // Atualiza a cada 2 segundos
}

// Atualiza os números na tela
function updateStats() {
    statHunger.innerText = hunger;
    statBoredom.innerText = boredom;
}

// Verifica as condições de saúde do bichinho
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

// Função Game Over
function die() {
    isDead = true;
    statusText.innerText = "GAME OVER";
    statusText.style.color = "#ff0000";
    pet.className = "cyber-pet dead";
    
    if (player && typeof player.stopVideo === 'function') {
        player.stopVideo(); // Para a música se ele morrer
    }
    clearInterval(gameLoop);
}

// 3. Interações dos Botões
btnFeed.addEventListener('click', () => {
    startMusic(); // Tenta ligar o som se for o primeiro clique
    if (isDead) return;
    
    hunger = Math.max(hunger - 20, 0);
    updateStats();
    
    // Animação de comer
    pet.className = "cyber-pet eating";
    setTimeout(checkMood, 600);
});

btnPlay.addEventListener('click', () => {
    startMusic(); // Tenta ligar o som se for o primeiro clique
    if (isDead) return;
    
    boredom = Math.max(boredom - 25, 0);
    updateStats();
    
    // Animação de pulo
    pet.style.transform = "scale(1.3) translateY(-20px)";
    setTimeout(() => {
        pet.style.transform = "none";
        checkMood();
    }, 300);
});

// Botão de Reiniciar (C)
btnReset.addEventListener('click', () => {
    location.reload();
});
