function loadLocalData() {
  const raw = localStorage.getItem("projectData");
  return raw ? JSON.parse(raw) : [];
}

function saveLocalData(data) {
  localStorage.setItem("projectData", JSON.stringify(data));
}

// Display current localStorage
function refreshDisplay() {
  const data = loadLocalData();
  document.getElementById("current-data").textContent = JSON.stringify(
    data,
    null,
    2
  );
}

document.addEventListener("DOMContentLoaded", () => {
  refreshDisplay();

  const form = document.getElementById("crud-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = loadLocalData();

    const index = document.getElementById("project-index").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const detailUrl = document.getElementById("detailUrl").value;
    const liveUrl = document.getElementById("liveUrl").value;
    const repoUrl = document.getElementById("repoUrl").value;
    const details = document
      .getElementById("details")
      .value.split(";")
      .map((s) => s.trim())
      .filter((s) => s);
    const image = document.getElementById("image").value;
    const imageAlt = document.getElementById("imageAlt").value;

    const project = {
      title,
      description,
      detailUrl,
      liveUrl,
      repoUrl,
      details,
      image,
      imageAlt,
    };

    // Update existing
    if (index !== "") {
      const i = Number(index);
      if (i >= 0 && i < data.length) {
        data[i] = project;
      } else {
        alert("Invalid index for update.");
        return;
      }
    }

    // Create new
    else {
      data.push(project);
    }

    saveLocalData(data);
    refreshDisplay();
    alert("Saved! Return to the Projects page and click Load Local.");
  });

  // DELETE
  document.getElementById("delete-btn").addEventListener("click", () => {
    let data = loadLocalData();
    const index = Number(document.getElementById("delete-index").value);

    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
      saveLocalData(data);
      refreshDisplay();
      alert("Project deleted.");
    } else {
      alert("Invalid index.");
    }
  });
});
