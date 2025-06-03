document.addEventListener("DOMContentLoaded", () => {
  const maxPlaces = 50;
  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach((item, index) => {
    const filmId = `film${index + 1}`;
    
    // Initialiser le nombre de places si non défini
    if (!localStorage.getItem(filmId)) {
      localStorage.setItem(filmId, maxPlaces);
    }

    const placesRestantes = parseInt(localStorage.getItem(filmId));
    const subcontent = item.querySelector(".carousel-item-subcontent");

    // Vérifie si utilisateur connecté (via localStorage)
    const isLoggedIn = localStorage.getItem("connected") === "true";

    if (isLoggedIn) {
      subcontent.classList.remove("hidden");

      // Crée les éléments HTML
      subcontent.innerHTML = `
        <h4>Réservation</h4>
        <div class="places-left">Places restantes : ${placesRestantes}</div>
        <div class="counter">
          <button class="minus">-</button>
          <span class="count">0</span>
          <button class="plus">+</button>
        </div>
        <button class="reserve-btn">Réserver</button>
        
      `;

      // Ajout de logique JS pour chaque item
      const countSpan = subcontent.querySelector(".count");
      const plusBtn = subcontent.querySelector(".plus");
      const minusBtn = subcontent.querySelector(".minus");
      const reserveBtn = subcontent.querySelector(".reserve-btn");
      const placesLeftDiv = subcontent.querySelector(".places-left");
      let selectedCount = 0;

      plusBtn.addEventListener("click", () => {
        const available = parseInt(localStorage.getItem(filmId));
        if (selectedCount < available) {
          selectedCount++;
          countSpan.textContent = selectedCount;
        }
      });

      minusBtn.addEventListener("click", () => {
        if (selectedCount > 0) {
          selectedCount--;
          countSpan.textContent = selectedCount;
        }
      });

      reserveBtn.addEventListener("click", () => {
        let current = parseInt(localStorage.getItem(filmId));
        if (selectedCount > 0 && selectedCount <= current) {
          current -= selectedCount;
          localStorage.setItem(filmId, current);
          placesLeftDiv.textContent = `Places restantes : ${current}`;
          countSpan.textContent = 0;
          selectedCount = 0;
          alert("Réservation confirmée !");
        } else {
          alert("Réservation impossible !");
        }
      });
    }
  });
});