const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
let currentIndex = 0;
const intervalTime = 10000;
function moveToSlide(index) {
  track.style.transform = 'translateX(' + (-index * 100) + '%)';
}
function autoSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  moveToSlide(currentIndex);
}

setInterval(autoSlide, intervalTime);