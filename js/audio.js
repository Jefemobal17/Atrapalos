// Sistema de audio del juego
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Función para reproducir sonidos
function playSound(frequency, duration, type = 'sine', volume = 0.3) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Sonido cuando atrapas un animal
function playCatchSound(score) {
    const baseFreq = 440;
    const freq = baseFreq + (score * 5);
    playSound(freq, 0.1, 'sine', 0.3);
}

// Sonido cuando tocas una bomba
function playBombSound() {
    playSound(100, 0.3, 'sawtooth', 0.4);
    setTimeout(() => playSound(80, 0.2, 'sawtooth', 0.3), 100);
}

// Sonido de nivel completado
function playLevelUpSound() {
    playSound(523, 0.15, 'sine', 0.3);
    setTimeout(() => playSound(659, 0.15, 'sine', 0.3), 150);
    setTimeout(() => playSound(784, 0.25, 'sine', 0.3), 300);
}

// Sonido de game over
function playGameOverSound() {
    playSound(440, 0.2, 'sine', 0.3);
    setTimeout(() => playSound(392, 0.2, 'sine', 0.3), 200);
    setTimeout(() => playSound(349, 0.4, 'sine', 0.3), 400);
}

// Sonido de victoria
function playVictorySound() {
    const notes = [523, 587, 659, 698, 784, 880];
    notes.forEach((note, index) => {
        setTimeout(() => playSound(note, 0.2, 'sine', 0.25), index * 100);
    });
}
