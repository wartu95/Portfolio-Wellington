const sections = document.querySelectorAll<HTMLElement>(".fade-in-section");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sections.length > 0) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            const index = section.dataset.revealIndex ? Number(section.dataset.revealIndex) : 0;
            section.style.setProperty("--reveal-delay", `${Math.min(index * 60, 180)}ms`);
            section.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0 },
    );

    sections.forEach((section, index) => {
      section.dataset.revealIndex = String(index % 4);
      observer.observe(section);
    });
  }
}
