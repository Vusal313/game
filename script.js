const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const finalWinSound = document.getElementById('finalWinSound');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const medal = document.getElementById('medal');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let score = { X: 0, O: 0 };
let round = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickSound.play();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winSound.play();
        message.innerText = `Oyuncu ${currentPlayer} kazandı!`;
        score[currentPlayer]++;
        updateScore();
        round++;
        checkFinalWinner();
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        drawSound.play();
        message.innerText = 'Berabere!';
        round++;
        checkFinalWinner();
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.innerText = '';
    cells.forEach(cell => cell.innerText = '');
}

function updateScore() {
    scoreX.innerText = score.X;
    scoreO.innerText = score.O;
}

function checkFinalWinner() {
    if (round === 3) {
        gameActive = false;
        if (score.X > score.O) {
            message.innerText = 'Oyuncu X Şampiyon!';
            finalWinSound.play();
        } else if (score.O > score.X) {
            message.innerText = 'Oyuncu O Şampiyon!';
            finalWinSound.play();
        } else {
            message.innerText = 'Oyun Berabere!';
        }
        medal.style.display = 'block';
    } else {
        gameActive = true;
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.innerText = '');
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
