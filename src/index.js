document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world!");
});

import Example from "./scripts/functionality";
import Fetch from "./scripts/fetch";

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    new Example(main);
    let test_fetch = new Fetch('dog');
    test_fetch.fatch(test_fetch.protocols_api);
    test_fetch.fillList();
});