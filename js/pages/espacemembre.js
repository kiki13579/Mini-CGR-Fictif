document.addEventListener("DOMContentLoaded", () => {
    const actions = document.querySelectorAll(".member-actions button");
    const infoSection = document.querySelector(".member-info");

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userData = JSON.parse(localStorage.getItem("user_" + user?.username));

    actions[0].addEventListener("click", () => { // Réservations
        const panier = JSON.parse(localStorage.getItem("panier")) || [];
        if (panier.length === 0) {
            infoSection.innerHTML = "<p>Votre panier est vide.</p>";
            return;
        }

        let total = 0;
        let html = "<h3>Panier</h3><ul>";
        panier.forEach(item => {
            total += item.places * item.prix;
            html += `<li>${item.film} — ${item.places} place(s)</li>`;
        });
        html += `</ul><p>Total : ${total}€</p>`;
        html += `<button id="btn-payer">Procéder au paiement</button>`;
        infoSection.innerHTML = html;

        document.getElementById("btn-payer").addEventListener("click", () => {
            const modal = document.createElement("div");
            modal.className = "modal";
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Paiement par carte</h3>
                    <p>Total à payer : ${total}€</p>
                    <button id="confirm-paiement">Payer</button>
                </div>`;
            document.body.appendChild(modal);

            document.getElementById("confirm-paiement").addEventListener("click", () => {
                modal.innerHTML = `<div class="modal-content"><p>Vérification en cours...</p><div class="loader"></div></div>`;

                setTimeout(() => {
                    modal.innerHTML = `<div class="modal-content"><p>Paiement accepté ✔</p></div>`;
                    const historique = JSON.parse(localStorage.getItem("historique")) || [];
                    historique.push({
                        films: panier.map(p => ({ film: p.film, places: p.places })),
                        total: total,
                        date: new Date().toISOString()
                    });
                    localStorage.setItem("historique", JSON.stringify(historique));
                    localStorage.removeItem("panier");
                    setTimeout(() => modal.remove(), 3000);
                }, 2500);
            });
        });
    });

    actions[1].addEventListener("click", () => { // Infos perso
        if (!userData) return;
        infoSection.innerHTML = `
            <h3>Informations personnelles</h3>
            <label>ID utilisateur (non modifiable):</label>
            <input type="text" value="${userData.id}" readonly />
            <label>Nom d'utilisateur:</label>
            <input type="text" id="new-username" value="${userData.username}" />
            <label>Mot de passe (non hashé):</label>
            <input type="text" id="new-password" value="${userData.originalPassword || 'non disponible'}" />
            <button id="update-info">Mettre à jour</button>
        `;

        document.getElementById("update-info").addEventListener("click", () => {
            const newUsername = document.getElementById("new-username").value.trim();
            const newPassword = document.getElementById("new-password").value.trim();
            if (!newUsername || !newPassword) return alert("Champs requis");

            const updatedUser = {
                ...userData,
                username: newUsername,
                originalPassword: newPassword
            };
            localStorage.removeItem("user_" + userData.username);
            localStorage.setItem("user_" + newUsername, JSON.stringify(updatedUser));
            localStorage.setItem("currentUser", JSON.stringify({ username: newUsername }));
            alert("Informations mises à jour !");
        });
    });

    actions[2].addEventListener("click", () => { // Historique
        const historique = JSON.parse(localStorage.getItem("historique")) || [];
        if (historique.length === 0) {
            infoSection.innerHTML = "<p>Aucun historique disponible.</p>";
            return;
        }
        let html = "<h3>Historique des paiements</h3><ul>";
        historique.forEach(h => {
            html += `<li><strong>${new Date(h.date).toLocaleString()}</strong> — ${h.total}€ — ${h.films.map(f => `${f.film} (${f.places})`).join(", ")}</li>`;
        });
        html += "</ul>";
        infoSection.innerHTML = html;
    });

    actions[3].addEventListener("click", () => { // Compte
        if (!userData) return;
        const createdAt = new Date(parseInt(userData.id.split("_")[1], 10)).toLocaleString();
        infoSection.innerHTML = `
            <h3>Compte</h3>
            <p>Date de création : ${createdAt}</p>
            <p>Dernière mise à jour : ${new Date().toLocaleString()}</p>
            <button id="delete-account">Supprimer le compte</button>
        `;

        document.getElementById("delete-account").addEventListener("click", () => {
            if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
                localStorage.removeItem("user_" + userData.username);
                localStorage.removeItem("currentUser");
                alert("Compte supprimé.");
                window.location.href = "../index.html";
            }
        });
    });
});
