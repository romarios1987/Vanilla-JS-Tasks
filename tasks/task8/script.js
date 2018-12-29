'use strict';

// Get modal element
const modal = document.getElementById('simpleModal');

// Get open modal button
const modalBtn = document.getElementById('modalBtn');

// Get close button
const closeBtn = document.getElementsByClassName('closeBtn')[0];


// Listen for open click
modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Listen for close click
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});