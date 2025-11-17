function switchTab(tabName) {
  const education = document.getElementById("education-section");
  const experience = document.getElementById("experience-section");

  function updateDOM() {
    if (tabName === "education") {
      education.hidden = false;
      experience.hidden = true;

      document.getElementById("btn-education").classList.add("active");
      document.getElementById("btn-experience").classList.remove("active");
    } else {
      education.hidden = true;
      experience.hidden = false;

      document.getElementById("btn-education").classList.remove("active");
      document.getElementById("btn-experience").classList.add("active");
    }
  }

  if (!document.startViewTransition) {
    updateDOM(); // Fallback for browsers that don't support it
  } else {
    document.startViewTransition(() => updateDOM());
  }
}
