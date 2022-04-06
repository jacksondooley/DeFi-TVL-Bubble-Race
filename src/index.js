document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent is Loaded");
});

import Example from "./scripts/functionality";
import Fetch from "./scripts/fetch";
import Bars from "./scripts/bars";
import DataFetcher from "./scripts/data_fetcher";
import barChart from "./scripts/barChart";
import Data from "./data/dataGrouping";
// import dataGrouping from "./data/dataGrouping";

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
    let chart = new Data();
    // data.testLogger();
    chart.renderChart();
    console.log("render time")
    // console.log(data.width);
    // data.testLogger();
    // data.datesArr();
    // data.getNames();
    // data.groupDates();

    // data.rank(name => data.datevalues[10][1].get(name) || 0);
    // console.log(data.datevalues);
    // console.log(data.keyframes);
    // data.nameframes();
    // console.log(data.nameframes);
});

