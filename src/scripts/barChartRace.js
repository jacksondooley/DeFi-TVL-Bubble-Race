import * as d3 from "d3";

export function BarChartRace(chartId, extendedSettings) {
  const chartSettings = {
    width: 700,
    height: 700,
    padding: 40,
    titlePadding: 5,
    columnPadding: 0.4,
    ticksInXAxis: 5,
    duration: 5000,
    ...extendedSettings
  };

  chartSettings.innerWidth = chartSettings.width - chartSettings.padding * 2;
  chartSettings.innerHeight = chartSettings.height - chartSettings.padding * 2;
  
  const chartDataSets = [];
  let chartTransition;
  let timerStart, timerEnd;
  let currentDataSetIndex = 0;
  let elapsedTime = chartSettings.duration;

  const chartContainer = d3.select(`#${chartId} .chart-container`);
  const xAxisContainer = d3.select(`#${chartId} .x-axis`);
  const yAxisContainer = d3.select(`#${chartId} .y-axis`);

  const xAxisScale = d3.scaleLinear()
    .range([0, chartSettings.innerWidth]);

  const yAxisScale = d3.scaleBand()
    .range([0, chartSettings.innerHeight])
    .padding(chartSettings.columnPadding);

  d3.select(`#${chartId}`)
    .attr("width", chartSettings.width)
    .attr("height", chartSettings.height);

  chartContainer.attr("transform", `translate(${chartSettings.padding} ${chartSettings.padding})`);

  chartContainer.select(".current-date")
    .attr("transform", `translate(${chartSettings.innerWidth} ${chartSettings.innerHeight})`)

  function draw({ dataSet, date: currentDate }, transition) {
    const { innerHeight, ticksInXAxis, titlePadding } = chartSettings;
    const dataSetDescendingOrder = dataSet.sort(
      ({ value: firstValue }, { value: secondValue }) =>
        secondValue - firstValue
    );

    chartContainer.select(".current-date").text(currentDate)

    xAxisScale.domain([0, dataSetDescendingOrder[0].value]);
    yAxisScale.domain(dataSetDescendingOrder.map(({name}) => name));

    xAxisContainer.transition(transition).call(
      d3.axisTop(xAxisScale).ticks(ticksInXAxis).tickSize(-innerHeight));

    yAxisContainer.transition(transition).call(d3.axisLeft(yAxisScale).tickSize(0));

    const barGroups = chartContainer
      .select(".columns")
      .selectAll("g.column-container")
      .data(dataSetDescendingOrder, ({ name }) => name + "    ");

    const barGroupsEnter = barGroups
      .enter()
      .append("g")
      .attr("class", "column-container")
      .attr("transform", `translate(0, ${innerHeight})`);

    barGroupsEnter
      .append("rect")
      .attr("class", "column-rect")
      .attr("width", ({ value }) => xAxisScale(value) - titlePadding)
      .attr("height", yAxisScale.step() * (1 - chartSettings.columnPadding));

    barGroupsEnter
      .append("text")
      .attr("class", "column-title")
      .attr("y", (yAxisScale.step() * (1 - chartSettings.columnPadding)) / 2)
      .attr("x", -chartSettings.titlePadding)
      .text(({ name }) => name );

    barGroupsEnter
      .append("text")
      .attr("class", "column-value")
      .attr("y", (yAxisScale.step() * (0.5 + chartSettings.columnPadding )) / 2)
      .attr("x", chartSettings.titlePadding)
      .text(0);

    const barUpdate = barGroupsEnter.merge(barGroups);

    barUpdate
      .transition(transition)
      .attr("transform", ({ name }) => `translate(0,${yAxisScale(name)})`)
      .attr("fill", ({ category }) => colorBar(category))

    barUpdate
      .select(".column-rect")
      .transition(transition)
      .attr("width", ({ value }) => xAxisScale(value) - titlePadding);

    barUpdate
      .select(".column-title")
      .transition(transition)
      .attr("x", ({ value }) => xAxisScale(value) - titlePadding - 10);

    barUpdate
      .select(".column-value")
      .transition(transition)
      .attr("x", ({ value }) => xAxisScale(value) - titlePadding - 10)
      .tween("text", function({ value }) {
        const interpolateStartValue =
          elapsedTime === chartSettings.duration 
          ? this.currentValue || 0 : 
          +this.innerHTML;

        const interpolate = d3.interpolate(interpolateStartValue, value);
        this.currentValue = value;

        return function(t) {
          d3.select(this).text(Math.ceil(interpolate(t)));
        };
      });

    const bodyExit = barGroups.exit();

    bodyExit
      .transition(transition)
      .attr("transform", `translate(0,${innerHeight})`)
      .on("end", function(){
        d3.select(this).attr("fill", "none");
      });

    bodyExit
      .select(".column-title")
      .transition(transition)
      .attr("x", 0);

    bodyExit
      .select(".column-rect")
      .transition(transition)
      .attr("width", 0);

    bodyExit
      .select(".column-value")
      .transition(transition)
      .attr("x", xAxisScale)
      .tween("text", function() {
        const interpolate = d3.interpolate(this.currentValue, 0);
        this.currentValue = 0;

        return function(t) {
          d3.select(this).text(Math.ceil(interpolate(t)));
        };
      });


    return this;
  }

  function colorBar(category){
    if (category === "Dexes") {
      return "#f6ccbf";
    }
    else if (category === "Lending") {
        return "#a4fcf5";
    }
    else if (category === "Bridge") {
        return "FF7F0E";
    }
    else if (category === "Liquid Staking") {
        return "#586EFC"; //Purple / Blue
    }
    else if (category === "Yield") {
        return "#2CFF53"; //Green
    }
    else if (category === "CDP") {
        return "#82a9f9"; //Purple
    }
    else if (category === "Algo-Stables") {
        return "#FE4C4C"; //Red
    }
    else if (category === "Yield Aggregator") {
        return "#45DDE6"; //light blue
    }
    else {
        return "#cfc3fb";
    }
  }

  function addDataset(dataset) {
    chartDataSets.push(dataset);

    return this;
  }

  function addDatasets(datasets) {
    chartDataSets.push.apply(chartDataSets, datasets);

    return this;
  }

  function setTitle(title) {
    d3.select(".chart-title")
      .attr("x", chartSettings.width / 2)
      .attr("y", -chartSettings.padding  / 2)
      .text(title);

    return this;
  }

  async function render(index = 0) {
    currentDataSetIndex = index;
    timerStart = d3.now();
    chartTransition = chartContainer
      .transition()
      .duration(elapsedTime)
      .ease(d3.easeLinear)
      .on("end", () => {
        if (index < chartDataSets.length) {
          elapsedTime = chartSettings.duration;
          render(index + 1);
        } else {
          d3.select("button").text("Play");
        }
      })
      .on("interrupt", () => {
        timerEnd = d3.now();
      });
    if (index < chartDataSets.length) {
      draw(chartDataSets[index], chartTransition);
    }
    return this;
  }
  function stop() {
    d3.select(`#${chartId}`)
      .selectAll("*")
      .interrupt();
    return this;
  }
  function start() {
    elapsedTime -= timerEnd - timerStart;
    render(currentDataSetIndex);
    return this;
  }

  return {
    addDataset,
    addDatasets,
    render,
    setTitle,
    start,
    stop
  }
};