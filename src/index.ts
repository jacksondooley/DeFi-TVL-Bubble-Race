import { BarChartRace } from "./scripts/barChartRace";
import { select as d3Select } from "d3";
import Data from "./data/dataGrouping";

document.addEventListener("DOMContentLoaded", () => {

  const data = new Data();
  data.groupDates();
  const ethData = data.dataSetGroup();

  const myChart = new BarChartRace("bar-chart-race");

  myChart
    .addDatasets(ethData)

  d3Select(".play-button").on("click", (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    if (button.innerHTML === "Start") {
      button.innerHTML = "Stop"
      myChart.render()
    } else if (button.innerHTML === "Stop") {
      button.innerHTML = "Resume";
      myChart.stop();
    } else if (button.innerHTML === "Resume") {
      button.innerHTML = "Stop";
      myChart.start();
    } else {
      button.innerHTML = "Stop";
      myChart.render();
    }
  });

});

