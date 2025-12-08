class ContactForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <dialog>
        <form method="post" action="https://httpbin.org/post">
          <fieldset>
            <legend>Let's get in touch</legend>

            <label for="name" class="required">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
              minlength="2"
              pattern="[a-zA-Z ]+"
              autocomplete="name"
            />

            <label for="email" class="required">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              autocomplete="email"
            />

            <label for="message" class="required">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              required
              maxlength="200"
            ></textarea>

            <div id="progress-container">
              <div id="progress-bar"></div>
            </div>

            <input
              type="hidden"
              id="possible_bot"
              name="possible_bot"
              value="true"
            />

            <output id="error-output" for="name email message"></output>
            <output id="info-output" for="message"></output>

            <div class="form-actions">
              <button type="submit">Send Message</button>
              <button type="button" id="cancel-btn">Cancel</button>
            </div>
          </fieldset>
        </form>
      </dialog>
    `;

    const cancelBtn = this.querySelector("#cancel-btn");
    const dialog = this.querySelector("dialog");
    cancelBtn?.addEventListener("click", () => dialog.close());

    if (dialog.hasAttribute("open")) dialog.removeAttribute("open");

    const contactLinks = document.querySelectorAll(".navbar-contact-link");
    contactLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
          document.body.classList.add("dialog-open");
        } else {
          // Fallback for older browsers
          dialog.setAttribute("open", "");
          document.body.classList.add("dialog-open");
        }
      });
    });

    // Remove blur class when dialog closes (or is cancelled)
    dialog.addEventListener("close", () =>
      document.body.classList.remove("dialog-open")
    );
    dialog.addEventListener("cancel", () =>
      document.body.classList.remove("dialog-open")
    );
  }
}

customElements.define("contact-dialog", ContactForm);
