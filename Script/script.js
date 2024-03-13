document.addEventListener("DOMContentLoaded", function () {
  //get elements
  const ball = document.getElementById("ball");
  const paddle1 = document.getElementById("paddle1");
  const paddle2 = document.getElementById("paddle2");
  const player1Score = document.getElementById("player1-score");
  const player2Score = document.getElementById("player2-score");
  const timerDisplay = document.getElementById("timer");

  //sets initial game state
  let winCondition = 5;
  let seconds = 0;
  let gameTimer;
  let ballX = Math.random() * 400;
  let ballY = 100;
  let ballSpeedX = 3;
  let ballSpeedY = 2;
  let paddle1Y = 80;
  let paddle2Y = 80;
  let paddle2Speed = 1;

  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const gameContainer = document.getElementById("game-container");

  //event listener for the start button
  document.getElementById("startButton").addEventListener("click", startGame);

  /**functions
   *function to start the game
   */
  function startGame() {
    clearInterval(gameTimer); //clears the existing game timer, if any
    seconds = 0;
    timerDisplay.innerText = "0s";
    player1Score.innerText = "0";
    player2Score.innerText = "0";
    ballSpeedX = 3;
    ballSpeedY = 2;
    paddle2Speed = 1;

    //sets the initial ball position

    if (screenWidth < 950) {
      // ball position for smaller screen sizes
      ballX = (screenWidth / 2) * 0.8;
      ballY = (screenHeight / 5) * 0.9;

      paddle1Y = (screenHeight / 4 - paddle1.clientHeight / 4) * 0.01;
      paddle2Y = (screenHeight / 4 - paddle2.clientHeight / 4) * 0.01;
    } if (screenWidth < 450) {
      // ball position for smaller screen sizes
      ballX = (screenWidth / 2) * 0.5;
      ballY = (screenHeight / 5) * 0.5;

      paddle1Y = (screenHeight / 4 - paddle1.clientHeight / 4) * 0.01;
      paddle2Y = (screenHeight / 4 - paddle2.clientHeight / 4) * 0.01;
    } else {
      // ball position for larger screen sizes
      ballX = 400;
      ballY = Math.random() * (gameContainer.clientHeight - 40) + 20;

      paddle1Y = 80 * 0.01;
      paddle2Y = 80 * 0.01;
    }
    //calls the function to initiate the game
    gameTimer = setInterval(updateGame, 16);
  }

  /** function to make the game run as it should
   */
  function updateGame() {
    movePaddles();
    moveBall();
    checkCollision();
    updateTimer();
  }

  /** function for moving both paddles
   */
  function movePaddles() {
    //move the users left paddle based on mouse position
    document.addEventListener("mousemove", function (event) {
      paddle1Y = clamp(
        event.clientY -
          document.getElementById("game-container").offsetTop -
          paddle1.clientHeight / 2,
        0,
        400 - paddle1.clientHeight
      );
    });

    //gets the element reference for the paddle
    const paddle1 = document.getElementById("paddle1");

    //moves the user's left paddle based on touch position
    paddle1.addEventListener("touchmove", function (event) {
      //prevent default to avoid scrolling on touch devices
      event.preventDefault();

      //gets the touch position relative to the game container
      const touchY =
        event.touches[0].clientY -
        document.getElementById("game-container").offsetTop -
        paddle1.clientHeight / 2;

      //updates paddle position
      paddle1Y = clamp(touchY, 0, 400 - paddle1.clientHeight);
    });

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    //moves the right paddle automatically depending on where the ball is
    if (ballSpeedX > 0) {
      if (ballY < paddle2Y + paddle2.clientHeight / 2) {
        paddle2Y -= paddle2Speed;
      } else {
        paddle2Y += paddle2Speed;
      }
    }
    updatePaddlePosition();
  }

  /** function to update the paddle position
   */
  function updatePaddlePosition() {
    paddle1.style.top = paddle1Y + "px";
    paddle2.style.top = paddle2Y + "px";
  }

  /** function to move the ball
   */
  function moveBall() {
    //updates the balls speed based on its position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //update the balls position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    //check if the ball goes beyond the paddles, and if it does, add a point to the respective player
    if (screenWidth < 950) {
      if (ballX < 0 || ballX + ball.clientWidth > screenWidth * 0.9) {
        if (ballX < 0) {
          //update player 2 score
          updateScore(2);
        } else {
          //update player 1 score
          updateScore(1);
        }
        //resets ball position after a goal is scored
        ballX = screenWidth * 0.5;
        ballY = Math.random() * 180;
      }
    } else {
      if (ballX < 0 || ballX + ball.clientWidth > 800) {
        if (ballX < 0) {
          //update player 2 score
          updateScore(2);
        } else {
          //update player 1 score
          updateScore(1);
        }

        //resets ball position after a goal is scored
        ballX = 400;
        ballY = Math.random() * 400;
      }
    }
  }

  /** function to check collision
   */
  function checkCollision() {
    //checks collision with the top and bottom walls
    if (screenWidth < 950) {
      if (ballY <= 0 || ballY + ball.clientHeight >= 190) {
        ballSpeedY = -ballSpeedY;
      }
    } else {
      if (ballY <= 0 || ballY + ball.clientHeight >= 400) {
        ballSpeedY = -ballSpeedY;
      }
    }
    console.log("Screen Width:", screenWidth);

    //checks collision with the paddles
    if (screenWidth < 950) {
      if (
        (ballX <= 20 &&
          ballY >= paddle1Y &&
          ballY <= paddle1Y + paddle1.clientHeight) ||
        (ballX + ball.clientWidth >= screenWidth * 0.86 &&
          ballY >= paddle2Y &&
          ballY <= paddle2Y + paddle2.clientHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }
    } else {
      if (
        (ballX <= 20 &&
          ballY >= paddle1Y &&
          ballY <= paddle1Y + paddle1.clientHeight) ||
        (ballX + ball.clientWidth >= 780 &&
          ballY >= paddle2Y &&
          ballY <= paddle2Y + paddle2.clientHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }
    }
  }

  /** function to make the game harder for the player
   */
  function increaseSpeed() {
    ballSpeedX *= 1.4;
    paddle2Speed *= 1.25;
  }

  /** function to update scores
   */
  function updateScore(player) {
    if (player === 1) {
      player1Score.innerText = parseInt(player1Score.innerText) + 1;
      increaseSpeed();
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

  /** function to display a modal
   */
  function displayModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
  }

  /** function to close the modal
   */
  function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  /** function to end the game
   */
  function endGame() {
    clearInterval(gameTimer);
    seconds = 0;
    timerDisplay.innerText = "0s";

    //determine the winner
    let winner = "";
    if (parseInt(player1Score.innerText) === winCondition) {
      winner = "Congratulations, you won!";
    } else if (parseInt(player2Score.innerText) === winCondition) {
      winner = "Better luck next time!";
    }

    //display a message using the modal
    displayModal(winner);
    setTimeout(closeModal, 3000);
  }

  let lastUpdateTime = new Date().getTime();

  /**function to update the timer
   */
  function updateTimer() {
    const currentTime = new Date().getTime();
    if (currentTime - lastUpdateTime >= 1000) {
      seconds++;
      timerDisplay.innerText = seconds + "s";
      lastUpdateTime = currentTime;
    }
  }
  /** function to clamp a value between a minimum and maximum
   */
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
});

// https://stackoverflow.com/questions/10814838/document-addeventlistenertouchmove-preventbehavior-false-prevents-me-us used to
// add touch-screen controls to the game
