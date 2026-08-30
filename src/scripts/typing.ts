const typingElement = document.getElementById("typing-text");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typingElement) {
  const rawRoles = typingElement.dataset.roles;
  const roles = rawRoles ? (JSON.parse(rawRoles) as string[]) : [];

  if (reduceMotion || roles.length === 0) {
    typingElement.textContent = roles[0] ?? "";
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex];
      typingElement.textContent = deleting
        ? current.slice(0, --charIndex)
        : current.slice(0, ++charIndex);

      let delay = deleting ? 40 : 80;

      if (!deleting && charIndex === current.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }

      window.setTimeout(type, delay);
    };

    type();
  }
}
