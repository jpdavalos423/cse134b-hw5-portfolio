function clearProjects() {
  document.getElementById("project-container").innerHTML = "";
}

function createProjectCard(project) {
  const card = document.createElement("project-card");

  card.setAttribute("title", project.title);
  card.setAttribute("description", project.description);
  card.setAttribute("detail-url", project.detailUrl);
  card.setAttribute("live-url", project.liveUrl);
  card.setAttribute("repo-url", project.repoUrl);
  card.setAttribute("details", project.details.join("; "));

  // Picture (light DOM)
  const pic = document.createElement("picture");
  pic.setAttribute("slot", "project-image");

  const img = document.createElement("img");
  img.src = project.image;
  img.alt = project.imageAlt;

  pic.appendChild(img);
  card.appendChild(pic);

  document.getElementById("project-container").appendChild(card);
}

async function loadLocalProjects() {
  clearProjects();
  const data = JSON.parse(localStorage.getItem("projectData")) || [];
  data.forEach(createProjectCard);
}

async function loadRemoteProjects() {
  clearProjects();

  const REMOTE_URL =
    "https://my-json-server.typicode.com/jpdavalos423/hw5-json-server-jpdavalos/projects";

  const res = await fetch(REMOTE_URL);
  const data = await res.json();

  data.forEach(createProjectCard);
}

// Button bindings
document
  .getElementById("load-local")
  .addEventListener("click", loadLocalProjects);
document
  .getElementById("load-remote")
  .addEventListener("click", loadRemoteProjects);
