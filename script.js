







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