"use strict";

(function () {
    for (const table of document.getElementsByTagName("table")) {
        if (table.classList.length === 0) {
            table.classList.add("table");
        }
    }
})();
