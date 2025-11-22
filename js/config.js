// Configuración de animales con sus imágenes
// Coloca tus imágenes en la carpeta "images/" con estos nombres exactos

const ANIMALS_CONFIG = [
    {
        id: 'cat',
        name: 'Gatito',
        image: 'images/cat.png',
        score: 10
    },
    {
        id: 'cat2',
        name: 'Gatito Naranja',
        image: 'images/cat2.png',
        score: 12
    },
    {
        id: 'cat3',
        name: 'Gatito Gris',
        image: 'images/cat3.png',
        score: 15
    },
    {
        id: 'cat4',
        name: 'Gatito Siamés',
        image: 'images/cat4.png',
        score: 18
    },
    {
        id: 'dog',
        name: 'Perrito',
        image: 'images/dog.png',
        score: 10
    },
    {
        id: 'dog2',
        name: 'Perrito Marrón',
        image: 'images/dog2.png',
        score: 12
    },
    {
        id: 'dog3',
        name: 'Perrito Dálmata',
        image: 'images/dog3.png',
        score: 15
    },
    {
        id: 'dog4',
        name: 'Perrito Husky',
        image: 'images/dog4.png',
        score: 18
    },
    {
        id: 'penguin',
        name: 'Pingüino',
        image: 'images/penguin.png',
        score: 15
    },
    {
        id: 'penguin2',
        name: 'Pingüino Rey',
        image: 'images/penguin2.png',
        score: 17
    },
    {
        id: 'penguin3',
        name: 'Pingüino Bebé',
        image: 'images/penguin3.png',
        score: 20
    },
    {
        id: 'chick',
        name: 'Pollito',
        image: 'images/chick.png',
        score: 8
    },
    {
        id: 'chick2',
        name: 'Pollito Rosa',
        image: 'images/chick2.png',
        score: 10
    },
    {
        id: 'chick3',
        name: 'Pollito Azul',
        image: 'images/chick3.png',
        score: 12
    },
    {
        id: 'rabbit',
        name: 'Conejito',
        image: 'images/rabbit.png',
        score: 12
    },
    {
        id: 'panda',
        name: 'Panda',
        image: 'images/panda.png',
        score: 20
    },
    {
        id: 'fox',
        name: 'Zorrito',
        image: 'images/fox.png',
        score: 15
    },
    {
        id: 'koala',
        name: 'Koala',
        image: 'images/koala.png',
        score: 18
    },
    {
        id: 'tiger',
        name: 'Tigre',
        image: 'images/tiger.png',
        score: 25
    },
    {
        id: 'unicorn',
        name: 'Unicornio',
        image: 'images/unicorn.png',
        score: 30
    }
];

// Configuración de la bomba
const BOMB_CONFIG = {
    id: 'bomb',
    name: 'Bomba',
    image: 'images/bomb.png',
    timePenalty: 5
};

// Configuración de niveles
const LEVELS_CONFIG = {
    startingTime: 30,
    timeBonus: 15,
    startingTarget: 10,
    targetIncrement: 2,
    maxLevels: 10,
    bombProbability: 0.15,  // 15% de probabilidad de bomba
    spawnRateBase: 800,     // Milisegundos entre spawns
    spawnRateDecrement: 50  // Reducción por nivel
};

// Configuración de colores para variantes (opcional)
const COLOR_VARIANTS = [
    { name: 'normal', filter: 'none' },
    { name: 'golden', filter: 'sepia(1) saturate(3) hue-rotate(20deg)' },
    { name: 'blue', filter: 'hue-rotate(200deg)' },
    { name: 'pink', filter: 'hue-rotate(300deg)' },
    { name: 'green', filter: 'hue-rotate(100deg)' }
];
