// Variables del juego
let score = 0;
let level = 1;
let timeLeft = LEVELS_CONFIG.startingTime;
let maxTime = LEVELS_CONFIG.startingTime;
let target = LEVELS_CONFIG.startingTarget;
let caught = 0;
let gameActive = false;
let timerInterval;
let spawnInterval;
let animals = [];

// Iniciar el juego
function startGame() {
    score = 0;
    level = 1;
    timeLeft = LEVELS_CONFIG.startingTime;
    maxTime = LEVELS_CONFIG.startingTime;
    target = LEVELS_CONFIG.startingTarget;
    caught = 0;
    gameActive = true;
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
    
    clearGameArea();
    updateUI();
    startTimer();
    startSpawning();
}

// Actualizar interfaz
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('target').textContent = target;
    document.getElementById('time').textContent = timeLeft;
    
    const timerPercent = (timeLeft / maxTime) * 100;
    document.getElementById('timer-fill').style.width = timerPercent + '%';
    
    // Cambiar color de la barra según el tiempo restante
    const timerFill = document.getElementById('timer-fill');
    if (timerPercent > 50) {
        timerFill.style.background = 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)';
    } else if (timerPercent > 25) {
        timerFill.style.background = 'linear-gradient(90deg, #f2994a 0%, #f2c94c 100%)';
    } else {
        timerFill.style.background = 'linear-gradient(90deg, #eb3349 0%, #f45c43 100%)';
    }
}

// Timer del juego
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!gameActive) return;
        
        timeLeft--;
        updateUI();
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Sistema de spawn de animales
function startSpawning() {
    clearInterval(spawnInterval);
    const spawnRate = Math.max(
        LEVELS_CONFIG.spawnRateBase - (level * LEVELS_CONFIG.spawnRateDecrement), 
        300
    );
    
    spawnInterval = setInterval(() => {
        if (!gameActive) return;
        spawnAnimal();
    }, spawnRate);
}

// Crear y mostrar un animal o bomba
function spawnAnimal() {
    const gameArea = document.getElementById('game-area');
    const isBomb = Math.random() < LEVELS_CONFIG.bombProbability;
    
    const element = document.createElement('div');
    element.className = 'animal';
    
    if (isBomb) {
        // Crear bomba
        element.classList.add('bomb');
        element.style.backgroundImage = `url('${BOMB_CONFIG.image}')`;
        element.dataset.type = 'bomb';
    } else {
        // Crear animal aleatorio
        const animalConfig = ANIMALS_CONFIG[Math.floor(Math.random() * ANIMALS_CONFIG.length)];
        element.style.backgroundImage = `url('${animalConfig.image}')`;
        element.dataset.score = animalConfig.score;
        element.dataset.name = animalConfig.name;
        element.dataset.type = 'animal';
        
        // Aplicar variante de color aleatoria (opcional)
        if (Math.random() < 0.3) { // 30% de probabilidad de variante
            const variant = COLOR_VARIANTS[Math.floor(Math.random() * COLOR_VARIANTS.length)];
            element.style.filter = variant.filter;
            // Bonificación para variantes especiales
            if (variant.name === 'golden') {
                element.dataset.score = parseInt(element.dataset.score) * 2;
                element.style.transform = 'scale(1.1)';
            }
        }
    }
    
    // Posición aleatoria
    const maxX = gameArea.clientWidth - 100;
    const maxY = gameArea.clientHeight - 100;
    
    element.style.left = Math.random() * maxX + 'px';
    element.style.top = Math.random() * maxY + 'px';
    
    // Evento de clic
    element.onclick = () => handleAnimalClick(element);
    
    gameArea.appendChild(element);
    animals.push(element);
    
    // Desaparecer después de 2 segundos
    setTimeout(() => {
        if (element.parentNode && gameActive) {
            element.style.animation = 'disappear 0.3s ease-out';
            setTimeout(() => {
                if (element.parentNode) {
                    element.remove();
                }
            }, 300);
        }
    }, 2000);
}

// Manejar clic en animal o bomba
function handleAnimalClick(element) {
    if (!gameActive) return;
    
    const type = element.dataset.type;
    
    if (type === 'bomb') {
        // Bomba: resta tiempo
        timeLeft = Math.max(0, timeLeft - BOMB_CONFIG.timePenalty);
        playBombSound();
        showScorePopup(element, `-${BOMB_CONFIG.timePenalty}s ⏰`, '#ff4444');
    } else {
        // Animal: suma puntos
        const points = parseInt(element.dataset.score);
        const animalName = element.dataset.name;
        score += points;
        caught++;
        playCatchSound(points);
        showScorePopup(element, `+${points} 🎯`, '#4CAF50');
        
        if (caught >= target) {
            levelUp();
        }
    }
    
    // Animación de desaparición
    element.style.animation = 'disappear 0.2s ease-out';
    setTimeout(() => element.remove(), 200);
    updateUI();
}

// Mostrar popup de puntuación
function showScorePopup(element, text, color) {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = text;
    popup.style.color = color;
    popup.style.left = element.style.left;
    popup.style.top = element.style.top;
    
    document.getElementById('game-area').appendChild(popup);
    
    setTimeout(() => popup.remove(), 1000);
}

// Subir de nivel
function levelUp() {
    level++;
    caught = 0;
    target = LEVELS_CONFIG.startingTarget + (level * LEVELS_CONFIG.targetIncrement);
    timeLeft += LEVELS_CONFIG.timeBonus;
    maxTime = timeLeft;
    
    clearGameArea();
    playLevelUpSound();
    
    updateUI();
    startSpawning();
    
    if (level > LEVELS_CONFIG.maxLevels) {
        endGame(true);
    }
}

// Limpiar área de juego
function clearGameArea() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    animals = [];
}

// Terminar el juego
function endGame(won) {
    gameActive = false;
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    
    if (won) {
        playVictorySound();
        document.getElementById('final-score').textContent = 
            `¡FELICITACIONES! Puntuación Final: ${score} puntos`;
        document.getElementById('final-level').textContent = 
            '¡Completaste todos los niveles! 🏆';
    } else {
        playGameOverSound();
        document.getElementById('final-score').textContent = 
            `Puntuación Final: ${score} puntos`;
        document.getElementById('final-level').textContent = 
            `Llegaste al nivel ${level}`;
    }
    
    document.getElementById('game-over').classList.remove('hidden');
    clearGameArea();
}
