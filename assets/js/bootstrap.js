"use strict";

(function () {
    for (const figure of document.getElementsByTagName("figure")) {
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

    for (const table of document.getElementsByTagName("table")) {
        if (table.classList.length === 0) {
            table.classList.add("table");
        }
    }
})();
