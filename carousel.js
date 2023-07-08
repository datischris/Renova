const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowbtns = document.querySelectorAll(".wrapper i ");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];


let isdrag = false, startX, startScrollLeft;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


arrowbtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragstart = (e) => {
    isdrag = true;
    carousel.classList.add("drag");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const drag = (e) => {
    if(!isdrag) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragstop = () => {
    isdrag = false;
    carousel.classList.remove("drag");
}

const autoplay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth,2500);
}
autoplay()

const infinitescroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoplay();

}

carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup",dragstop);
carousel.addEventListener("scroll",infinitescroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("scroll",autoplay);