document.addEventListener("DOMContentLoaded", () => {
    const isConnected = localStorage.getItem("connected") === "true";

    if (!isConnected) {
      // Redirige vers la page de connexion
      window.location.href = "../html/connexion.html";
    }
  });