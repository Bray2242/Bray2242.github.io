window.onload = function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20; // Snake size
    const rows = canvas.height / box;
    const cols = canvas.width / box;

    let snake = [];
    let food;
    let score = 0;
    let direction = null;
    let gameOver = false;
    let gameStarted = false;

    // Get button element
    const startButton = document.getElementById("startButton");

    // Snake control
    document.addEventListener("keydown", event => {
        if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });

    // Start the game when the button is clicked
    startButton.addEventListener("click", () => {
        if (!gameStarted) {
            resetGame();
            gameLoop();
            gameStarted = true;
            startButton.style.display = "none"; // Hide start button
        }
    });

    // Reset the game state
    function resetGame() {
        snake = [];
        snake[0] = { x: Math.floor(cols / 2) * box, y: Math.floor(rows / 2) * box }; // Snake starting position

        food = {
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box
        };

        score = 0;
        direction = null;
        gameOver = false;
        document.getElementById("score").textContent = score;
    }

    // Update game state
    function update() {
        if (gameOver) return;

        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === "UP") headY -= box;
        if (direction === "DOWN") headY += box;
        if (direction === "LEFT") headX -= box;
        if (direction === "RIGHT") headX += box;

        // Check for collision with walls
        if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height) {
            gameOver = true;
        }

        // Check for collision with self
        for (let i = 1; i < snake.length; i++) {
            if (headX === snake[i].x && headY === snake[i].y) {
                gameOver = true;
            }
        }

        if (gameOver) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }

        // Check if food is eaten
        if (headX === food.x && headY === food.y) {
            score++;
            document.getElementById("score").textContent = score;
            food = {
                x: Math.floor(Math.random() * cols) * box,
                y: Math.floor(Math.random() * rows) * box
            };
        } else {
            snake.pop(); // Remove last segment if no food eaten
        }

        // Add new head
        snake.unshift({ x: headX, y: headY });
    }

    // Draw game
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "lime" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

        // Draw food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);
    }

    // Game loop
    function gameLoop() {
        if (!gameOver) {
            update();
            draw();
            setTimeout(gameLoop, 100);
        }
    }
};
