document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector(".game-container");
  const snake = document.querySelector(".snake");
  const food = document.querySelector(".food");
  const scoreDisplay = document.querySelector(".score");
  const highestScoreDisplay = document.querySelector(".highest-score");

  let snakeLength = 1;
  let snakeCoords = [{ x: 10, y: 10 }];
  let foodCoords = {};
  let direction = "right";
  let score = 0;
  let highestScore = localStorage.getItem("highestScore") || 0;

  function createFood() {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    foodCoords = { x, y };
    food.style.gridColumnStart = x + 1;
    food.style.gridRowStart = y + 1;
  }

  function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
    highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
  }

  function updateSnake() {
    const head = snakeCoords[snakeLength - 1];
    let newX = head.x;
    let newY = head.y;

    if (direction === "right") {
      newX++;
    } else if (direction === "left") {
      newX--;
    } else if (direction === "up") {
      newY--;
    } else if (direction === "down") {
      newY++;
    }

    if (newX === foodCoords.x && newY === foodCoords.y) {
      score++;
      if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", highestScore);
      }
      updateScore();
      snakeLength++;
      createFood();
    }

    if (newX < 0 || newX >= 20 || newY < 0 || newY >= 20) {
      snakeCoords = [{ x: 10, y: 10 }];
      snakeLength = 1;
      score = 0;
      updateScore();
      createFood();
      direction = "right";
      return;
    }

    for (let i = 0; i < snakeCoords.length - 1; i++) {
      if (newX === snakeCoords[i].x && newY === snakeCoords[i].y) {
        snakeCoords = [{ x: 10, y: 10 }];
        snakeLength = 1;
        score = 0;
        updateScore();
        createFood();
        direction = "right";
        return;
      }
    }

    snakeCoords.push({ x: newX, y: newY });

    if (snakeCoords.length > snakeLength) {
      snakeCoords.shift();
    }

    snake.style.gridColumnStart = snakeCoords[snakeLength - 1].x + 1;
    snake.style.gridRowStart = snakeCoords[snakeLength - 1].y + 1;
  }

  function changeDirection(e) {
    if (e.key === "ArrowUp" && direction !== "down") {
      direction = "up";
    } else if (e.key === "ArrowDown" && direction !== "up") {
      direction = "down";
    } else if (e.key === "ArrowRight" && direction !== "left") {
      direction = "right";
    } else if (e.key === "ArrowLeft" && direction !== "right") {
      direction = "left";
    }
  }

  createFood();
  updateScore();

  setInterval(updateSnake, 200);
  document.addEventListener("keydown", changeDirection);
});
