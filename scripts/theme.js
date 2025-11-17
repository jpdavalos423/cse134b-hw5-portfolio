const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
  themeBtn.hidden = false;
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️ Light Mode";
} else {
  themeBtn.textContent = "🌙 Dark Mode";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙 Dark Mode";
  }
});
