document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world!");
});

import Example from "./scripts/functionality";
import Fetch from "./scripts/fetch";
import Bars from "./scripts/bars";
import DataFetcher from "./scripts/data_fetcher";
import barChart from "./scripts/barChart";
import ethData from "./data/ethData"

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    new Example(main);

    // let graph = new Bars();

    // graph.createSample();

    // DataFetcher.getProctocols()
    // .then((data) => {
    //   console.log(data);
    //   graph.createReal(data);
    // });

    // let race = new barChart("5", "yes");
    // console.log(race);

    ethData.getEthData();
    
});

