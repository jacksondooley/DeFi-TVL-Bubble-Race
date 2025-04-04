import * as d3 from "d3";

interface DataPoint {
  name: string;
  value: number;
  category: string;
  rank?: number;
}

export class BarChartRace {
  private chartSettings: any;
  private chartDataSets: any[] = [];
  private chartTransition: any;
  private timerStart: any;
  private timerEnd: any;
  private currentDataSetIndex = 0;
  private elapsedTime: number;
  private chartContainer: any;
  private xAxisContainer: any;
  private yAxisContainer: any;
  private xAxisScale: any;
  private yAxisScale: any;
  private chartId: string;

  constructor(chartId: string, extendedSettings?: any) {
    this.chartId = chartId;
    this.chartSettings = {
      width: 1400,
      height: 650,
      padding: 100,
      titlePadding: 5,
      columnPadding: 0.5,
      ticksInXAxis: 5,
      duration: 2500,
      ...extendedSettings
    };

    this.chartSettings.innerWidth = this.chartSettings.width - this.chartSettings.padding * 2;
    this.chartSettings.innerHeight = this.chartSettings.height - this.chartSettings.padding * 2;
    this.elapsedTime = this.chartSettings.duration;

    this.chartContainer = d3.select(`#${chartId} .chart-container`);
    this.xAxisContainer = d3.select(`#${chartId} .x-axis`);
    this.yAxisContainer = d3.select(`#${chartId} .y-axis`);

    this.xAxisScale = d3.scaleLinear()
      .range([50, this.chartSettings.innerWidth]);

    this.yAxisScale = d3.scaleBand()
      .range([0, this.chartSettings.innerHeight])
      .padding(this.chartSettings.columnPadding);

    d3.select(`#${chartId}`)
      .attr("width", this.chartSettings.width)
      .attr("height", this.chartSettings.height);

    this.chartContainer.attr("transform", `translate(${this.chartSettings.padding} ${this.chartSettings.padding})`);

    this.chartContainer.select(".current-date")
      .attr("transform", `translate(${this.chartSettings.innerWidth} ${this.chartSettings.innerHeight})`);
  }

