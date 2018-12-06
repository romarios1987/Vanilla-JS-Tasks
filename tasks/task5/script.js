const mainForm = document.getElementById('main-form');

const inputField = {
    'first_name': document.getElementById('first_name'),
    'last_name': document.getElementById('last_name'),
    'birthday': document.getElementById('birthday'),
    'address': document.getElementById('address'),
    'email': document.getElementById('email'),
    'country': document.getElementById('country'),
    'password': document.getElementById('password')
};

// Validation Function
function validateRadioBtn() {
    const error_radio = document.getElementById('invalid-feedback-radio');
    let valid = false;
    const gender = document.getElementsByName('gender');
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            valid = true;
            break;
        }
    }
    if (valid) {
        error_radio.innerText = '';
        return true;
    } else {
        error_radio.innerText = 'Please choose your Gender: Male or Female';
        return false
    }
}

// Add method to prototype String
String.prototype.firstLetterCaps = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function checkTextValue(text_value) {
    const regexpName = new RegExp(/^\w[^\"\']+$/i);
    return regexpName.test(text_value);
}

function checkPassword(password) {
    const regexpName = new RegExp('^[a-zA-Z0-9_-]{3,16}$');
    return regexpName.test(password);
}

function checkCountry() {
    if (document.getElementById('country').value === "") {
        document.getElementById('country').focus(); //set focus back to control
        return false;
    } else {
        return true;
    }
}

function checkEmailValue(email_value) {

    const regexpName = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexpName.test(email_value);
}


function validate(inputFields) {
    const validationArray = [];

    if (inputFields) {
        for (let prop in inputFields) {
            if (inputFields.hasOwnProperty(prop)) {
                const nameField = prop;
                const dataValue = inputFields[prop].dataset.validation;
                const inputValue = inputFields[prop].value;
                let valid = false;
                let errorMessage = '';

                if (inputValue !== '') {

                    // Checking First Name & Last name & Address (text fields)
                    if (dataValue === 'first_name' || dataValue === 'last_name' || dataValue === 'address') {
                        valid = checkTextValue(inputValue);
                        if (!valid) {
                            errorMessage = `${nameField.firstLetterCaps().replace('_', ' ')}field incorrect data`;
                        }
                    }

                    // Checking Email
                    else if (dataValue === 'email') {
                        valid = checkEmailValue(inputValue);
                        if (!valid) {
                            errorMessage = `${nameField.firstLetterCaps()} Invalid`;
                        }
                    }

                    // Checking Password
                    else if (dataValue === 'password') {
                        valid = checkPassword(inputValue);
                        if (!valid) {
                            errorMessage = `${nameField.firstLetterCaps()} length must be 3-16 characters`;
                        }
                    }

                    // check field Birth
                    else if (dataValue === 'birthday') {
                        valid = new Date(inputValue) < new Date(Date.now());
                        if (!valid) {
                            errorMessage = "Date should not be in future";
                        }
                    }

                    // Checking Country
                    else if (nameField === 'country') {
                        valid = checkCountry();
                        if (valid) {
                            errorMessage = ``;
                        }
                    }
                } else {
                    errorMessage = `Field ${nameField.firstLetterCaps().replace('_', ' ')} is required!`;
                }
                const result = {
                    name: nameField,
                    value: inputValue,
                    valid: valid,
                    message: errorMessage
                };
                validationArray.push(result);
            }

        }
        return validationArray;
    }
}

// removeClassSuccess Function
function removeClassSuccess() {
    for (let prop in inputField) {
        const id = inputField[prop].id;
        inputField[id].classList.remove('has-success');
    }
}

mainForm.onsubmit = function (e) {
    e.preventDefault();

    const checkOnValid = validate(inputField);

    let isInValid = 0;

    if (checkOnValid) {
        for (let prop in checkOnValid) {
            if (checkOnValid.hasOwnProperty(prop)) {
                const name = checkOnValid[prop].name;
                inputField[name].classList.remove('has-error');
                inputField[name].classList.remove('has-success');
                inputField[name].parentNode.querySelector('.invalid-feedback').innerText = '';

                if (!checkOnValid[prop].valid) {
                    const displayError = inputField[name].parentNode.querySelector('.invalid-feedback');
                    displayError.style.display = "block";
                    displayError.innerText = checkOnValid[prop].message;
                    inputField[name].classList.add('has-error');
                    isInValid++;

                } else {
                    inputField[name].classList.add('has-success');
                }
            }
        }

        if (validateRadioBtn() === true) {
            if (isInValid === 0) {
                removeClassSuccess();
                mainForm.reset();
                alert('Validation passed');
            }
        }

    }
};

