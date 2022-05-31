

// import DataFetcher from "./scripts/data_fetcher";
import { BarChartRace } from "./scripts/barChartRace";
import { select as d3Select } from "d3";
import Data from "./data/dataGrouping";

document.addEventListener("DOMContentLoaded", () => {

  // console.log("DOMContent is Loaded");

  const data = new Data();
  data.groupDates();
  const ethData = data.dataSetGroup();
  // console.log(ethData);
  const myChart = new BarChartRace("bar-chart-race");

  myChart
    .setTitle("DeFi TVL Bar Chart Race")
    .addDatasets(ethData)

  d3Select(".play-button").on("click", function() {
    if (this.innerHTML === "Start") {
      this.innerHTML = "Stop"
      myChart.render()
    } else if (this.innerHTML === "Stop") {
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

  // d3Select(".restart-button").on("click", function() {
  //   this.innerHTML = "Restart"
  //   myChart.restart()
  // });


});

