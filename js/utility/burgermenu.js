 const isUserConnected = true; // Remplace par ton système de session réel

    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopMenu = document.getElementById('desktop-menu');
    const userAvatar = document.getElementById('user-avatar');

    // Burger toggle
    burger.addEventListener('click', () => {
      mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
    });

    // Vérifier l'état de connexion
    if (isUserConnected) {
      // Masquer les menus de connexion/inscription
      burger.style.display = 'none';
      desktopMenu.style.display = 'none';
      mobileMenu.style.display = 'none';
      // Afficher l'avatar
      userAvatar.style.display = 'block';
    }