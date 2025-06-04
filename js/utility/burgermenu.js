document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger-menu");
    const mobileNav = document.querySelector(".mobile-nav");

    // Toggle menu on burger click
    burger.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    });

    // Optional: close menu on link click
    const mobileLinks = document.querySelectorAll(".mobile-nav a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        });
    });

    // Optional: close menu if window resizes above 720px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) {
            mobileNav.classList.remove("active");
        }
    });
});