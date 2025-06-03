const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
let currentIndex = 0;

const isMobileOrTablet = window.innerWidth <= 1024;
const intervalTime = isMobileOrTablet ? 10000 : 3000;

let intervalId; // pour pouvoir l’arrêter / redémarrer

function moveToSlide(index) {
  track.style.transform = 'translateX(' + (-index * 100) + '%)';
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  moveToSlide(currentIndex);
}

function startAutoSlide() {
  intervalId = setInterval(autoSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

// Démarre le carousel automatiquement
startAutoSlide();

// Ajoute les événements à chaque slide
slides.forEach(slide => {
  slide.addEventListener('mouseenter', stopAutoSlide);
  slide.addEventListener('mouseleave', startAutoSlide);
});