//board-section

//global variables
const COLS = 7;
const ROWS = 6;
const PLAYER1 = 'player1';
const PLAYER2 = 'player2';
let currentPlayer = PLAYER1;
let gameOver = false;
let noDropAllowed = false;
let board = [];



function initializeGame() {
    console.log("initializeGame()");
    currentPlayer = PLAYER1;
    gameOver = false;
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
    renderBoard();
    updatePlayerDisplay();
    document.getElementById('end-game-windoow').classList.remove('active');
}



function renderBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('button');
            const value = board[row][col];
            cell.className = 'cell ' + (value || '');
            cell.onclick = () => dropPiece(col);
            cell.disabled = gameOver;
            boardEl.appendChild(cell);
        }
    }
}


function dropPiece(col) {
    if (gameOver) return;
    if (noDropAllowed) return;
    // lowest empty row in column
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            //renderBoard();
            const cellIndex = row * COLS + col;
            const cells = document.querySelectorAll('.cell');
            cells[cellIndex].className = 'cell ' +  currentPlayer;
            cells[cellIndex].classList.add('falling');


            noDropAllowed = true;
            setTimeout(() => {
                if (checkWin(row, col)) {
                    gameOver = true;
                    showWinner(currentPlayer);
                }else if (checkfull()){
                    gameOver = true;
                    showWinner('');
                } else {
                    currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
                    updatePlayerDisplay();
                }
                noDropAllowed = false;
            }, 500);



            return;
        }
    }
}

function checkfull(){
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}


function checkWin(row, col) {
    const player = board[row][col];
    if (checkDirection(row, col, 0, 1, player)) return true;
    if (checkDirection(row, col, 1, 0, player)) return true;
    if (checkDirection(row, col, 1, 1, player)) return true;
    if (checkDirection(row, col, 1, -1, player)) return true;
    return false;
}

function checkDirection(row, col, rowDir, colDir, player) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
        const newRow = row + rowDir * i;
        const newCol = col + colDir * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            if (board[newRow][newCol] === player) {
                count++;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    for (let i = 1; i < 4; i++) {
        const newRow = row - rowDir * i;
        const newCol = col - colDir * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            if (board[newRow][newCol] === player) {
                count++;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    return count >= 4;
}

function updatePlayerDisplay() {
    const player1Item = document.getElementById('player1');
    const player2Item = document.getElementById('player2');

    if (currentPlayer === PLAYER1) {
        player1Item.classList.add('active');
        player2Item.classList.remove('active');
    } else {
        player1Item.classList.remove('active');
        player2Item.classList.add('active');
    }
}

function showWinner(player) {
    console.log("showWinner("+player+")");
    if (player === PLAYER1){
        const winnerDisplay = document.getElementById('end-game-display');
        winnerDisplay.className = 'player1';
        winnerDisplay.textContent = 'Player 1 Wins!';
    }else if (player === PLAYER2){
        const winnerDisplay = document.getElementById('end-game-display');
        winnerDisplay.className = 'player2';
        winnerDisplay.textContent = 'Player 2 Wins!';
    }else{
        const winnerDisplay = document.getElementById('end-game-display');
        winnerDisplay.className = 'tie';
        winnerDisplay.textContent = 'TIE';
    }

    document.getElementById('end-game-windoow').classList.add('active');
}




function restartGame() {
    initializeGame();
}

// Initialize the game on page load
initializeGame();