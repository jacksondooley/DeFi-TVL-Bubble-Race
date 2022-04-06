document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent is Loaded");
});

import Example from "./scripts/functionality";
// import Fetch from "./scripts/fetch";
// import Bars from "./scripts/bars";
// import DataFetcher from "./scripts/data_fetcher";
// import barChart from "./scripts/barChart";
// import Data from "./data/dataGrouping";
import { generateDataSets } from "./scripts/dataGenerator";
import { BarChartRace } from "./scripts/barChartRace";

import { select as d3Select } from "d3";
// import dataGrouping from "./data/dataGrouping";

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    new Example(main);

    const myChart = new BarChartRace("bar-chart-race");

    myChart
      .setTitle("DeFi TVL Bar Chart Race")
      .addDatasets(generateDataSets({ size: 5 }))
      .render();

      d3Select("button").on("click", function() {
        if (this.innerHTML === "Stop") {
          this.innerHTML = "Resume";
          myChart.stop();
        } else if (this.innerHTML === "Resume") {
          this.innerHTML = "Stop";
          myChart.start();
        } else {
          this.innerHTML = "Stop";
          myChart.render();
        }
      });

    // let graph = new Bars();

    // graph.createSample();

    // DataFetcher.getProctocols()
    // .then((data) => {
    //   console.log(data);
    //   graph.createReal(data);
    // });

    // let race = new barChart("5", "yes");
    // console.log(race);
    // let chart = new Data();
    // data.testLogger();
    // chart.renderChart();
    // console.log("render time")
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

