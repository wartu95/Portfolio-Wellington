
    // script para modo oscuro

    // Obtener elementos del DOM
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
    const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");

            // Función para alternar el tema
            function toggleDarkMode() {
                // Cambiar el tema
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                    themeToggleLightIcon.classList.add('hidden');
                    themeToggleDarkIcon.classList.remove('hidden');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                    themeToggleLightIcon.classList.remove('hidden');
                    themeToggleDarkIcon.classList.add('hidden');
                }
            }

        // Configuración inicial
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleLightIcon.classList.add('hidden');
            themeToggleDarkIcon.classList.remove('hidden');
        }

        // Event listener para el botón
        themeToggleBtn.addEventListener('click', toggleDarkMode);







// script para mostrar y ocultar el menú móvil
document.addEventListener("DOMContentLoaded", function () {
    const movilMenuButton = document.getElementById("movil-menu-button");
    const movilMenu = document.getElementById("movil-menu");

    movilMenuButton.addEventListener("click", function () {
        movilMenu.classList.toggle("hidden");
        // Actualizar ARIA
        const isExpanded = movilMenuButton.getAttribute("aria-expanded") === "true";
        movilMenuButton.setAttribute("aria-expanded", !isExpanded);
    });
});




// script para función de animacion de scroll suave
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});