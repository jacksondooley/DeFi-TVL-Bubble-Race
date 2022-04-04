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
    test_fetch.fillList();
    // test_fetch.MKRFillList();
    // d3.select("div")
    // .style("color", "white")
    // .style("background-color", "black")
    // .html("Hello, world!")
    // .node()
    console.log(d3)
    let graph = new Bars();
    // graph.create1()
    graph.createSample();
    // let body = d3.select("body")
      
    // let svg = body.append("svg")
    //   .attr("width", 50)
    //   .attr("height", 50)

    // let circle = svg.append("circle")
    //   .attr("cx", 25)
    //   .attr("cy", 25)
    //   .attr("r", 25)
    //   .style("fill", "purple");

    let theData = [ 1, 2, 3 ];

    let p = d3.select("body").selectAll("p")
        .data(theData)
        .enter()
        .append("p")
        .text("hello")

    
});

