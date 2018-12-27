'use strict';

function getNum() {
    let number = '';
    while (number.length < 4) {
        let newNumber = Math.floor((Math.random() * 10));
        if (number.indexOf(newNumber) < 0) {
            number += newNumber;
        }
    }
    return number;
}



function checkFourDigits(num){
    if(num.length === 4){
        return true;
    }
    // alert('Enter four numbers');
    M.toast({
        html: 'Enter four numbers!',
        classes: 'rounded red'
    });
}



function checkIsNumber(num) {
    if (Boolean(num) && isFinite(num)) {
        return true
    }
    //alert('The value entered must be a number');
    M.toast({
        html: 'The value entered must be a number!',
        classes: 'rounded red'
    });
}


function isUnique(str) {
    let letter;
    for (let i = 0; i < str.length; i++) {
        letter = str[i];
        if (str.indexOf(letter, i + 1) > -1) {
            //alert('Each number must be unique');
            M.toast({
                html: 'Each number must be unique!',
                classes: 'rounded red'
            });
            return false;
        }
    }
    return true;
}


let form = document.getElementById('form');
let secret = getNum();



function check(enterN) {
    let bulls = 0;
    let cows = 0;

    let turns = parseInt(document.querySelector('.turns').innerHTML);

    for (let i = 0; i < 4; i++) {
        if (enterN[i] === secret[i]) {
            bulls++
        } else if (enterN.indexOf(secret[i]) >= 0) {
            cows++
        }
    }

    turns--;
    document.querySelector('.turns').innerHTML = turns;

    if(turns === 0 || bulls === 4){
        let status = 'Loose';
        if(bulls === 4){
            status = 'Win';
        }
        endGame(enterN, turns, status);
    }
    writeInfo(enterN, bulls, cows);
}


function endGame(par, turns, status){
    //let resInfo = document.getElementById('res_info');
    //resInfo.innerHTML = (`You ${status}, right number ${secret}`);

    M.toast({html: `You ${status}, right number ${secret}`, classes: 'teal'});


    setTimeout(() =>{
        location.reload();
    }, 3000);

}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let enterNumber = document.querySelector('#enterNumber').value;

    if(checkFourDigits(enterNumber) && checkIsNumber(enterNumber) && isUnique(enterNumber)){
        check(enterNumber);
    }
    form.reset();
});


function writeInfo(par, b, c) {
    let res = document.getElementById('result');
    let newLine = document.createElement('li');
    newLine.classList.add("collection-item");
    newLine.innerHTML = (`Attempt <b>${par}</b> ${b} bulls | ${c} cows`);
    res.appendChild(newLine);
}

