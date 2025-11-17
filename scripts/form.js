const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const errorOutput = document.getElementById("error-output");
const infoOutput = document.getElementById("info-output");
const progressBar = document.getElementById("progress-bar");

let form_errors = [];

nameInput.addEventListener("input", (event) => {
  const illegalChars = /[^a-zA-Z\s]/g;

  if (illegalChars.test(nameInput.value)) {
    nameInput.classList.add("flash-error");

    errorOutput.textContent = "Only letters and spaces allowed!";
    errorOutput.style.backgroundColor =
      "var(--color-error, var(--color-error-fallback))";

    requestAnimationFrame(() => {
      errorOutput.classList.add("visible");
    });

    setTimeout(() => {
      nameInput.classList.remove("flash-error");

      errorOutput.classList.remove("visible");

      setTimeout(() => {
        errorOutput.textContent = "";
      }, 300);
    }, 2000);
  }
});

messageInput.addEventListener("input", () => {
  const maxLength = messageInput.getAttribute("maxlength");
  const currentLength = messageInput.value.length;
  const percentage = (currentLength / maxLength) * 100;
  const remaining = maxLength - currentLength;

  progressBar.style.width = `${percentage}%`;

  if (percentage <= 60) {
    progressBar.style.background =
      "var(--color-accent, var(--color-accent-fallback))";
    infoOutput.classList.remove("visible");
  } else if (percentage > 60 && percentage < 85) {
    progressBar.style.background =
      "var(--color-warning, var(--color-warning-fallback))";
    infoOutput.classList.remove("visible");
  } else {
    progressBar.style.background =
      "var(--color-error, var(--color-error-fallback))";
    // Show the text now!
    infoOutput.textContent = `${remaining} characters left`;
    infoOutput.classList.add("visible");
  }
});

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener("invalid", () => {
    form_errors.push({
      field: input.name,
      error: input.validationMessage,
      value: input.value,
      timestamp: new Date().toISOString(),
    });

    input.classList.add("flash-error");

    errorOutput.textContent = input.validationMessage;
    requestAnimationFrame(() => errorOutput.classList.add("visible"));

    setTimeout(() => {
      input.classList.remove("flash-error");
      errorOutput.classList.remove("visible");
    }, 2000);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let errorField = document.querySelector('input[name="form-errors"]');
  if (!errorField) {
    errorField = document.createElement("input");
    errorField.type = "hidden";
    errorField.name = "form-errors";
    form.appendChild(errorField);
  }

  errorField.value = JSON.stringify(form_errors);

  form.submit();
});
