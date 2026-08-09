const wrapper = document.getElementById("projects-scroll-wrapper");
const track = document.getElementById("carousel-track");
const prev = document.getElementById("carousel-prev") as HTMLButtonElement | null;
const next = document.getElementById("carousel-next") as HTMLButtonElement | null;
const dotsWrap = document.getElementById("carousel-dots");
const progressBar = document.getElementById("scroll-progress-bar");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (wrapper && track && prev && next && dotsWrap) {
  const isMobile = () => window.innerWidth <= 768 || reduceMotion;
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

  const mobileGoTo = (index: number) => {
    const list = cards();
    if (index < 0 || index >= list.length) return;

    active = index;
    track.style.transform = "";
    const card = list[active];
    track.scrollTo({ left: card.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
    updateDots();
    updateArrows();
  };

  const setActive = (index: number, animate: boolean) => {
    const list = cards();
    if (index < 0 || index >= list.length) return;

    active = index;
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    const progress = list.length > 1 ? index / (list.length - 1) : 0;
    const scrollTarget = wrapperTop + progress * (wrapperHeight - viewportHeight);

    window.scrollTo({ top: scrollTarget, behavior: animate && !reduceMotion ? "smooth" : "auto" });
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
      dot.addEventListener("click", () => {
        if (isMobile()) mobileGoTo(index);
        else setActive(index, true);
      });
      dotsWrap.appendChild(dot);
    });
  };

  const calcWrapperHeight = () => {
    if (isMobile()) {
      wrapper.style.height = "auto";
      return;
    }

    const list = cards();
    const card = list[0];
    if (!card) return;

    const gap = 22;
    const cardWidth = card.offsetWidth + gap;
    wrapper.style.height = `${window.innerHeight + cardWidth * (list.length - 1)}px`;
  };

  const onScroll = () => {
    if (isMobile()) return;

    const list = cards();
    if (!list.length) return;

    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    const start = wrapperTop;
    const end = wrapperTop + wrapperHeight - viewportHeight;
    const raw = (window.scrollY - start) / (end - start);
    const progress = Math.max(0, Math.min(1, raw));
    const cardWidth = list[0].offsetWidth + 22;
    const maxX = cardWidth * (list.length - 1);

    track.style.transform = `translateX(${-progress * maxX}px)`;
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

    const newActive = Math.round(progress * (list.length - 1));
    if (newActive !== active) {
      active = newActive;
      updateDots();
      updateArrows();
    }
  };

  prev.addEventListener("click", () => {
    if (isMobile()) mobileGoTo(active - 1);
    else setActive(active - 1, true);
  });

  next.addEventListener("click", () => {
    if (isMobile()) mobileGoTo(active + 1);
    else setActive(active + 1, true);
  });

  let mobileScrollTimer = 0;
  track.addEventListener(
    "scroll",
    () => {
      if (!isMobile()) return;
      window.clearTimeout(mobileScrollTimer);
      mobileScrollTimer = window.setTimeout(() => {
        const list = cards();
        let closest = 0;
        let minDistance = Infinity;

        list.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft - track.scrollLeft);
          if (distance < minDistance) {
            minDistance = distance;
            closest = index;
          }
        });

        if (closest !== active) {
          active = closest;
          updateDots();
          updateArrows();
        }
      }, 80);
    },
    { passive: true },
  );

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      calcWrapperHeight();
      if (isMobile()) track.style.transform = "";
      else onScroll();
    },
    { passive: true },
  );

  buildDots();
  calcWrapperHeight();
  updateArrows();
  onScroll();
}
