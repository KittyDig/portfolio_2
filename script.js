document.addEventListener('DOMContentLoaded', function () {
    
//get elements
let ball = document.getElementById('ball');
let paddle1 = document.getElementById('paddle1');
let paddle2 = document.getElementById('paddle2');
let player1Score = document.getElementById('player1-score');
let player2Score = document.getElementById('player2-score');
let timerDisplay = document.getElementById('timer');

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
}

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
}
function movePaddles() {
}
function updatePaddlePosition() {
}
function moveBall() {
}
function checkCollision() {
}
function updateScore() {
}
function endGame() {
}
function updateTimer() {
}

//calls function to initiate the game
startGame();