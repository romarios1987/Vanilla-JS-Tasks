const btn = document.querySelector('.w3-button');
btn.addEventListener('click', function () {
    getPerson(getData);
});

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
};

let getGender = () => document.querySelector('.gender').value;
let getNations = () => document.querySelector('.nations').value;


function getPerson(callback) {
    const url = `https://randomuser.me/api/?gender=${getGender()}&nat=${getNations()}`;
    const ajax = new XMLHttpRequest();

    ajax.open('GET', url, true);

    ajax.onload = function () {
        if (this.status === 200) {
            //into.textContent = this.responseText;
            callback(this.responseText, showData)
        } else {
            this.onerror();
            //console.log(this.statusText);
        }
    };

    ajax.onerror = function () {
        console.log('There was as error!');
    };
    ajax.send();
}


function getData(response, callback) {
    const data = JSON.parse(response);
    const {name: {first, last}, picture: {large}, location: {city}, phone, email, dob: {date, age}} = data.results[0];
    callback(first, last, large, city, phone, email, date, age);
}

function showData(first, last, large, city, phone, email, date, age) {
    document.getElementById('imagePerson').src = large;
    document.querySelector('#fullNamePerson span').textContent = capitalize(first) + ' ' + capitalize(last);
    document.querySelector('#dateBirthPerson span').textContent = date.substring(0, 10) + ' | ' + 'Age ' + age;
    document.querySelector('#cityPerson span').textContent = capitalize(city);
    document.querySelector('#phonePerson span').textContent = phone;
    document.querySelector('#emailPerson span').textContent = email;
}