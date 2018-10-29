const btn = document.querySelector('.w3-button');
btn.addEventListener('click', function () {
    getPerson(getData);
});

function getPerson(callback) {
    const url = `https://randomuser.me/api/?nat=us,dk,fr,gb`;
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

    //callback(data);


    const {name: {first}, name: {last}, picture: {large}, location: {city}, phone, email} = data.results[0];

    callback(first, last, large, city, phone, email);
}

function showData(first, last, large, city, phone, email) {
    document.getElementById('imagePerson').src = large;
    document.getElementById('firstNamePerson').textContent = first;
    document.getElementById('lastNamePerson').textContent = last;
    document.getElementById('cityPerson').textContent = city;
    document.getElementById('phonePerson').textContent = phone;
    document.getElementById('emailPerson').textContent = email;

    //console.log(data)
}