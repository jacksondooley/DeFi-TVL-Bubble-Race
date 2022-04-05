document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello world!");
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
    let data = new Data();
    data.testLogger();
    // data.datesArr();
    data.getNames();
    data.groupDates();
    // data.rank(name => this.datevalues[0][1].get(name));
    
});

