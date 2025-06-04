document.addEventListener("DOMContentLoaded", () => {
    const isConnected = localStorage.getItem("connected") === "true";

    if (isConnected) {
      // Redirection vers l'accueil ou l'espace membre
      window.location.href = "../index.html"; // ou "./espace-membre.html"
    }
  });