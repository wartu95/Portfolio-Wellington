const scrollIndicator = document.getElementById("scroll-indicator");

if (scrollIndicator) {
  window.addEventListener(
    "scroll",
    () => {
      scrollIndicator.classList.toggle("hidden", window.scrollY > 80);
    },
    { passive: true },
  );
}