  draw({ dataSet, date: currentDate }: { dataSet: DataPoint[]; date: string }, transition: d3.Transition<any, any, any, any>) {
    const { innerHeight, ticksInXAxis, titlePadding } = this.chartSettings;

    let dataSetDescendingOrder = dataSet.sort(
      ({ value: firstValue }, { value: secondValue }) =>
        secondValue - firstValue
    );
    dataSetDescendingOrder = dataSetDescendingOrder.filter((el, idx) => idx <= 9)
    dataSetDescendingOrder = dataSetDescendingOrder.map((el, idx) => {
      el["rank"] = idx
      return el
    })

    this.chartContainer.select(".current-date").text(currentDate.slice(0, 7))

    this.xAxisScale.domain([0, dataSetDescendingOrder[0].value]);
    this.yAxisScale.domain(dataSetDescendingOrder.map(({name}) => name));

    this.xAxisContainer.transition(transition).call(
      d3.axisTop(this.xAxisScale).ticks(ticksInXAxis).tickSize(-innerHeight));

    this.yAxisContainer.transition(transition).call(d3.axisLeft(this.yAxisScale).tickSize(0));

    const barGroups = this.chartContainer
      .select(".columns")
      .selectAll("g.column-container")
      .data(dataSetDescendingOrder, ({ name }: DataPoint) => name + "    ");

    const barGroupsEnter = barGroups
      .enter()
      .append("g")
      .attr("class", "column-container")
      .attr("transform", `translate(0, ${innerHeight})`);

    barGroupsEnter
      .append("rect")
      .attr("class", "column-rect")
      .attr("width", 100)
      .attr("height", 50);

    barGroupsEnter
      .append("text")
      .attr("class", "column-title")
      .attr("y", "24px")
      .attr("x", this.chartSettings.titlePadding - 10 + 100)
      .text(({ name }: DataPoint) => name );

    barGroupsEnter
      .append("text")
      .attr("class", "column-value")
      .attr("y", "40px")
      .attr("x", this.chartSettings.titlePadding - 10 + 100)
      .text(0);

    const barUpdate = barGroupsEnter.merge(barGroups);

    barUpdate
      .transition(transition)
      .attr("transform", ({ name }: DataPoint) => `translate(0,${this.yAxisScale(name)})`)
      .attr("fill", ({ category }: DataPoint) => this.colorBar(category))

    barUpdate
      .select(".column-rect")
      .transition(transition)
      .attr("width", ({ value }: DataPoint) => this.xAxisScale(value) + 100);

    barUpdate
      .select(".column-title")
      .transition(transition)
      .attr("x", ({ value }: DataPoint) => this.xAxisScale(value) - titlePadding - 10 + 100)

    barUpdate
      .select(".column-value")
      .transition(transition)
      .attr("x", ({ value }: DataPoint) => this.xAxisScale(value) - titlePadding - 10 + 100)
      .tween("text", function(this: d3.BaseType & { currentValue?: number }, { value }: DataPoint) {
        const interpolateStartValue = this.currentValue || +(this as HTMLElement).innerHTML || 0;
        const interpolate = d3.interpolate(interpolateStartValue, value);
        this.currentValue = value;

        return function(this: d3.BaseType, t: number) {
          d3.select(this).text(Math.ceil(interpolate(t)));
        };
      });

    const bodyExit = barGroups.exit();

    bodyExit
      .transition(transition)
      .attr("transform", `translate(0,${innerHeight})`)
      .on("end", function(this: d3.BaseType) {
        d3.select(this).attr("fill", "none");
      });

    bodyExit
      .select(".column-title")
      .transition(transition)
      .attr("x", 150)

    bodyExit
      .select(".column-rect")
      .transition(transition)
      .attr("width", 150);

    bodyExit
      .select(".column-value")
      .transition(transition)
      .attr("x", 150)
      .tween("text", function(this: d3.BaseType & { currentValue?: number }) {
        const currentValue = this.currentValue || 0;
        const interpolate = d3.interpolate(currentValue, 0);
        this.currentValue = 0;

        return function(this: d3.BaseType, t: number) {
          d3.select(this).text(new Intl.NumberFormat().format(Math.ceil(interpolate(t))));
        };
      });

    return this;
  }

  private colorBar(category: string) {
    if (category === "Dexes") {
      return "#f6ccbf";
    }
    else if (category === "Lending") {
        return "#a4fcf5";
    }
    else if (category === "Bridge") {
        return "#fffcb0";
    }
    else if (category === "Liquid Staking") {
        return "#fbc3f4"; //Purple / Blue
    }
    else if (category === "CDP") {
        return "#82a9f9"; //Purple
    }
    else if (category === "Derivatives") {
        return "#cfc3fb"; //Red
    }
    else if (category === "Yield Aggregator") {
        return "#ba728b"; //light blue
    }
    else {
        return "#c3fbcb";
    }
  }

  public addDataset(dataset: any) {
    this.chartDataSets.push(dataset);
    return this;
  }

  public addDatasets(datasets: any[]) {
    this.chartDataSets.push.apply(this.chartDataSets, datasets);
    return this;
  }

  public setTitle(title: string) {
    d3.select(".chart-title")
      .attr("x", this.chartSettings.width / 2)
      .attr("y", -this.chartSettings.padding / 2)
      .text(title);
    return this;
  }

  public render(index = 0) {
    this.currentDataSetIndex = index;
    this.timerStart = d3.now();
    this.chartTransition = this.chartContainer
      .transition()
      .duration(this.elapsedTime)
      .ease(d3.easeLinear)
      .on("end", () => {
        if (index < this.chartDataSets.length) {
          this.elapsedTime = this.chartSettings.duration;
          this.render(index + 1);
        } else {
          d3.select("button").text("Play");
        }
      })
      .on("interrupt", () => {
        this.timerEnd = d3.now();
      });

    if (index < this.chartDataSets.length) {
      this.draw(this.chartDataSets[index], this.chartTransition);
    }
  }

  public stop() {
    d3.select(`#${this.chartId}`).selectAll("*").interrupt();
    return this;
  }

  public start() {
    this.elapsedTime -= this.timerEnd - this.timerStart;
    this.render(this.currentDataSetIndex);
    return this;
  }

  public restart() {
    this.render(0);
    return this;
  }
}