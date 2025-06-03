document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");
    const modal = document.getElementById("modal");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) return;

        // Génère un ID simple pour le compte
        const userId = "user_" + Date.now();

        hashPassword(password).then(hashedPassword => {
            const userData = {
                id: userId,
                username,
                password: hashedPassword
            };
            localStorage.setItem("user_" + username, JSON.stringify(userData));
            localStorage.setItem("loggedInUser", username);

            modal.classList.remove("hidden");

            setTimeout(() => {
                window.location.href = "../html/espace-membre.html";
            }, 1500);
        });

        // Stocke dans localStorage
        localStorage.setItem("user_" + username, JSON.stringify(userData));
        localStorage.setItem("loggedInUser", username); // Pour suivre qui est connecté

        // Affiche modale
        modal.classList.remove("hidden");

        // Simule chargement puis redirection
        setTimeout(() => {
            window.location.href = "../html/espace-membre.html";
        }, 3000);
    });
});