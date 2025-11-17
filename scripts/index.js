document.addEventListener("DOMContentLoaded", function (event) {
  var dataText = [
    "frontend developer",
    "backend developer",
    "musician",
    "fullstack developer",
    "software engineer",
  ];

  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      document.getElementById("typewriter").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback == "function") {
      setTimeout(fnCallback, 700);
    }
  }
  function StartTextAnimation(i) {
    if (typeof dataText[i] == "undefined") {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 2500);
    }
    try {
      if (i < dataText[i].length) {
        typeWriter(dataText[i], 0, function () {
          StartTextAnimation(i + 1);
        });
      }
    } catch (e) {}
  }
  StartTextAnimation(0);
});
