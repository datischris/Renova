const hamburgerElement = document.querySelector('.hamburger');
const navElement = document.querySelector('.nav');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('nav--open');
    hamburgerElement.classList.toggle('hamburger--open');

});