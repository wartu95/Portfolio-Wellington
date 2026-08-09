const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
const section = document.getElementById("hero");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && section && !reduceMotion) {
  const context = canvas.getContext("2d");

  if (context) {
    const colors = ["#4fc3f7", "#7c6af7", "#57e5a0", "#ffffff"];
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };

    class Particle {
      x = 0;
      y = 0;
      radius = 1;
      vx = 0;
      vy = 0;
      alpha = 1;
      color = colors[0];
      life = 0;
      maxLife = 400;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.6 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.55 + 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 0;
        this.maxLife = Math.random() * 400 + 200;
      }
    }

    const resize = () => {
      width = canvas.width = section.offsetWidth;
      height = canvas.height = section.offsetHeight;
    };

    const init = () => {
      resize();
      particles = [];
      const count = Math.min(Math.floor((width * height) / 7000), 140);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const drawLine = (a: Particle, b: Particle, distance: number) => {
      const opacity = (1 - distance / 110) * 0.25;
      context.strokeStyle = `rgba(79,195,247,${opacity})`;
      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      const parallax = window.scrollY * 0.15;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.life++;

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0 && distance < 90) {
          particle.vx += (dx / distance) * 0.04;
          particle.vy += (dy / distance) * 0.04;
        }

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > 0.8) {
          particle.vx *= 0.92;
          particle.vy *= 0.92;
        }

        particle.x += particle.vx;
        particle.y += particle.vy + parallax * 0.001;

        if (particle.x < -5) particle.x = width + 5;
        if (particle.x > width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = height + 5;
        if (particle.y > height + 5) particle.y = -5;

        const lifeFraction = particle.life / particle.maxLife;
        const fade =
          lifeFraction < 0.1
            ? lifeFraction / 0.1
            : lifeFraction > 0.85
              ? (1 - lifeFraction) / 0.15
              : 1;
        const alpha = particle.alpha * fade;

        context.save();
        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 6;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();

        if (particle.life >= particle.maxLife) particle.reset();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const lineDx = particle.x - other.x;
          const lineDy = particle.y - other.y;
          const lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
          if (lineDistance < 110) drawLine(particle, other, lineDistance);
        }
      }

      window.requestAnimationFrame(animate);
    };

    section.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    });

    section.addEventListener("mouseleave", () => {
      mouse = { x: -9999, y: -9999 };
    });

    window.addEventListener("resize", init, { passive: true });

    init();
    animate();
  }
}
