class ProjectCard extends HTMLElement {
  connectedCallback() {
    const pictureElement = this.querySelector('picture[slot="project-image"]');

    const detailUrl = this.getAttribute("detail-url");
    const title = this.getAttribute("title") || "Untitled Project";
    const description = this.getAttribute("description") || "";

    const liveUrl = this.getAttribute("live-url") || "#";
    const repoUrl = this.getAttribute("repo-url") || "#";
    const details = this.getAttribute("details") || "";

    // Parse details into bullet points (semicolon-separated)
    const detailsList = details
      ? details
          .split(";")
          .map((d) => d.trim())
          .filter((d) => d)
      : [];

    const detailsHTML =
      detailsList.length > 0
        ? `
                  <div class="project-details" onclick="if(event.target.tagName !== 'A' && !event.target.closest('a')) window.location.href='${detailUrl}'">
                    <ul class="details-list">
                      ${detailsList
                        .map((detail) => `<li>${detail}</li>`)
                        .join("")}
                    </ul>
                  </div>
                `
        : "";

    this.innerHTML = `
              <div class="project-card-main" onclick="if(event.target.tagName !== 'A' && !event.target.closest('a')) window.location.href='${detailUrl}'">
                
                <section class="project-content">
                  <h3>${title}</h3>
                  <p>${description}</p>
                  <div class="project-links">
                    <a href="${liveUrl}" aria-label="Link to live site">Live Site</a>
                    <a href="${repoUrl}" aria-label="Link to GitHub repo">GitHub Repo</a>
                  </div>
                </section>
              </div>
              ${detailsHTML}
          `;

    const mainCard = this.querySelector(".project-card-main");

    if (mainCard && pictureElement) {
      mainCard.prepend(pictureElement);
    }
  }
}

customElements.define("project-card", ProjectCard);
