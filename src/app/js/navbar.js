export function handleNavbarScroll(navbarSelector, navbarOffset) {
    document.addEventListener("DOMContentLoaded", () => {

        let lastScrollTop = 0;
        const navbar = document.querySelector(navbarSelector);
        const navbarHeight = navbarOffset || navbar.offsetHeight;
        
        window.addEventListener("scroll", function () {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scroll hacia abajo - oculta el navbar
                navbar.style.top = `-${navbarHeight}px`;
            } else {
                // Scroll hacia arriba - muestra el navbar
                navbar.style.top = "0";
            }

            lastScrollTop = scrollTop;

        });
    });
}

handleNavbarScroll("#navbar");