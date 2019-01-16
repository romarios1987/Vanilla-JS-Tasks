'use strict';

const update = document.querySelector('.status-text');
const tiles = Array.from(document.querySelectorAll('.tile'));
const playAgain = document.querySelector('.play-again');
let player = true;
let moves = 1;
const score = {
    x: 0,
    o: 0,
    ties: 0
};

updateScore();
resetBoard();


function resetBoard() {
    moves = 1;
    if (player) {
        document.body.classList.add('x');
    } else {
        document.body.classList.add('o');
    }
    update.textContent = `Player ${document.body.className.toUpperCase()}`;
    tiles.forEach(tile => {
        tile.textContent = '';
        tile.classList.remove('tile-off', 'tile-win');
        tile.classList.add('active');
        tile.addEventListener('click', ticTacToe);
    });
    playAgain.classList.toggle('button-on');
}

function disableBoard() {
    document.body.classList.remove('x');
    document.body.classList.remove('o');
    tiles.forEach(tile => {
        tile.removeEventListener('click', ticTacToe);
        tile.classList.remove('active');
    })
}

function updateScore() {
    document.querySelector('.score-x').textContent = score.x;
    document.querySelector('.score-ties').textContent = score.ties;
    document.querySelector('.score-o').textContent = score.o;
}

function ticTacToe(event) {
    const tile = event.target;
    const currentPlayer = document.body.className.toUpperCase();
    if (!tile.className.includes('tile')) return;
    if (tile.textContent) return;
    tile.textContent = currentPlayer;
    tile.removeEventListener('click', ticTacToe);
    tile.classList.remove('active');
    const winner = findWinner();
    if (winner) {
        update.textContent = currentPlayer + ' wins!';
        if (currentPlayer === 'X') {
            score.x += 1;
            player = false;
        } else {
            score.o += 1;
            player = true;
        }


        tiles.filter((tile, index) => winner.indexOf(index) < 0).forEach(tileOff => tileOff.classList.add('tile-off'));
        tiles.filter((tile, index) => winner.indexOf(index) >= 0).forEach(tileWin => tileWin.classList.add('tile-win'));

        disableBoard();
        updateScore();

        playAgain.addEventListener('click', resetBoard);
        playAgain.classList.toggle('button-on');
    } else if (moves === 9) {

        // it's a tie
        update.textContent = 'It\'s a tie!';
        score.ties += 1;
        disableBoard();
        updateScore();
        playAgain.addEventListener('click', resetBoard);
        playAgain.classList.toggle('button-on');
    } else {
        moves = moves + 1;
        player = !player;
        document.body.classList.toggle('x');
        document.body.classList.toggle('o');
        update.textContent = `Player ${document.body.className.toUpperCase()}`;
    }
}

function findWinner() {
    const winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]];
    const winningSet = winningCombination.findIndex(combo =>
        combo.every(tileIndex =>
            tiles[tileIndex].textContent === document.body.className.toUpperCase()));
    return (winningSet < 0) ? false : winningCombination[winningSet];
}