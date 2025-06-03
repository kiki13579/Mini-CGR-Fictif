let currentIndex = 0;
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');

  function moveSlide(direction) {
    const totalItems = items.length;
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    const offset = -currentIndex * 300; // largeur du conteneur
    track.style.transform = `translateX(${offset}px)`;
  }