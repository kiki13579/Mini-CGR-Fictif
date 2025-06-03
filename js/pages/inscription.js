document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");
    const modal = document.getElementById("modal");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) return;

        const userId = "user_" + Date.now();

        hashPassword(password).then(hashedPassword => {
            const userData = {
                id: userId,
                username,
                password: hashedPassword
            };

            localStorage.setItem("user_" + username, JSON.stringify(userData));
            localStorage.setItem("loggedInUser", username);

            // Affiche la modale
            modal.classList.remove("hidden");

            // Redirige après un court délai
            setTimeout(() => {
                window.location.href = "../html/espace-membre.html";
            }, 3000);
        });
    });
});