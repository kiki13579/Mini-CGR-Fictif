document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        

        if (!username || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const storedUser = localStorage.getItem("user_" + username);

        if (!storedUser) {
            alert("Aucun utilisateur trouvé avec ce nom.");
            return;
        }

        const userData = JSON.parse(storedUser);
        const hashedInput = await hashPassword(password);

        if (hashedInput === userData.password) {
            localStorage.setItem("connected", "true");
            localStorage.setItem("user", username);

            alert("Connexion réussie !");
            window.location.href = "../index.html"; // ou espace-membre.html si tu veux
        } else {
            alert("Mot de passe incorrect.");
        }
    });
});
