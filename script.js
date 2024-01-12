document.addEventListener('DOMContentLoaded', function () {
    
    //get elements
    const ball = document.getElementById('ball');
    const paddle1 = document.getElementById('paddle1');
    const paddle2 = document.getElementById('paddle2');
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');
    const timerDisplay = document.getElementById('timer');
    
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
     
    //functions
    //function to start the game
    function startGame() {
        clearInterval(gameTimer); //clears the existing game timer, if any
        seconds = 0;
        timerDisplay.innerText = '0s';
        
        //sets the initial ball position
        ballX = Math.random() * 400;
        ballY = 100;
        
        //sets initial paddle positions
        paddle1Y = 80;
        paddle2Y = 80;
        
        //calls the function to initiate the game
        gameTimer = setInterval(updateGame, 16);
        }
    
        function updateGame() {
            movePaddles();
            moveBall();
            checkCollision();
            updateTimer();
        }
        
    function movePaddles() {
            //move the users left paddle based on mouse position
            document.addEventListener('mousemove', function (event) {
                paddle1Y = clamp(event.clientY - document.getElementById('game-container').offsetTop - paddle1.clientHeight / 2, 0, 200 - paddle1.clientHeight);
            });
    
            updatePaddlePosition();
    }
    
    function updatePaddlePosition() {
        paddle1.style.top = paddle1Y + 'px';
        paddle2.style.top = paddle2Y + 'px';
    }
    
    function moveBall() {
    }
    function checkCollision() {
    }
    function updateScore() {
    }
        //function to end the game
        function endGame() {
            clearInterval(gameTimer);
            seconds = 0;
            timerDisplay.innerText = '0s';
            //I have to add more stuff here message etc...
        }
    function updateTimer() {
    }
    
        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }
    
        // Call startGame() to initiate the game
        startGame();
    });