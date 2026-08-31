const track = document.getElementById("carousel-track");
const prev = document.getElementById("carousel-prev") as HTMLButtonElement | null;
const next = document.getElementById("carousel-next") as HTMLButtonElement | null;
const dotsWrap = document.getElementById("carousel-dots");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const carouselMedia = window.matchMedia("(max-width: 1023px)");

if (track && prev && next && dotsWrap) {
  const isCarousel = () => carouselMedia.matches;
  const cards = () => Array.from(track.querySelectorAll<HTMLElement>(".project-card"));
  let active = 0;

  const updateDots = () => {
    dotsWrap.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === active);
    });
  };

  const updateArrows = () => {
    const list = cards();
    prev.disabled = active === 0;
    next.disabled = active === list.length - 1;
  };

  const goTo = (index: number) => {
    const list = cards();
    if (!isCarousel() || index < 0 || index >= list.length) return;

    active = index;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const left = list.length > 1 ? (maxScroll * active) / (list.length - 1) : 0;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    updateDots();
    updateArrows();
  };

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    cards().forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `carousel-dot${index === 0 ? " active" : ""}`;
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir al proyecto ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsWrap.appendChild(dot);
    });
  };

  const updateActiveFromScroll = () => {
    if (!isCarousel()) return;
    const list = cards();
    if (!list.length) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    const newActive = Math.round(progress * (list.length - 1));
    if (newActive !== active) {
      active = newActive;
      updateDots();
      updateArrows();
    }
  };

  prev.addEventListener("click", () => {
    goTo(active - 1);
  });

  next.addEventListener("click", () => {
    goTo(active + 1);
  });

  let mobileScrollTimer = 0;
  track.addEventListener(
    "scroll",
    () => {
      if (!isCarousel()) return;
      window.clearTimeout(mobileScrollTimer);
      mobileScrollTimer = window.setTimeout(updateActiveFromScroll, 80);
    },
    { passive: true },
  );

  carouselMedia.addEventListener("change", () => {
    active = 0;
    track.scrollTo({ left: 0, behavior: "auto" });
    updateDots();
    updateArrows();
  });

  buildDots();
  updateArrows();
}
