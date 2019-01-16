'use strict';
const newGameBtn = document.querySelector('#new-game');

let arr;

function createTable() {
    arr = [];
    const newTable = document.createElement("table");
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement("tr");

        let row = [];
        for (let j = 0; j < 10; j++) {
            const td = document.createElement("td");
            td.innerHTML = "<div class='item-clicked' onclick=b_click(" + i + "," + j + ")></div>";
            tr.appendChild(td);
            row = [...row, null];
        }
        newTable.appendChild(tr);
        arr = [...arr, row];

    }
    random();
    numbers();
    return newTable;
}


function new_game() {
    const table = document.getElementsByTagName("table");
    document.querySelector('.wrap-table').replaceChild(createTable(), table[0]);
}

function b_click(r, c) {
    console.log(arr[c]);
    if (arr[r][c] === "&#9899") {
        boom(r, c);
    }
    else {
        open(r, c);
    }
}

function boom(r, c) {
    const table = document.body.getElementsByTagName("table")[0];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            table.rows[i].cells[j].innerHTML = arr[i][j];
        }
    }
    table.rows[r].cells[c].innerHTML = "&#10039";
    table.rows[r].cells[c].setAttribute("style", "background-color:red;")
}

function random() {
    for (let j = 0; j < 14;) {
        const r = Math.floor(Math.random() * 10);
        const c = Math.floor(Math.random() * 10);
        if (arr[r][c] == null) {
            arr[r][c] = "&#9899";
            j++;
        }
    }
}

function numbers() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (arr[i][j] == null && s(i, j) !== 0) {
                arr[i][j] = s(i, j);
            }
        }
    }
}

function s(i, j) {
    let sum = 0;
    for (let r = i - 1; r < i + 2; r++) {
        for (let c = j - 1; c < j + 2; c++) {
            if (arr[r] !== undefined && arr[r][c] === "&#9899") {
                sum += 1;
            }
        }
    }
    return sum;
}

function open(r, c) {
    if (0 <= r && r < 10 && 0 <= c && c < 10) {
        if (arr[r][c] !== null) document.body.getElementsByTagName("table")[0].rows[r].cells[c].innerHTML = arr[r][c];

        else if (document.body.getElementsByTagName("table")[0].rows[r].cells[c].firstChild !== null) {
            document.body.getElementsByTagName("table")[0].rows[r].cells[c].innerHTML = arr[r][c];
            for (let i = r - 1; i < r + 2; i++) {
                for (let j = c - 1; j < c + 2; j++) {
                    open(i, j);
                }
            }
        }
    }
}


newGameBtn.addEventListener('click', new_game);


