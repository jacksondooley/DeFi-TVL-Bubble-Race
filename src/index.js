document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world!");
});

import Example from "./scripts/functionality";
import Fetch from "./scripts/fetch";
import Bars from "./scripts/bars";

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    new Example(main);
    let test_fetch = new Fetch('dog');
    // test_fetch.fatch(test_fetch.protocols_api);
    // test_fetch.fillList();
    // test_fetch.MKRFillList();
    // d3.select("div")
    // .style("color", "white")
    // .style("background-color", "black")
    // .html("Hello, world!")
    // .node()
    console.log(d3)
    let graph = new Bars();
    graph.create1()
});