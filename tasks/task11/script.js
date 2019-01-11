'use strict';


const slides = document.querySelectorAll('.slider-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const dotsWrap = document.querySelector('.slider-dots');
const dots = document.querySelectorAll('.dot');

// current slide
let slideIndex = 1;


showSlides(slideIndex);

function showSlides(n) {

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach((slide) => slide.style.display = 'none');

    dots.forEach((dot) => dot.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}


function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener('click', () => {
    plusSlides(-1);
});
next.addEventListener('click', () => {
    plusSlides(1);
});

dotsWrap.addEventListener('click', (e) => {
    for (let i = 0; i < dots.length + 1; i++) {
        if (e.target.classList.contains('dot') && e.target === dots[i - 1]) {
            currentSlide(i)
        }
    }
});