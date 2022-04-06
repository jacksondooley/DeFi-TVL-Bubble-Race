import { color } from "d3";
import { transition } from "d3";
// import { debug } from "webpack";

class Data{
  constructor(){
    this.rawData = require("./data.json");
    // console.log(this.rawData);
//     this.n = 10; //number of protocols on graph
//     this.k = 10; //number of animations per time period; higher k = smoother
//     this.svg = d3.select("#chart");
//     this.width = this.svg.node().clientWidth;
//     this.barSize = 48;
//     this.margin = ({top: 16, right: 6, bottom: 6, left: 0})
//     // this.height = this.svg.node().clientHeight;
//     // this.height = this.height()
//     this.height = 400
//     this.duration = 250
//     // this.renderChart()
  }

//   testLogger(){
//     console.log("in data grouping");
//     console.log(this.rawData);
//   }

//   height(){
//     return this.margin.top + this.barsize * this.n + this.margin.bottom
//   }

  // datesArr(){
  //   const maker = this.rawData[2];
  //   const dates = maker.ethTvlHistory.map(m => m.date);
  //   this.dates = dates;
  //   console.log(this.dates);
  // }

  // gets names of all the protocols
  getNames(){
    this.names = new Set(this.rawData.map(d => d.name));
    console.log(this.names)
  }

//   // groups protocols and tvls by date
  groupDates(){
    const grouped = d3.groups(this.rawData, d => d.category);
    console.log(grouped)

    let data = this.rawData;
    console.log(data)
    let datevalues = Array.from(d3.rollup(data, ([d]) => d.tvlUSD, d => d.date, d => [d.name, d.category]))
      // .map(([date, data]) => [date, data.])
      // .sort(([a], [b]) => d3.ascending(a, b));
    console.log(datevalues)
    this.datevalues = datevalues
  }

