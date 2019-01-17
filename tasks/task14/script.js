'use strict';

let steps = 0;
const puzzle = document.querySelector('#puzzle');
let condition = 1; // состояние


let sec = "00";
let min = 0;
let seconds;
let minutes;
const div_sec = document.querySelector('#sec');
const div_min = document.querySelector('#min');


function startTimer() {
    seconds = setInterval(secTimer, 1000);
    minutes = setInterval(minTimer, 60000);
}

function secTimer() {
    sec++;
    if (sec < 10) {
        sec = "0" + sec;
    }
    else if (sec > 59) {
        sec = "0" + 0;
    }
    div_sec.innerHTML = sec;
}

function minTimer() {
    min++;
    div_min.innerHTML = min;
}

function clearTimer() {
    clearInterval(seconds);
    clearInterval(minutes);

}

function resetTimer() {
    sec = "00";
    min = 0;
    div_sec.innerHTML = sec;
    div_min.innerHTML = min;
}


// Creates solved puzzle
solve();


// Listens for click on puzzle cells
puzzle.addEventListener('click', e => {

    if (condition === 1) {
        // Enables sliding animation
        steps++;
        puzzle.className = 'animate';
        shiftCell(e.target);
        showScore();

    }
});

// Listens for click on control buttons
document.querySelector('#solve').addEventListener('click', solve);
document.querySelector('#scramble').addEventListener('click', scramble);


function showScore() {
    document.querySelector("#score").innerHTML = (`MOVES = ${steps}`);
}


function solve() {

    if (condition === 0) {
        return;
    }

    puzzle.innerHTML = '';

    let n = 1;
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            const cell = document.createElement('span');
            cell.id = 'cell-' + i + '-' + j;
            cell.style.left = (j * 80 + 1 * j + 1) + 'px';
            cell.style.top = (i * 80 + 1 * i + 1) + 'px';

            if (n <= 15) {
                cell.classList.add('number');
                cell.classList.add((i % 2 === 0 && j % 2 > 0 || i % 2 > 0 && j % 2 === 0) ? 'dark' : 'light');
                cell.innerHTML = (n++).toString();
            } else {
                cell.className = 'empty';
            }

            puzzle.appendChild(cell);
        }
    }
}


function shiftCell(cell) {

    // Checks if selected cell has number
    if (!cell.classList.contains('.empty')) {

        // Tries to get empty adjacent cell
        const emptyCell = getEmptyAdjacentCell(cell);

        if (emptyCell) {
            // Temporary data
            const tmp = {style: cell.style.cssText, id: cell.id};

            // Exchanges id and style values
            cell.style.cssText = emptyCell.style.cssText;
            cell.id = emptyCell.id;
            emptyCell.style.cssText = tmp.style;
            emptyCell.id = tmp.id;

            if (condition === 1) {
                // Checks the order of numbers

                checkOrder();
            }
        }
    }

}


function getCell(row, col) {

    return document.querySelector(`#cell-${row}-${col}`);

}


function getEmptyCell() {

    return puzzle.querySelector('.empty');

}


function getEmptyAdjacentCell(cell) {

    // Gets all adjacent cells
    const adjacent = getAdjacentCells(cell);

    // Searches for empty cell
    for (let i = 0; i < adjacent.length; i++) {
        if (adjacent[i].className === 'empty') {
            return adjacent[i];
        }
    }

    // Empty adjacent cell was not found
    return false;

}


function getAdjacentCells(cell) {

    const id = cell.id.split('-');

    // Gets cell position indexes
    const row = parseInt(id[1]);
    const col = parseInt(id[2]);

    const adjacent = [];

    // Gets all possible adjacent cells
    if (row < 3) {
        adjacent.push(getCell(row + 1, col));
    }
    if (row > 0) {
        adjacent.push(getCell(row - 1, col));
    }
    if (col < 3) {
        adjacent.push(getCell(row, col + 1));
    }
    if (col > 0) {
        adjacent.push(getCell(row, col - 1));
    }

    return adjacent;

}


function checkOrder() {

    // Checks if the empty cell is in correct position
    if (getCell(3, 3).className !== 'empty') {
        return;
    }

    let n = 1;
    // Goes through all cells and checks numbers
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            if (n <= 15 && getCell(i, j).innerHTML !== n.toString()) {
                // Order is not correct
                return;
            }
            n++;
        }
    }
    if (confirm(`YOU WIN!. You made ${steps} moves! Your time is ${min} min and  ${sec} sec. Scramble the puzzle? `)) {
        scramble();
    }

}


function scramble() {

    if (condition === 0) {
        return;
    }

    puzzle.removeAttribute('class');
    condition = 0;

    let previousCell;
    let i = 1;
    const interval = setInterval(() => {
        if (i <= 100) {
            const adjacent = getAdjacentCells(getEmptyCell());
            if (previousCell) {
                for (let j = adjacent.length - 1; j >= 0; j--) {
                    if (adjacent[j].innerHTML === previousCell.innerHTML) {
                        adjacent.splice(j, 1);
                    }
                }
            }
            // Gets random adjacent cell and memorizes it for the next iteration
            previousCell = adjacent[rand(0, adjacent.length - 1)];
            shiftCell(previousCell);
            i++;
        } else {
            clearInterval(interval);
            condition = 1;
        }
    }, 5);

    steps = 0;
    showScore();
    clearTimer();
    resetTimer();
    startTimer();

}


function rand(from, to) {

    return Math.floor(Math.random() * (to - from + 1)) + from;
}

