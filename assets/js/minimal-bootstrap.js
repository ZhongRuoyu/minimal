"use strict";

(function () {
  const mains = document.getElementsByTagName("main");
  if (mains.length !== 1) {
    return;
  }
  const main = mains.item(0);

  for (const figure of main.getElementsByTagName("figure")) {
    if (figure.classList.length === 0) {
      figure.classList.add("figure");
      for (const img of figure.getElementsByTagName("img")) {
        img.classList.add("figure-img");
      }
      for (const figcaption of figure.getElementsByTagName("figcaption")) {
        figcaption.classList.add("figure-caption");
      }
    }
  }

  for (const table of main.getElementsByTagName("table")) {
    if (table.classList.length === 0) {
      table.classList.add("table");
    }
  }
})();
