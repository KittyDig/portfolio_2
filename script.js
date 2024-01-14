document.addEventListener("DOMContentLoaded", function () {
  //get elements
  const ball = document.getElementById("ball");
  const paddle1 = document.getElementById("paddle1");
  const paddle2 = document.getElementById("paddle2");
  const player1Score = document.getElementById("player1-score");
  const player2Score = document.getElementById("player2-score");
  const timerDisplay = document.getElementById("timer");

  //sets initial game state
  let winCondition = 3;
  let seconds = 0;
  let gameTimer;
  let ballX = Math.random() * 400;
  let ballY = 100;
  let ballSpeedX = 3;
  let ballSpeedY = 2;
  let paddle1Y = 80;
  let paddle2Y = 80;
  let paddle2Speed = 1;

  /**functions
   *function to start the game
   */
  function startGame() {
    clearInterval(gameTimer); //clears the existing game timer, if any
    seconds = 0;
    timerDisplay.innerText = "0s";

    //sets the initial ball position
    ballX = Math.random() * 400;
    ballY = 100;

    //sets initial paddle positions
    paddle1Y = 80;
    paddle2Y = 80;

    //calls the function to initiate the game
    gameTimer = setInterval(updateGame, 16);
  }

  //function to make the game run as it should
  function updateGame() {
    movePaddles();
    moveBall();
    checkCollision();
    updateTimer();
  }

  //function for moving both paddles
  function movePaddles() {
    //move the users left paddle based on mouse position
    document.addEventListener("mousemove", function (event) {
      paddle1Y = clamp(
        event.clientY -
          document.getElementById("game-container").offsetTop -
          paddle1.clientHeight / 2,
        0,
        200 - paddle1.clientHeight
      );
    });

    //move the right paddle automatically depending on where the ball is, need to add ball next to make sure it works
    if (ballSpeedX > 0) {
      if (ballY < paddle2Y + paddle2.clientHeight / 2) {
        paddle2Y -= paddle2Speed;
      } else {
        paddle2Y += paddle2Speed;
      }
    }
    updatePaddlePosition();
  }

  //function to update the paddle position
  function updatePaddlePosition() {
    paddle1.style.top = paddle1Y + "px";
    paddle2.style.top = paddle2Y + "px";
  }

  //function to move the ball
  function moveBall() {
    //updates the balls speed based on its position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //update the balls position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    //check if the ball goes beyond the paddles, and if it does, add a point to the respective player
    if (ballX < 0 || ballX + ball.clientWidth > 400) {
      if (ballX < 0) {
        //update player 2 score
        updateScore(2);
      } else {
        //update player 1 score
        updateScore(1);
      }
      //resets ball position after a goal is scored
      ballX = Math.random() * 400;
      ballY = 100;
    }
  }

  function checkCollision() {
    //checks collision with the top and bottom walls
    if (ballY <= 0 || ballY + ball.clientHeight >= 200) {
      ballSpeedY = -ballSpeedY;
    }

    //checks collision with the paddles
    if (
      (ballX <= 20 &&
        ballY >= paddle1Y &&
        ballY <= paddle1Y + paddle1.clientHeight) ||
      (ballX + ball.clientWidth >= 380 &&
        ballY >= paddle2Y &&
        ballY <= paddle2Y + paddle2.clientHeight)
    ) {
      ballSpeedX = -ballSpeedX;
    }
  }

  //function to update scores
  function updateScore(player) {
    if (player === 1) {
      player1Score.innerText = parseInt(player1Score.innerText) + 1;
    } else {
      player2Score.innerText = parseInt(player2Score.innerText) + 1;
    }

    if (
      parseInt(player1Score.innerText) === winCondition ||
      parseInt(player2Score.innerText) === winCondition
    ) {
      endGame();
    }
  }

  //function to end the game
  function endGame() {
    clearInterval(gameTimer);
    seconds = 0;
    timerDisplay.innerText = "0s";
    //I have to add more stuff here message etc...
  }
  function updateTimer() {}

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Call startGame() to initiate the game
  startGame();
});