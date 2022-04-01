document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world!");
});

import Example from "./scripts/functionality";

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    new Example(main);
});