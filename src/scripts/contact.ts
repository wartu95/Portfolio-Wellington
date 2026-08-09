const form = document.getElementById("contactForm") as HTMLFormElement | null;

if (form) {
  const nombre = document.getElementById("nombre") as HTMLInputElement | null;
  const email = document.getElementById("email") as HTMLInputElement | null;
  const mensaje = document.getElementById("mensaje") as HTMLTextAreaElement | null;
  const button = document.getElementById("btnEnviar") as HTMLButtonElement | null;
  const status = document.getElementById("form-status");
  const errorNombre = document.getElementById("error-nombre");
  const errorEmail = document.getElementById("error-email");
  const errorMensaje = document.getElementById("error-mensaje");
  const fieldsReady =
    nombre && email && mensaje && button && status && errorNombre && errorEmail && errorMensaje;

  const showError = (field: HTMLInputElement | HTMLTextAreaElement, element: HTMLElement, message: string) => {
    field.setAttribute("aria-invalid", "true");
    element.textContent = message;
    element.classList.add("visible");
  };

  const hideError = (field: HTMLInputElement | HTMLTextAreaElement, element: HTMLElement) => {
    field.removeAttribute("aria-invalid");
    element.textContent = "";
    element.classList.remove("visible");
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  if (fieldsReady) {
    const validate = () => {
      let ok = true;
      const nameValue = nombre.value.trim();
      const emailValue = email.value.trim();
      const messageValue = mensaje.value.trim();

      if (nameValue.length < 2) {
        showError(nombre, errorNombre, "Escribe tu nombre, mínimo 2 caracteres.");
        ok = false;
      } else {
        hideError(nombre, errorNombre);
      }

      if (!isValidEmail(emailValue)) {
        showError(email, errorEmail, "Escribe un correo electrónico válido.");
        ok = false;
      } else {
        hideError(email, errorEmail);
      }

      if (messageValue.length < 10) {
        showError(mensaje, errorMensaje, "Cuéntame un poco más, mínimo 10 caracteres.");
        ok = false;
      } else {
        hideError(mensaje, errorMensaje);
      }

      button.disabled = !ok;
      return ok;
    };

    ["input", "blur"].forEach((eventName) => {
      nombre.addEventListener(eventName, validate);
      email.addEventListener(eventName, validate);
      mensaje.addEventListener(eventName, validate);
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.textContent = "";
      status.removeAttribute("data-state");

      if (!validate()) return;

      button.disabled = true;
      button.textContent = "Enviando...";
      form.setAttribute("aria-busy", "true");

      try {
        const requestBody = new URLSearchParams();
        new FormData(form).forEach((value, key) => {
          if (typeof value === "string") requestBody.append(key, value);
        });

        const response = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: requestBody.toString(),
        });

        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);

        status.textContent = "Mensaje enviado. Gracias por escribirme.";
        status.dataset.state = "success";
        form.reset();
        hideError(nombre, errorNombre);
        hideError(email, errorEmail);
        hideError(mensaje, errorMensaje);
      } catch (error) {
        console.error("No se pudo enviar el formulario de contacto:", error);
        status.textContent = "No se pudo enviar el mensaje. Inténtalo nuevamente o usa el correo directo.";
        status.dataset.state = "error";
      } finally {
        form.removeAttribute("aria-busy");
        button.textContent = "Enviar mensaje";
        button.disabled = status.dataset.state === "success" || !validate();
      }
    });
  }
}
