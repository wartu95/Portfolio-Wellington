// script para modo oscuro

// Obtener elementos del DOM
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");

// Función para alternar el tema
function toggleDarkMode() {
  // Cambiar el tema
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    themeToggleLightIcon.classList.add("hidden");
    themeToggleDarkIcon.classList.remove("hidden");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    themeToggleLightIcon.classList.remove("hidden");
    themeToggleDarkIcon.classList.add("hidden");
  }
}

// Configuración inicial
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  themeToggleLightIcon.classList.remove("hidden");
  themeToggleDarkIcon.classList.add("hidden");
} else {
  document.documentElement.classList.remove("dark");
  themeToggleLightIcon.classList.add("hidden");
  themeToggleDarkIcon.classList.remove("hidden");
}

// Event listener para el botón
themeToggleBtn.addEventListener("click", toggleDarkMode);

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
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".fade-in-section");

  const sectionObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

// script para funcion de contacto 
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const btn = document.getElementById("btnEnviar");
  const status = document.getElementById("form-status");
  const errNombre = document.getElementById("error-nombre");
  const errEmail = document.getElementById("error-email");
  const errMensaje = document.getElementById("error-mensaje");

  const phone = "+51950200007";
  const showError = (el, msg) => {
    el.textContent = msg;
    el.classList.remove("hidden");
  };

  const hideError = (el) => {
    el.textContent = "";
    el.classList.add("hidden");
  };

  const isValidEmail = (value) => {
    // regex simple para validar email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const validate = () => {
    let ok = true;

    const n = nombre.value.trim();
    const e = email.value.trim();
    const m = mensaje.value.trim();

    //Nombre
    if (n.length < 2) {
      showError(errNombre, "Escribe tu nombre (mínimo 2 caracteres).");
      ok = false;
    } else {
      hideError(errNombre);
    }

    //Email
    if (!isValidEmail(e)) {
      showError(errEmail, "Escribe un correo electrónico válido.");
      ok = false;
    } else {
      hideError(errEmail);
    }

    //Mensaje
    if (m.length < 10) {
      showError(errMensaje, "Cuéntame un poco más (mínimo 10 caracteres).");
      ok = false;
    } else {
      hideError(errMensaje);
    }

    btn.disabled = !ok;
    return ok;
  };

  // Valiadación en vivo
  ["input", "blur"].forEach((evt) => {
    nombre.addEventListener(evt, validate);
    email.addEventListener(evt, validate);
    mensaje.addEventListener(evt, validate);
  });

  //Envía por whatsapp
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    status.textContent = "";
    const ok = validate();
    if (!ok) return;

    const text = `Hola, soy ${nombre.value.trim()}.\nEmail: ${email.value.trim()}.\n${mensaje.value.trim()}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener, noreferrer");
    status.textContent = "Listo ✅ Se abrió WhatsApp para enviar tu mensaje.";

    //opcional: limpiar el formulario
    form.reset();
    btn.disabled = true;
  });

  btn.disabled = true;

})();


