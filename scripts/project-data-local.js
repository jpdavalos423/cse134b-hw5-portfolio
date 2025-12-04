const LOCAL_PROJECT_DATA = [
  {
    title: "PokeCollect",
    description: "A Pokemon card tracker...",
    detailUrl: "pokecollect.html",
    liveUrl: "https://cse110-sp25-group20.github.io/cse110-sp25-group20/",
    repoUrl: "https://github.com/cse110-sp25-group20/Repo-of-Truth",
    details: [
      "Integrated Pokemon TCG API",
      "Collection management with localStorage",
      "Responsive UI",
      "Built with vanilla JS/HTML/CSS",
    ],
    image: "assets/pokecollect-preview-800w.jpg",
    imageAlt: "Preview of PokeCollect app",
  },
  {
    title: "DSA Visualizer",
    description: "Interactive tool for visualizing algorithms.",
    detailUrl: "dsa-visualizer.html",
    liveUrl: "#",
    repoUrl: "https://github.com/jpdavalos423/sorting-algorithms",
    details: [
      "Sorting algorithm animations",
      "Step-by-step visualization",
      "React + D3.js rendered",
      "Educational interface",
    ],
    image: "assets/algorithm-preview-800w.jpg",
    imageAlt: "Sorting algorithm preview",
  },
];

// Store initial data in localStorage if not already present
if (!localStorage.getItem("projectData")) {
  localStorage.setItem("projectData", JSON.stringify(LOCAL_PROJECT_DATA));
}
