document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const desktopMenu = document.querySelector(".desktop-menu");
    const isConnected = localStorage.getItem("connected") === "true";

    // Fonction pour mettre à jour les liens
    function setMenuLinks(menuContainer) {
        menuContainer.innerHTML = ""; // On vide le menu

        // Lien Accueil
        const accueil = document.createElement("a");
        accueil.href = "../index.html";
        accueil.textContent = "Accueil";
        menuContainer.appendChild(accueil);

        if (isConnected) {
            const membre = document.createElement("a");
            membre.href = "./espace-membre.html";
            membre.textContent = "Espace Membre";

            const logout = document.createElement("a");
            logout.href = "#";
            logout.textContent = "Déconnexion";
            logout.addEventListener("click", () => {
                localStorage.removeItem("connected");
                localStorage.removeItem("user"); // si utilisé
                window.location.href = "./index.html";
            });

            menuContainer.appendChild(membre);
            menuContainer.appendChild(logout);
        } else {
            const login = document.createElement("a");
            login.href = "./connexion.html";
            login.textContent = "Connexion";

            const register = document.createElement("a");
            register.href = "./inscription.html";
            register.textContent = "Inscription";

            menuContainer.appendChild(login);
            menuContainer.appendChild(register);
        }
    }

    // Applique les liens dynamiquement
    setMenuLinks(mobileNav);
    setMenuLinks(desktopMenu);

    // Toggle menu on burger click
    burger.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    });

    // Fermer le menu mobile quand on clique sur un lien
    mobileNav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            mobileNav.classList.remove("active");
        }
    });

    // Ferme le menu mobile si on redimensionne au-dessus de 720px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) {
            mobileNav.classList.remove("active");
        }
    });
});