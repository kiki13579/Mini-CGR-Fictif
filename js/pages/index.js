document.addEventListener("DOMContentLoaded", () => {
  const maxPlaces = 50;
  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach((item, index) => {
    const filmId = `film${index + 1}`;
    const filmName = item.dataset.name || `Film ${index + 1}`;

    if (!localStorage.getItem(filmId)) {
      localStorage.setItem(filmId, maxPlaces);
    }

    const placesRestantes = parseInt(localStorage.getItem(filmId));
    const subcontent = item.querySelector(".carousel-item-subcontent");
    const isLoggedIn = localStorage.getItem("connected") === "true";

    if (isLoggedIn) {
      subcontent.classList.remove("hidden");

      subcontent.innerHTML = `
        <h4>Réservation</h4>
        <div class="places-left">Places restantes : ${placesRestantes}</div>
        <div class="counter">
          <button class="minus">-</button>
          <span class="count">0</span>
          <button class="plus">+</button>
        </div>
        <button class="reserve-btn">Ajouter au panier</button>
      `;

      const countSpan = subcontent.querySelector(".count");
      const plusBtn = subcontent.querySelector(".plus");
      const minusBtn = subcontent.querySelector(".minus");
      const reserveBtn = subcontent.querySelector(".reserve-btn");
      let selectedCount = 0;

      plusBtn.addEventListener("click", () => {
        if (selectedCount < placesRestantes) {
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
        if (selectedCount > 0) {
          const panier = JSON.parse(localStorage.getItem("panier")) || [];
          const existing = panier.find(item => item.filmId === filmId);
          if (existing) {
            existing.places += selectedCount;
          } else {
            panier.push({ filmId, name: filmName, places: selectedCount });
          }

          localStorage.setItem("panier", JSON.stringify(panier));

          // Affichage de la modale
          const modal = document.getElementById("confirmation-modal");
          const modalTitle = document.getElementById("modal-title");
          const modalMessage = document.getElementById("modal-message");

          modalTitle.textContent = filmName;
          modalMessage.textContent = `Vous avez ajouté ${selectedCount} place(s) à votre panier.`;

          modal.classList.remove("hidden");

          // Masquer la modale automatiquement après 3 secondes
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 1500);

          selectedCount = 0;
          countSpan.textContent = "0";
          } else {
            alert("Veuillez sélectionner au moins une place.");
          }
        });
      }
    });
  });