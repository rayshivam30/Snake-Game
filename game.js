const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('gameOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const currentScore = document.getElementById('current-score');
const highScore = document.getElementById('high-score');
const currentLevel = document.getElementById('current-level');
const difficultySelect = document.getElementById('difficulty');
const soundToggle = document.getElementById('soundToggle');

let snake = [{ x: 200, y: 200 }];
let snakeSpeed = 200;
let dx = 20;
let dy = 0;
let food = { x: 0, y: 0 };
let score = 0;
let level = 1;
let gameLoop = null;
let gamePaused = false;
let gameRunning = false;

// Helper functions
function init() {
    resetGame();
    generateFood(); // Generate initial food position
    drawFood();
    overlay.style.display = 'flex';
}

function resetGame() {
    clearInterval(gameLoop);
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
    score = 0;
    level = 1;
    snakeSpeed = getInitialSpeed();
    updateScore();
    updateLevel();
    gameRunning = false;
    gamePaused = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateFood(); // Generate new food position on reset
    drawSnake();
}

function getInitialSpeed() {
    switch (difficultySelect.value) {
        case 'easy':
            return 300;
        case 'medium':
            return 200;
        case 'hard':
            return 100;
        case 'extreme':
            return 80;
    }
}

function increaseLevel() {
    level++;
    snakeSpeed -= 20;
    updateLevel();
}

function updateScore() {
    currentScore.textContent = score;
    if (score > parseInt(highScore.textContent)) {
        highScore.textContent = score;
    }
}

function updateLevel() {
    currentLevel.textContent = level;
}

function drawSnakePart(snakePart, index) {
    // Create gradient for snake parts
    const gradient = ctx.createRadialGradient(
        snakePart.x + 10, snakePart.y + 10, 2,
        snakePart.x + 10, snakePart.y + 10, 10
    );
    
    if (index === 0) {
        // Snake head
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#2E7D32');
        ctx.fillStyle = gradient;
        ctx.fillRect(snakePart.x + 2, snakePart.y + 2, 16, 16);
        
        // Add eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(snakePart.x + 5, snakePart.y + 5, 3, 3);
        ctx.fillRect(snakePart.x + 12, snakePart.y + 5, 3, 3);
    } else {
        // Snake body
        gradient.addColorStop(0, '#8BC34A');
        gradient.addColorStop(1, '#558B2F');
        ctx.fillStyle = gradient;
        ctx.fillRect(snakePart.x + 1, snakePart.y + 1, 18, 18);
    }
    
    // Add border
    ctx.strokeStyle = '#1B5E20';
    ctx.lineWidth = 1;
    ctx.strokeRect(snakePart.x + 1, snakePart.y + 1, 18, 18);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function generateFood() {
    food.x = randomTen(0, canvas.width - 20);
    food.y = randomTen(0, canvas.height - 20);
    snake.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x === food.x && part.y === food.y;
        if (foodIsOnSnake) generateFood();
    });
}

function drawFood() {
    // Create animated food with gradient
    const gradient = ctx.createRadialGradient(
        food.x + 10, food.y + 10, 2,
        food.x + 10, food.y + 10, 12
    );
    gradient.addColorStop(0, '#FF6B6B');
    gradient.addColorStop(0.7, '#FF3838');
    gradient.addColorStop(1, '#D32F2F');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(food.x + 7, food.y + 7, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = '#B71C1C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(food.x + 10, food.y + 10, 8, 0, 2 * Math.PI);
    ctx.stroke();
}

function changeDirection(event) {
    if (gamePaused || !gameRunning) return;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const A_KEY = 65;
    const D_KEY = 68;
    const W_KEY = 87;
    const S_KEY = 83;

    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) {
        dx = -20;
        dy = 0;
        if (soundToggle.checked) playSound();
    }

    if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) {
        dx = 0;
        dy = -20;
        if (soundToggle.checked) playSound();
    }

    if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) {
        dx = 20;
        dy = 0;
        if (soundToggle.checked) playSound();
    }

    if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) {
        dx = 0;
        dy = 20;
        if (soundToggle.checked) playSound();
    }
}

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood(); // Generate new food location when eaten
        if (score % 50 === 0) increaseLevel();
    } else {
        snake.pop();
    }
}


function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (hasCollided) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 20;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 20;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function playSound() {
    const audio = new Audio('https://www.freesound.org/data/previews/398/398670_6341669-lq.mp3');
    audio.play();
}

function main() {
    if (didGameEnd()) {
        stopGame();
        setTimeout(() => {
            overlayTitle.textContent = 'Game Over!';
            overlayMessage.textContent = `Final Score: ${score}`;
            overlay.style.display = 'flex';
        }, 100);

        return;
    }

    setTimeout(function onTick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, snakeSpeed);
}

function startGame() {
    if (!gameRunning) {
        resetGame();
        overlay.style.display = 'none';
        gameRunning = true;
        main();
    }
}

function stopGame() {
    clearInterval(gameLoop);
    gameRunning = false;
    startButton.textContent = 'Restart Game';
    startButton.style.display = 'block';
    pauseButton.style.display = 'none';
}

function togglePause() {
    if (gamePaused) {
        pauseButton.textContent = 'Pause';
        gamePaused = false;
        main();
    } else {
        pauseButton.textContent = 'Resume';
        gamePaused = true;
    }
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', togglePause);

difficultySelect.addEventListener('change', function() {
    if (gameRunning) {
        clearInterval(gameLoop);
        snakeSpeed = getInitialSpeed();
        if (!gamePaused) main();
    }
});

init();

