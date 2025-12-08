function initFormHandlers(root = document) {
  const forms = Array.from(root.querySelectorAll("form"));
  forms.forEach((form) => {
    if (form.__contactFormInitialized) return;
    form.__contactFormInitialized = true;

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");
    const errorOutput =
      form.querySelector("#error-output") ||
      document.getElementById("error-output");
    const infoOutput =
      form.querySelector("#info-output") ||
      document.getElementById("info-output");
    const progressBar =
      form.querySelector("#progress-bar") ||
      document.getElementById("progress-bar");

    let form_errors = [];

    if (nameInput) {
      nameInput.addEventListener("input", () => {
        const illegalChars = /[^a-zA-Z\s]/g;
        if (illegalChars.test(nameInput.value)) {
          nameInput.classList.add("flash-error");
          if (errorOutput) {
            errorOutput.textContent = "Only letters and spaces allowed!";
            errorOutput.style.backgroundColor =
              "var(--color-error, var(--color-error-fallback))";
            requestAnimationFrame(() => errorOutput.classList.add("visible"));
            setTimeout(() => {
              nameInput.classList.remove("flash-error");
              errorOutput.classList.remove("visible");
              setTimeout(() => (errorOutput.textContent = ""), 300);
            }, 2000);
          }
        }
      });
    }

    // Progress handling moved into the contact-dialog component to avoid
    // load-order issues when the form is dynamically inserted.

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("invalid", () => {
        form_errors.push({
          field: input.name,
          error: input.validationMessage,
          value: input.value,
          timestamp: new Date().toISOString(),
        });

        input.classList.add("flash-error");

        if (errorOutput) {
          errorOutput.textContent = input.validationMessage;
          requestAnimationFrame(() => errorOutput.classList.add("visible"));
          setTimeout(() => {
            input.classList.remove("flash-error");
            errorOutput.classList.remove("visible");
          }, 2000);
        }
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let errorField = form.querySelector('input[name="form-errors"]');
      if (!errorField) {
        errorField = document.createElement("input");
        errorField.type = "hidden";
        errorField.name = "form-errors";
        form.appendChild(errorField);
      }

      errorField.value = JSON.stringify(form_errors);
      form.submit();
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () =>
    initFormHandlers(document)
  );
} else {
  initFormHandlers(document);
}

const mo = new MutationObserver((records) => {
  for (const r of records) {
    for (const node of r.addedNodes) {
      if (!(node instanceof HTMLElement)) continue;
      if (
        node.matches &&
        (node.matches("dialog") ||
          node.matches("contact-dialog") ||
          node.querySelector("dialog") ||
          node.querySelector("form"))
      ) {
        initFormHandlers(node);
      }
    }
  }
});

mo.observe(document.body, { childList: true, subtree: true });