  dataSetGroup(){
    const hashArr = []
    for(let i = 0; i < this.datevalues.length; i++){
      let hash = {}
      hash["date"] = this.datevalues[i][0];
      hash["dataSet"] = []
      
      let keys = [...this.datevalues[i][1].keys()]
      let values = [...this.datevalues[i][1].values()]
      for (let i = 0; i < keys.length; i++){
        let protocol = {}
        protocol["name"] = keys[i][0];
        protocol["category"] = keys[i][1]
        protocol["value"] = values[i]
        hash["dataSet"].push(protocol)
      }
      // console.log(values)
      hashArr.push(hash)
    }
    return hashArr
  }

//   // ranks by value and assigns rank
  // rank(value) {
  //   const data = Array.from(this.names, name => ({name, value: value(name)}));
  //   data.sort((a, b) => d3.descending(a.value, b.value));
  //   for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i);
  //   // console.log(data)
  //   return data;
  // }

//   // frames used between months to linearly interpolate values between given dates
//   keyframes() {
//     const keyframes = [];
//     let ka, a, kb, b;
//     for ([[ka, a], [kb, b]] of d3.pairs(this.datevalues)){
//       for (let i = 0; i < this.k; i++) {
//         const t = i /this.k;
//         keyframes.push([
//           new Date(ka * (1 - t) + kb * t),
//           this.rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0 ) * t)
//         ]);
//       }
//     }
//     keyframes.push([new Date(kb), this.rank(name => b.get(name) || 0)]);
//     console.log(keyframes)
//     return keyframes;
//   }

//   nameFrames() {
//     const nameframes = d3.groups(this.keyframes().flatMap(([, data]) => data), d => d.name);
//     this.nameFrames = nameframes;
//   }

//   prevFrames(){
//     const prevFrames = new Map(this.nameFrames.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
//     this.prevFrames = prevFrames;
//   }

//   nextFrames(){
//     const nextFrames = new Map(this.nameFrames.flatMap(([, data]) => d3.pairs(data)));
//     this.nextFrames = nextFrames;
//   }

//   // comeback for understanding also not sure if running
//   bars(svg){
//     let bar = svg.append("g")
//         .attr("fill-opacity", 0.6)
//       .selectAll("rect");

//     return ([date, data], transition) => bar = bar
//       .data(data.slice(0, n), d => d.name)
//       .join(
//         enter => enter.append("rect")
//           .attr("fill", "blue") //put in color function
//           .attr("height", y.bandwidth())
//           .attr("x", this.x(0)) //need this.x function made
//           .attr("y", d => y((this.prevFrames.get(d) || d).rank))
//           .attr("width", d => x((this.prevFrames.get(d) || d).value) - this.x(0)),
//         update => update,
//         exit => exit.transition(transition).remove()
//           .attr("y", d => y((this.nextFrames.get(d) || d).rank))
//           .attr("width", d => x((this.prevFrames.get(d) || d).value) - this.x(0))
//       )
//       .call(bar => bar.transtion(transition)
//         .attr("y", d => this.y(d.rank))
//         .attr("width", d => this.x(d.value) - this.x(0)));
//   }

//   labels(svg){
//     let label = svg.append("g")
//         .style("font", "bold 12px var(--sans-serif")
//         .style("font-variant-numeric", "tabular-nums")
//         .attr("text-anchor", "end")
//       .selectAll("text");

//     return ([date, data], transtion) => label = label
//       .data(data.slice(0, n), d => d.name)
//       .join(
//         enter => enter.append("text")
//           .attr("transform", d => `translate(${this.x((this.prevFrames.get(d) || d).value)},
//            ${this.y((this.prevFrames.get(d) || d).rank)})`)
//           .attr("y", this.y.bandwidth() / 2)
//           .attr("x", -6)
//           .attr("dy", "0.25em")
//           .text(d => d.name)
//           .call(text => text.append("tspan")
//             .attr("fill-opacity", 0.7)
//             .attr("font-weight", "normal")
//             .attr("x", -6)
//             .attr("dy", "1.15em")),
//         update => update,
//         exit => exit.transtion(transition).remove()
//           .attr("transform", d => `translate(${this.x((this.nextFrames.get(d) || d).value)},
//            ${this.y((this.nextFrames.get(d) || d).rank)})`)
//           .call(g => g.select("tspan").tween("text", d => this.textTween(d.value, (this.nextFrames.get(d) || d).value)))
//       )
//       .call(bar => bar.transtion(transition)
//         .attr("transform", f => `translate(${this.x(d.value)}, ${this.y(d.rank)})`)
//         .call(g => g.select("tspan"),tween("text", d => this.textTween((this.prevFrames.get(d) || d).value, d.value))));
//   }

//   textTween(a, b){
//     const i = d3.interpolateNumber(a, b);
//     return function(t) {
//       this.textContent = formatNumber(i(t));
//     }
//   }

//   formatNumber(){
//     d3.format(",d")
//   }

//   axis(svg){
//     const g = svg.append("g")
//       .attr("transform", `translate(0, ${this.margin.top})`);

//     const axis = d3.axisTop(this.x)
//       .ticks(this.width / 160)
//       .tickSizeOuter(0)
//       .tickSizeInner(-this.barSize * (this.n + this.y.padding())); 

//     return (_, transition) => {
//       g.transition(transition).call(axis);
//       g.select(".tick:first-of-type text").remove();
//       g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
//       g.select(".domain").remove();
//     };
//   }

//   x(){
//     const x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
//     this.x = x
//   }

//   y(){
//     const y = d3.scaleBand()
//     .domain(d3.range(this.n + 1))
//     .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
//     .padding(0.1)
//     this.y = y
//   }

//   update(){
    
//   }

//    * renderChart(){
//     this.getNames()
//     this.groupDates()
//     this.keyframes()
//     this.nameFrames()
//     this.nextFrames()
//     this.prevFrames()
//     this.x()
//     this.y()
//     // this.height();
//     const svg = this.svg
//       .attr("viewBox", [0, 0, this.width, this.height]);

//     const updateBars = this.bars(svg);
//     console.log("bars updated")
//     const updateAxis = this.axis(svg);
//     console.log("axis updated")
//     const updateLabels = this.labels(svg);
//     console.log("labels updated")
//     // const updateTicker = this.ticker(svg);
    
//     yield svg.node();

//     // updateBars(this.keyframes[0][1])
//     // for (const keyframe of this.keyframes) {
//     //   const transition = svg.transition()
//     //       .duration(this.duration)
//     //       .ease(d3.easeLinear);

  
//       x.domain([0, keyframe[1][0].value]);

//       updateAxis(keyframe, transition);
//       updateBars(keyframe, transition);
//       updateLabels(keyframe, transition);
//       // updateTicker(keyframe, transition);
//     // }
//   }

//   // ticker(svg){
//   //   const now = svg.append("text")
//   //     .style("font", `bold ${barSize}px var(--sans-serif)`)
//   //     .style("font-variant-numeric", "tabular-nums")
//   //     .attr("text-anchor", "end")
//   //     .attr("x", this.width - 6)
//   //     .attr("y", this.martgin.top + barSize * (this.n - 0,45))
//   //     .attr("dy", "0.32em")
//   //     .text(this.formatDate(this.keyframes[0][0]));

//   //   return ([date], transtion) => {
//   //     transition.end().then(() => now.text(this.formatDate(date)));
//   //   };
//   // }

//   // formatDate(){
//   //   d3.utcFormat("%Y")
//   // }


//   // color(){
//   //   console.log("in color");
//   // }



}


export default Data;