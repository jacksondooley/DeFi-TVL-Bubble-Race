import { color } from "d3";
import { transition } from "d3";

class Data{
  constructor(){
    this.rawData = require("./data.json");
    this.n = 10; //number of protocols on graph
    this.k = 10; //number of animations per time period; higher k = smoother
    this.svg = d3.select("#chart");
    this.width = this.svg.node().clientWidth;
    this.height = this.svg.node().clientHeight;
  }

  testLogger(){
    console.log("in data grouping");
    console.log(this.rawData);
  }

  // datesArr(){
  //   const maker = this.rawData[2];
  //   const dates = maker.ethTvlHistory.map(m => m.date);
  //   this.dates = dates;
  //   console.log(this.dates);
  // }

  // gets names of all the protocols
  getNames(){
    this.names = new Set(this.rawData.map(d => d.name));
    console.log(this.names);
  }

  // groups protocols and tvls by date
  groupDates(){
    const grouped = d3.group(this.rawData, d => d.name);
    console.log(grouped);
    let data = this.rawData;
    let datevalues = Array.from(d3.rollup(data, ([d]) => d.tvlUSD, d => d.date, d => d.name))
      .map(([date, data]) => [new Date(date), data])
      .sort(([a], [b]) => d3.ascending(a, b));
    console.log(datevalues)
    this.datevalues = datevalues
  }

  // ranks by value and assigns rank
  rank(value) {
    const data = Array.from(this.names, name => ({name, value: value(name)}));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i);
    // console.log(data)
    return data;
  }

  // frames used between months to linearly interpolate values between given dates
  keyframes() {
    const keyframes = [];
    let ka, a, kb, b;
    for ([[ka, a], [kb, b]] of d3.pairs(this.datevalues)){
      for (let i = 0; i < this.k; i++) {
        const t = i /this.k;
        keyframes.push([
          new Date(ka * (1 - t) + kb * t),
          this.rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0 ) * t)
        ]);
      }
    }
    keyframes.push([new Date(kb), this.rank(name => b.get(name) || 0)]);
    console.log(keyframes)
    return keyframes;
  }

  nameframes() {
    const nameframes = d3.groups(this.keyframes().flatMap(([, data]) => data), d => d.name);
    this.nameframes = nameframes;
  }

  prevFrames(){
    const prevFrames = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
    this.prevFrames = prevFrames;
  }

  nextFrames(){
    const nextFrames = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));
    this.nextFrames = nextFrames;
  }

  // comeback for understanding also not sure if running
  bars(svg){
    let bar = svg.append("g")
        .attr("fill-opacity", 0.6)
      .selectAll("rect");

    return ([date, data], transition) => bar = bar
      .data(data.slice(0, n), d => d.name)
      .join(
        enter => enter.append("rect")
          .attr("fill", "blue") //put in color function
          .attr("height", y.bandwidth())
          .attr("x", this.x(0)) //need this.x function made
          .attr("y", d => y((this.prevFrames.get(d) || d).rank))
          .attr("width", d => x((this.prevFrames.get(d) || d).value) - this.x(0)),
        update => update,
        exit => exit.transition(transition).remove()
          .attr("y", d => y((this.nextFrames.get(d) || d).rank))
          .attr("width", d => x((this.prevFrames.get(d) || d).value) - this.x(0))
      )
      .call(bar => bar.transtion(transition)
        .attr("y", d => this.y(d.rank))
        .attr("width", d => this.x(d.value) - this.x(0)));
  }

  labels(svg){
    let label = svg.append("g")
        .style("font", "bold 12px var(--sans-serif")
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "end")
      .selectAll("text");

    return ([date, data], transtion) => label = label
      .data(this.rawData.slice(0, n), d => d.name)
      .join(
        enter => enter.append("text")
          .attr("transform", d => `translate(${this.x((this.prevFrames.get(d) || d).value)},
           ${this.y((this.prevFrames.get(d) || d).rank)})`)
          .attr("y", this.y.bandwidth() / 2)
          .attr("x", -6)
          .attr("dy", "0.25em")
          .text(d => d.name)
          .call(text => text.append("tspan")
            .attr("fill-opacity", 0.7)
            .attr("font-weight", "normal")
            .attr("x", -6)
            .attr("dy", "1.15em")),
        update => update,
        exit => exit.transtion(transition).remove()
          .attr("transform", d => `translate(${this.x((this.nextFrames.get(d) || d).value)},
           ${this.y((this.nextFrames.get(d) || d).rank)})`)
          .call(g => g.select("tspan").tween("text", d => this.textTween(d.value, (this.nextFrames.get(d) || d).value)))
      )
      .call(bar => bar.transtion(transition)
        .attr("transform", f => `translate(${this.x(d.value)}, ${this.y(d.rank)})`)
        .call(g => g.select("tspan"),tween("text", d => this.textTween((this.prevFrames.get(d) || d).value, d.value))));
  }

  color(){
    console.log("in color");
  }


}


export default Data;